
import { IconMapProps } from '@/app/interfaces/data';
import React from 'react';
import { BsCashCoin } from 'react-icons/bs';
import { FaScrewdriverWrench } from 'react-icons/fa6';
import {
    IoFastFoodOutline,
    IoCafeOutline,
    IoTvOutline,
    IoCarOutline,
    IoHeartOutline,
    IoShirtOutline
} from 'react-icons/io5';


// Create a mapping of icon names to React components
const iconMap: IconMapProps  = {
    IoFastFoodOutline: <IoFastFoodOutline className='text-xl' />,
    IoCafeOutline: <IoCafeOutline className='text-xl' />,
    IoTvOutline: <IoTvOutline className='text-xl' />,
    IoCarOutline: <IoCarOutline className='text-xl' />,
    IoHeartOutline: <IoHeartOutline className='text-xl' />,
    IoShirtOutline: <IoShirtOutline className='text-xl' />,
    FaScrewdriverWrench: <FaScrewdriverWrench className='text-xl' />,
    BsCashCoin: <BsCashCoin className='text-xl' />
};
export default iconMap;