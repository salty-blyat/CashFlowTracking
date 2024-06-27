'use client'
import Link from 'next/link';
import { Drawer, Button } from 'antd';
import { useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';


const Navbar = ({ balance }: { balance: number | undefined }) => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    return (
        <nav className="p-4">
            <div className="mb-6 container mx-auto flex justify-between items-center">
                <div className="text-lg font-bold">
                    <Link href="/">
                        <p>Cash Tracker</p>
                    </Link>
                </div>
                <div className="space-x-4 flex">
                    <Button type="default" onClick={showDrawer}>
                        <MenuOutlined />
                    </Button>
                    <Drawer placement='bottom' title="Basic Drawer" onClose={onClose} open={open}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Drawer>
                </div>
            </div>
            <div className='container mx-auto flex flex-col justify-center items-center'>
                <h3>Overall balance</h3>
                <h1 className='text-4xl'>${balance || 0}</h1>
            </div>
        </nav>
    );
}

export default Navbar;
