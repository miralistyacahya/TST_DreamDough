"use client"
import Nav from '@/components/nav';
import { NAV_PUBLIC } from '@/common/constants/navconstant';
import { usePathname } from 'next/navigation';
import React from 'react'
import CardMyOrder from '@/components/myOrderCard';

const orders = () => {
    const path = usePathname();
  return (
    <div className=''>
        <Nav listOfNav={NAV_PUBLIC} path={path}/>
        <div className="mx-16 justify-center items-centers">
            <h1 className="heading bold-28 mt-4 text-purple-600 text-center">Order History</h1>
            <div className="mt-6 mb-12 mx-4 sm:rounded-lg justify-center">
                <CardMyOrder />
            </div>
        </div>
    </div>
  )
}

export default orders