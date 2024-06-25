'use client'
import Navbar from '../../components/ui/navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
    return (
        <main className="">
            <Navbar />
            <div className="flex justify-center container gap-x-2 max-w-sm">
                <div className="border-2 text-center border-red-500 text-white p-4 rounded-md">
                    <h1>Expense</h1>
                    <h1>$999</h1>
                </div>

                <div className="border-green-500 text-center border-2 text-white p-4 rounded-md">
                    <h1>Income</h1>
                    <h1>$999</h1>
                </div>
            </div>
            <Card className="w-[350px]">

                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                    <CardDescription>Deploy your new project in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    fff
                </CardContent>
            </Card>



        </main>
    );
}
