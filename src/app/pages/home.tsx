'use client'
import { Button, Card, DatePicker, DatePickerProps, Modal } from 'antd';
import { IoAdd, IoFastFoodOutline, IoPulse } from 'react-icons/io5';
import Navbar from '../../components/ui/navbar';
import { useState } from 'react';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const cardsArray = Array(5).fill(null);
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <main>
            <Navbar />
            <div className="flex flex-col justify-center items-center container max-w-sm">
                <DatePicker className='mx-auto mb-4' onChange={onChange} picker="month" />
                <div className="flex justify-between w-full gap-x-2">
                    <Card size='small' className="border-2 text-center border-red-500  w-1/2">
                        <h1>Expense</h1>
                        <h1>$999</h1>
                    </Card>

                    <Card size='small' className="border-2 text-center border-green-500  w-1/2">
                        <h1>Income</h1>
                        <h1>$999</h1>
                    </Card>
                </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 container mt-4 mx-auto gap-2'>
                {cardsArray.map((_, index) => (
                    <Card key={index} onClick={showModal}>
                        <div className='flex gap-x-2 items-center' >
                            <IoFastFoodOutline className='text-xl' />
                            <span>Card content</span>
                        </div>
                    </Card>
                ))}
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                
                <Button onClick={() => alert("lol")} type="dashed" className='flex h-full justify-start' >
                    <div className='flex gap-x-2  items-center'>
                        <IoAdd className='text-xl' />
                        <span>Add Category</span>
                    </div>
                </Button>
            </div>
        </main>
    );
}
