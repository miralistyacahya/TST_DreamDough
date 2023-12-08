"use client"
import Nav from '@/components/nav';
import { NAV_PUBLIC } from '@/common/constants/navconstant';
import { usePathname } from 'next/navigation';
import React from 'react'

const about = () => {
    const path = usePathname();
  return (
    <div>
        <Nav listOfNav={NAV_PUBLIC} path={path}/>
    </div>
  )
}

export default about