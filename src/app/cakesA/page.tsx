"use client"

import Nav from '@/components/nav'
import { NAV_ADMIN } from '@/common/constants/navconstant'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Button } from '@nextui-org/button'
import CardProdukA from '@/components/cardProdukA'

const cakesA = () => {
    const path = usePathname();
  return (
    <div>
        <Nav listOfNav={NAV_ADMIN} path={path}/>
        <div className="mx-16 justify-center items-centers">
            <h1 className="heading bold-28 mt-4 text-purple-600 text-center">Manage Product</h1>
            <div className="mt-6 mb-12 mx-4 sm:rounded-lg justify-center">
                <CardProdukA />
            </div>
        </div>
    </div>
  )
}

export default cakesA