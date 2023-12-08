"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandLogo from "../../public/assets/dreamdough_logo.svg";
import {Button, ButtonGroup} from "@nextui-org/button";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@nextui-org/navbar";
import { NavItem } from "@/common/constants/navconstant";
import { URL } from "url";
import Cookies from "js-cookie";
import { toastError, toastSuccess } from "./toast";
import { useRouter } from "next/navigation";

interface NavProps {
    listOfNav: NavItem[];
    path: string; // Update the type to URL
  }

export default function Nav({ listOfNav, path }: NavProps) {
    const router =  useRouter();
    const handleLogout = async () => {
        try {

            Cookies.remove("token");
            toastSuccess("Logout Successful!");
            router.push("/login");
        } catch(error){
            toastError("Login Failed!");
        }
    }

  return (
    <div className="flexBetween max-container relative bg-white">
        <Navbar
        classNames={{
            item: [
            "text-bold-12",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:top-7",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[3px]",
            "data-[active=true]:after:rounded-[2px]",
            "data-[active=true]:after:bg-purple-500",
            ],
        }}
        className="w-full px-8"
        // style={{ background: 'linear-gradient(to right, rgba(156, 39, 176, 0.1), rgba(33, 150, 243, 0.1))' }}
        maxWidth="full"
        >
        <NavbarBrand className="justify-start">
            <Image src={BrandLogo} alt="Brand Logo" height={50} />
            {/* <p className="font-bold text-inherit">Dream Dough</p> */}
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex sm:flex-row gap-12 relative" justify="center">
            {listOfNav.map((link) => (
              <NavbarItem key={link.key} isActive={path === link.href} className="relative flex">
              <Link
                href={link.href}
                className={`medium-16 text-gray-900 flexCenter cursor-pointer transition-all hover:font-bold ${
                    path === link.href ? 'text-purple-500 font-bold' : ''}`}
              >
                {link.label}
              </Link>
              </NavbarItem>
            ))}
        </NavbarContent>
        {listOfNav.length < 4 ?
            <NavbarContent justify="end">
                <p className="text-purple-300">Admin?</p>
                <NavbarItem className="hidden lg:flex">
                <Link href="/login" className="semibold-14 text-gray-900 cursor-pointer hover:font-bold">Login</Link>
                </NavbarItem>
                <NavbarItem>
                <Button as={Link} color="secondary" href="/register" variant="flat" className="semibold-14 hover:font-bold">
                    Sign Up
                </Button>
                </NavbarItem>
            </NavbarContent>
        : 
            <NavbarContent justify="end">
                <NavbarItem>
                <Button color="secondary" onPress={handleLogout} variant="flat" className="semibold-14 hover:font-bold">
                    Logout
                </Button>
                </NavbarItem>
            </NavbarContent>
        }
        </Navbar>
    </div>
  );
}
