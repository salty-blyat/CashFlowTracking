'use client'
import CategoryDetailDrawer from '@/components/ui/categoryDetailDrawer';
import CategoryDetailModal from '@/components/ui/categoryDetailModal';
import { CategoryList } from '@/components/ui/categoryList';
import { Button, Card, DatePicker, DatePickerProps, Modal } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import Navbar from '../../components/ui/navbar';
import { CategoryProps, HistoryProps, PostProps } from '../interfaces/data';
import CashFlow from '@/components/ui/cashFlow';

// ENV
const postsEndpoint = process.env.NEXT_PUBLIC_POSTS_ENDPOINT;
const categoriesEndpoint = process.env.NEXT_PUBLIC_CATEGORIES_ENDPOINT;
const historyEndpoint = process.env.NEXT_PUBLIC_HISTORY_ENDPOINT;

const Home = () => {

    // keep drawer and modal state in parent 
    // reasons
    // 1. trigger button in the parent
    // 2. gotta pass selected info from parent anyway

    // popups state group
    const [openCategoryDetail, setOpenCategoryDetail] = useState(false);
    const [openCategoryDetailDrawer, setOpenCategoryDetailDrawer] = useState(false);
    const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);

    // information state group 
    const [post, setPost] = useState<PostProps>();
    const [category, setCategory] = useState<CategoryProps[]>([]);
    const [history, setHistory] = useState<HistoryProps[]>([]);
    const [historyDetail, setHistoryDetail] = useState<HistoryProps[]>([]);
    const [expense, setExpense] = useState<number>(0); // State to hold expense

    // dynamic
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMM/YYYY'));
    const [selectedCategory, setSelectedCategory] = useState<CategoryProps>();

    // sm screen use drawer
    // md screen use modal
    const isMdUp = useMediaQuery({ query: '(min-width: 768px)' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePost = await axios.get(`${postsEndpoint}?date=${selectedMonth}`);
                const responseCategory = await axios.get(`${categoriesEndpoint}?date=${selectedMonth}`);
                const responseHistory = await axios.get(`${historyEndpoint}?date_like=${selectedMonth}`);

                const fetchedCategories = responseCategory.data;
                const fetchedHistory = responseHistory.data;

                const mergedCategories = mergeWithDefaultCategories(fetchedCategories, fetchedHistory);

                setCategory(mergedCategories);
                setPost(responsePost.data[0]);
                setHistory(fetchedHistory);

                // Calculate total expense from category amounts
                const totalExpense = calculateTotalExpense(mergedCategories);
                setExpense(totalExpense);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [selectedMonth]);


    const mergeWithDefaultCategories = (fetchedCategories: CategoryProps[], fetchedHistory: HistoryProps[]) => {

        const defaultCategory = [
            { id: "900000", label: "Food", icon: "IoFastFoodOutline", amount: 0 },
            { id: "900001", label: "Cafe", icon: "IoCafeOutline", amount: 0 },
            { id: "900002", label: "Entertainment", icon: "IoTvOutline", amount: 0 },
            { id: "900003", label: "Transport", icon: "IoCarOutline", amount: 0 },
            { id: "900004", label: "Health", icon: "IoHeartOutline", amount: 0 },
            { id: "900005", label: "Clothes", icon: "IoShirtOutline", amount: 0 },
            { id: "900006", label: "Tax", icon: "BsCashCoin", amount: 0 }
        ];

        const totalCashPerCategory = fetchedHistory.reduce((acc: { [key: string]: number }, item: HistoryProps) => {
            console.log("acc", acc);
            console.log("item", item);
            const categoryId = item.categoryId;
            if (!acc[categoryId]) {
                acc[categoryId] = 0;
            }
            acc[categoryId] += item.amount;
            return acc;
        }, {} as { [key: string]: number });


        const fetchedCategoryMap = fetchedCategories.reduce((acc: { [key: string]: CategoryProps }, category: CategoryProps) => {
            // acc stands for accumulator
            acc[category.label] = category;
            return acc;
        }, {} as { [key: string]: CategoryProps });

        return defaultCategory.map((defaultCat: CategoryProps) => {
            const fetchedCat = fetchedCategoryMap[defaultCat.label];

            if (fetchedCat) {
                fetchedCat.amount = totalCashPerCategory[fetchedCat.id as keyof typeof totalCashPerCategory] || 0;
                return fetchedCat;
            } else {
                defaultCat.amount = 0;
                return defaultCat;
            }
        });

    };

    // derive info from category
    const calculateTotalExpense = (categories: CategoryProps[]) => {
        if (!categories) return 0;
        return categories.reduce((total, cat) => total + (cat.amount || 0), 0);
    };


    const onChangeMonth: DatePickerProps['onChange'] = (date) => {
        setSelectedMonth(date ? date.format('MMM/YYYY') : dayjs().format('MMM/YYYY'));
    };
    // handle the category detail popup
    const showCategory = (category: CategoryProps) => {
        const filteredHistory = history?.filter(item => parseInt(item.categoryId) === parseInt(category.id as string)) || [];

        setHistoryDetail(filteredHistory);
        setSelectedCategory(category);
        if (isMdUp) {
            setOpenCategoryDetail(true);
        } else {
            setOpenCategoryDetailDrawer(true);
        }
    };

    const handleOk = () => setOpenCategoryDetail(false);
    const handleCancelCategoryDetail = () => setOpenCategoryDetail(false);
    const handleClose = () => setOpenCategoryDetailDrawer(false);

    const confirmDeleteHistoryItem = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this item?',
            onOk: () => deleteHistoryItem(id),
        });
    };

    // too much hassle to move to child component
    const deleteHistoryItem = async (id: number) => {
        try {
            await axios.delete(`${historyEndpoint}${id}`);

            // Filter historyDetail and history to remove the deleted item
            const updatedHistoryDetail = historyDetail?.filter(item => item.id !== id.toString()) || [];
            const updatedHistory = history?.filter(item => item.id !== id.toString()) || [];

            // Update state variables with filtered data
            setHistoryDetail(updatedHistoryDetail);
            setHistory(updatedHistory);

            // Update category and expense calculations based on updated history
            const updatedCategory = mergeWithDefaultCategories(category, updatedHistory);
            setCategory(updatedCategory);

            // Recalculate total expense after deletion
            const totalExpense = calculateTotalExpense(updatedCategory);
            setExpense(totalExpense);
        } catch (error) {
            console.error('Error deleting history item:', error);
        }
    };

    const handleOpenAddCategoryModal = () => setIsNewCategoryModalOpen(true);

    return (
        <main>
            <Navbar balance={post?.overallCash} />
            <div className="flex flex-col justify-center items-center container max-w-sm">
                <DatePicker
                    className='mx-auto mb-4'
                    onChange={onChangeMonth}
                    picker="month"
                    defaultValue={dayjs()}
                />
                <CashFlow expense={expense} income={post?.income} />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mt-4 mx-auto gap-2'>

                <CategoryList categories={category} showCategory={showCategory} />
                <Button onClick={handleOpenAddCategoryModal} type="dashed" className='flex justify-start gap-x-2 items-center h-full'>
                    <IoAdd className='text-xl' />
                    <span>Add Category</span>
                </Button>
            </div>

            {historyDetail && selectedCategory && (
                <>
                    <CategoryDetailModal
                        // modal props
                        title={selectedCategory.label}
                        isOpen={openCategoryDetail}
                        onClose={handleCancelCategoryDetail}
                        confirmDeleteHistoryItem={confirmDeleteHistoryItem}
                        // content props
                        historyDetail={historyDetail}
                    />

                    <CategoryDetailDrawer
                        // drawer props
                        title={selectedCategory.label}
                        isOpen={openCategoryDetailDrawer}
                        onClose={handleClose}
                        confirmDeleteHistoryItem={confirmDeleteHistoryItem}
                        // content props
                        historyDetail={historyDetail}
                    />
                </>
            )}

            {/* <AddCategoryModal
                open={isNewCategoryModalOpen}
                onOk={handleNewCategoryModalOk}
                onCancel={handleNewCategoryModalCancel}
            /> */}
        </main>
    );
};



export default Home;
