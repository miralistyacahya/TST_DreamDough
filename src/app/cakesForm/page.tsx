"use client"

import Nav from '@/components/nav'
import { NAV_PUBLIC } from '@/common/constants/navconstant'
import React from 'react'
import { Button } from '@nextui-org/button'
import CardCakeForm from '@/components/cardCakeForm'

const cakesForm = () => {
  return (
    <div>
        <Nav listOfNav={NAV_PUBLIC} path={"/cakes"}/>
        <div className="m-16 justify-center items-centers">
            <div className='mt-8 gap-6'>
                <div>
                    <CardCakeForm />
                </div>
                <div className='flex flex-col justify-center items-center '>
                </div>
            </div>
        </div>
    </div>
  )
}

export default cakesForm