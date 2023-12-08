"use client"

import Nav from '@/components/nav'
import CardProduk from '@/components/cardProduk'
import CardRecommendation from '@/components/cardRecommendation'
import { NAV_PUBLIC } from '@/common/constants/navconstant'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import ExternalModal from '@/components/externalModal'

const cakes = () => {
    const path = usePathname();
    // const [dataDiet, setDataDiet] = useState<Diet>({ nama_menu: "", kalori: "" });
  return (
    <div>
        <Nav listOfNav={NAV_PUBLIC} path={path}/>
        <div className="mx-16 justify-center items-centers">
            <div className='mt-8 grid grid-cols-2 gap-6'>
                <div>
                    <h2 className="heading bold-20 text-purple-600 text-center">Recommendation For You</h2>
                    <div className="mt-6 mb-12 mx-4 sm:rounded-lg ">
                        <CardRecommendation />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <h2 className="flex heading bold-20 text-purple-600 text-center">Are You Currently on a Diet Program?</h2>
                    <div className="flex mt-6">
                        {/* <Button color="secondary" variant="shadow" className="medium-14 hover:font-bold">
                            Get Recommendation
                        </Button> */}
                        <ExternalModal/>
                    </div>
                </div>
            </div>
            <h1 className="heading bold-28 mt-4 text-purple-600 text-center">Our Signature Menu</h1>
            <div className="mt-6 mb-12 mx-4 sm:rounded-lg justify-center">
                <CardProduk />
            </div>
        </div>
    </div>
  )
}

export default cakes