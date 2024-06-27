'use client';

import { Button, Card, DatePicker, DatePickerProps, Drawer, Modal } from 'antd';
import { IoAdd } from 'react-icons/io5';
import Navbar from '../../components/ui/navbar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import iconMap from '@/components/ui/icon';
import { useMediaQuery } from 'react-responsive';
import { CategoryProps, HistoryProps, PostProps } from '../interfaces/data';
import { CloseOutlined } from '@ant-design/icons';

const Home = () => {
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(dayjs().format('MMM/YYYY'));
    const [selectedCategory, setSelectedCategory] = useState<CategoryProps | null>(null);
    const [historyDetail, setHistoryDetail] = useState<HistoryProps[] | null>(null);
    const [post, setPost] = useState<PostProps | null>(null);
    const [category, setCategory] = useState<CategoryProps[] | null>(null);
    const [history, setHistory] = useState<HistoryProps[] | null>(null);

    const isMdUp = useMediaQuery({ query: '(min-width: 768px)' });

    const fetchData = async () => {
        try {
            const responsePost = await axios.get(`http://localhost:4000/posts?date=${selectedMonth}`);
            const responseCategory = await axios.get(`http://localhost:4000/categories?date=${selectedMonth}`);
            const responseHistory = await axios.get(`http://localhost:4000/history?date_like=${selectedMonth}`);

            setCategory(responseCategory.data);
            setPost(responsePost.data[0]); // Assuming response is an array and you need the first item
            setHistory(responseHistory.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedMonth]);

    const onChange: DatePickerProps['onChange'] = (date) => {
        setSelectedMonth(date ? date.format('MMM/YYYY') : dayjs().format('MMM/YYYY'));
    };

    const showCategory = (category: CategoryProps) => {
        const filteredHistory = history?.filter(item => parseInt(item.categoryId) === parseInt(category.id)) || [];
        setHistoryDetail(filteredHistory);
        setSelectedCategory(category);

        if (isMdUp) {
            setIsCategoryModalOpen(true);
        } else {
            setIsCategoryDrawerOpen(true);
        }
    };
    console.log(historyDetail)
    const handleOk = () => setIsCategoryModalOpen(false);
    const handleCancel = () => setIsCategoryModalOpen(false);
    const handleClose = () => setIsCategoryDrawerOpen(false);

    const deleteHistoryItem = async (id: number) => {
        try {
            // Send DELETE request to remove item from server
            await axios.delete(`http://localhost:4000/history/${id}`);
            const updateHistoryDetail = historyDetail?.filter(item => item.id !== id.toString())
            setHistoryDetail(updateHistoryDetail);
            // if (selectedCategory) {
            //     showCategory(selectedCategory);
            // }
        } catch (error) {
            console.error('Error deleting history item:', error);
        }
    };

    const groupHistoryByDate = (history: HistoryProps[] | null) => {
        if (!history) return {};
        return history.reduce((acc, item) => {
            const date = item.date.split('T')[0]; // Assuming date is in ISO format
            acc[date] = acc[date] || [];
            acc[date].push(item);
            return acc;
        }, {});
    };

    return (
        <main>
            <Navbar balance={post?.overallCash} />
            <div className="flex flex-col justify-center items-center container max-w-sm">
                <DatePicker
                    className='mx-auto mb-4'
                    onChange={onChange}
                    picker="month"
                    defaultValue={dayjs()}
                />
                <CashFlow expense={post?.expense} income={post?.income} />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mt-4 mx-auto gap-2'>
                {category?.map((item) => (
                    <Card className='hover:cursor-pointer' key={item.id} onClick={() => showCategory(item)}>
                        <div className='flex gap-x-4 items-center'>
                            <span>{iconMap[item.icon]}</span>
                            <div className='flex flex-col'>
                                <span>{item.label}</span>
                                <span className='text-xs md:text-base'>{item.amount} USD</span>
                            </div>
                        </div>
                    </Card>
                ))}
                <Button onClick={() => alert("lol")} type="dashed" className='flex justify-start gap-x-2 items-center h-full'>
                    <IoAdd className='text-xl' />
                    <span>Add Category</span>
                </Button>
            </div>

            {historyDetail && selectedCategory && (
                <>
                    <Modal
                        title={selectedCategory.label}
                        open={isCategoryModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        {Object.entries(groupHistoryByDate(historyDetail)).map(([date, items], index) => (
                            <div key={index} >
                                <span>{date}</span>
                                {items.map((item, id) => (
                                    <div className='flex items-center justify-between ml-4' key={id}>
                                        <span>{item.title}</span>
                                        <div className='flex gap-x-1 items-center justify-between'>
                                            <span>{item.amount} USD</span>
                                            <Button
                                                size='small'
                                                type='text'
                                                onClick={() => deleteHistoryItem(item.id)} >
                                                <CloseOutlined />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Modal>

                    <Drawer
                        title={selectedCategory.label}
                        placement="bottom"
                        onClose={handleClose}
                        open={isCategoryDrawerOpen}
                    >
                        {Object.entries(groupHistoryByDate(historyDetail)).map(([date, items], index) => (
                            <div key={index} >
                                <span>{date}</span>
                                {items.map((item, id) => (
                                    <div className='flex items-center justify-between ml-4' key={id}>
                                        <span>{item.title}</span>
                                        <div className='flex gap-x-1 items-center justify-between'>
                                            <span>{item.amount} USD</span>
                                            <Button
                                                size='small'
                                                type='text'
                                                onClick={() => deleteHistoryItem(item.id)}
                                            >
                                                <CloseOutlined />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Drawer>
                </>
            )}
        </main>
    );
};

function CashFlow({ expense, income }: { expense: number | undefined, income: number | undefined }) {
    return (
        <div className="flex justify-between w-full gap-x-2">
            <Card size='small' className="border-2 text-center border-red-500 w-1/2">
                <h1>Expense</h1>
                <h1>${expense || 0}</h1>
            </Card>

            <Card size='small' className="border-2 text-center border-green-500 w-1/2">
                <h1>Income</h1>
                <h1>${income || 0}</h1>
            </Card>
        </div>
    );
}

export default Home;
