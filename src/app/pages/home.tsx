'use client'
import { Card } from 'antd';
import Navbar from '../../components/ui/navbar';
import { IoFastFoodOutline } from 'react-icons/io5';

export default function Home() {
    const cardsArray = Array(5).fill(null);
    return (
        <main>
            <Navbar />
            <div className="flex justify-center container gap-x-2 max-w-sm">
                <div className="border-2 text-center border-red-500   p-4 rounded-md">
                    <h1>Expense</h1>
                    <h1>$999</h1>
                </div>

                <div className="border-green-500 text-center border-2   p-4 rounded-md">
                    <h1>Income</h1>
                    <h1>$999</h1>
                </div>
            </div>
            <div className='grid grid-cols-2 container mt-4 mx-auto gap-2'>
                {cardsArray.map((_, index) => (
                    <Card key={index} >
                        <div className='flex    flex-wrap'>
                            <IoFastFoodOutline className='text-xl' />
                            <span>Card content</span>
                        </div>
                    </Card>
                ))}
            </div>
        </main>
    );
}
