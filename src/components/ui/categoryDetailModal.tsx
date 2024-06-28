import { HistoryProps } from "@/app/interfaces/data";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

type GroupedHistory = { [date: string]: HistoryProps[] };

export const groupHistoryByDate = (history: HistoryProps[] | undefined): GroupedHistory => {
    if (!history) return {};
    return history.reduce((acc: GroupedHistory, item: HistoryProps) => {
        const date = item.date.split('T')[0];
        acc[date] = acc[date] || [];
        acc[date].push(item);
        return acc;
    }, {});
};

export interface CategoryDetailModalProps {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    historyDetail: HistoryProps[] | undefined;
    confirmDeleteHistoryItem: (id: number) => void; // Ensure confirmDeleteHistoryItem accepts number
}

const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({
    title,
    isOpen,
    onClose,
    historyDetail,
    confirmDeleteHistoryItem
}) => {

    return (
        <Modal
            title={title}
            visible={isOpen} // Use 'visible' instead of 'open' for Ant Design Modal
            onOk={onClose}
            onCancel={onClose}
        >
            {Object.entries(groupHistoryByDate(historyDetail)).map(([date, items], index) => (
                <div key={index}>
                    <span>{date}</span>
                    {items.map((item, id) => (
                        <div className='flex items-center justify-between ml-4' key={id}>
                            <span>{item.title}</span>
                            <div className='flex gap-x-1 items-center justify-between'>
                                <span>{item.amount} USD</span>
                                <Button
                                    size='small'
                                    type='text'
                                    onClick={() => confirmDeleteHistoryItem(Number(item.id))}
                                // Ensure item.id is converted to number here
                                >
                                    <CloseOutlined />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Modal>
    );
};

export default CategoryDetailModal;
