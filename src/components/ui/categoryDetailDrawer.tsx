import { Button, Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { CategoryDetailModalProps, groupHistoryByDate } from './categoryDetailModal';
import { HistoryProps } from '@/app/interfaces/data'; // Adjust the path as per your actual file structure

const CategoryDetailDrawer: React.FC<CategoryDetailModalProps> = ({ title, isOpen, onClose, historyDetail, confirmDeleteHistoryItem }) => {
    return (
        <Drawer
            title={title}
            placement="bottom"
            onClose={onClose}
            open={isOpen} // Use 'visible' instead of 'open' for Ant Design Drawer
        >
            {Object.entries(groupHistoryByDate(historyDetail)).map(([date, items], index) => (
                <div key={index}>
                    <span>{date}</span>
                    {items.map((item: HistoryProps, id) => (
                        <div className='flex items-center justify-between ml-4' key={id}>
                            <span>{item.title}</span>
                            <div className='flex gap-x-1 items-center justify-between'>
                                <span>{item.amount} USD</span>
                                <Button
                                    size='small'
                                    type='text'
                                    onClick={() => confirmDeleteHistoryItem(Number(item.id))}
                                // Ensure item.id is converted to number here ^
                                >
                                    <CloseOutlined />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Drawer>
    );
};

export default CategoryDetailDrawer;
