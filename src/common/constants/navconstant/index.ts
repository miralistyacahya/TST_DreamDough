import { Url } from "next/dist/shared/lib/router/router";
import { Key } from "react";

export interface NavItem {
    href: Url,
    key: Key,
    label: String
  }

export const NAV_ADMIN:NavItem[] = [
    { href: '/aboutA', key: 'aboutA', label: 'About'},
    { href: '/cakesA', key: 'produkA', label: 'Products'},
    { href: '/customersA', key: 'customerA', label: 'Customers'},
    { href: '/ordersA', key: 'orderA', label: 'Orders'},
]

export const NAV_PUBLIC:NavItem[] = [
    { href: '/about', key: 'about', label: 'About'},
    { href: '/cakes', key: 'produk', label: 'Products'},
    { href: '/orders', key: 'orders', label: 'My Order'},
]