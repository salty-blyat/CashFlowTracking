'use client'
import { useEffect } from "react";
import { HashLoader } from 'react-spinners';

const SplashScreen = () => {
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <div className="bg-gray-100 flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 h-screen z-20">
            <div className="animate-pulse">
                <HashLoader color="rgba(0,0,0)" />
            </div>
            <div className="text-3xl font-bold font-heading text-black ml-4">
                Cash Tracker
            </div>
        </div>
    );
};

export default SplashScreen