"use client"

import Nav from '@/components/nav'
import { NAV_PUBLIC } from '@/common/constants/navconstant'
import { usePathname, useRouter } from 'next/navigation'
import {Card, CardBody, CardFooter, Image, Input} from "@nextui-org/react";
import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Button } from '@nextui-org/button'
import Link from 'next/link';
import { registerUser } from '@/api/auth';
import { toastError, toastSuccess } from '@/components/toast';

const register = () => {
    const path = usePathname();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            username: username,
            name: name,
            email: email,
            password: password,
        }
        try {
            const registerRecord: any = await registerUser(data);

            toastSuccess("Register Successful!");
            router.push("/login");
        } catch(error){
            toastError("Register Failed!");
        }
    }

  return (
    <div>
        <Nav listOfNav={NAV_PUBLIC} path={path}/>
        <div className="flex flex-row mx-40 justify-center items-centers">
            <Card className='flex items-center justify-center h-3/6 my-20 w-6/12'>
                <CardBody>
                <h1 className="heading bold-52 mt-8 text-purple-600 text-center">Welcome!</h1>
                    <div>
                        <form className='mx-10' onSubmit={handleRegister}>
                            <div className='mt-16 mb-6'>
                                <Input
                                    autoFocus
                                    label="Username"
                                    color="secondary"
                                    key={"username"}
                                    labelPlacement="outside"
                                    placeholder="Enter your username"
                                    variant="bordered"
                                    isRequired
                                    required
                                    onChange={(e) => setUsername(e.target.value)}
                                    className='py-3 semibold-24'
                                />
                                <Input
                                    autoFocus
                                    label="name"
                                    color="secondary"
                                    key={"name"}
                                    labelPlacement="outside"
                                    placeholder="Enter your name"
                                    variant="bordered"
                                    isRequired
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className='py-3 semibold-24'
                                />
                                <Input
                                    autoFocus
                                    label="Email"
                                    color="secondary"
                                    key={"email"}
                                    labelPlacement="outside"
                                    placeholder="Enter your email"
                                    variant="bordered"
                                    isRequired
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='py-3 semibold-24'
                                />
                                <Input
                                    label="Password"
                                    color='secondary'
                                    variant="bordered"
                                    key={"password"}
                                    labelPlacement="outside"
                                    placeholder="Enter your password"
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IoEye className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                                    type={isVisible ? "text" : "password"}
                                    isRequired
                                    required
                                    className='py-3 semibold-24'
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex flex-col justify-center items-center w-full mb-8 gap-2'>
                                <Button color="secondary" type="submit" className='w-3/4 bg-purple-600 semibold-16'>
                                    Sign Up
                                </Button>
                                <p className='medium-16'>Already Have Account?
                                    <Link href={"/login"} className='semibold-16 text-purple-500'>
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default register;