import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {Button, Card, CardBody, CardFooter, Image, Input} from "@nextui-org/react";
import { IoIosAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import { getCustomerOrder } from "@/api/orders";
import AddImageModal from "./addImageModal";

export default function CardMyOrder() {
    const [orders, setOrders] = useState<Orders[]>([]);
    const [phone, setPhone] = useState<string>("");

    const getOrdersCustRecords = async () => {
        try {
            console.log("tess phone", phone);
          const ordersRecord: any = await getCustomerOrder(phone);
          const ordersData: Orders[] = ordersRecord.map((record: any) => ({
            order_id: record[0],
            customer_id: record[1],
            cake_id: record[2],
            order_date: record[3],
            pickup_date: record[4],
            order_status: record[5],
            addr: record[6],
            cake_img: record[7],
            created_at: record[8],
            updated_at: record[9],
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error('Error getOrderCustomer:', error);
        }
      };
    
      const handleSubmit = async (e: any) => {
        e.preventDefault();
        getOrdersCustRecords();
      };

  return (
    <div>
        <div className="grid grid-cols-2">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                <Input
                    autoFocus
                    label="Phone"
                    color="secondary"
                    key={""}
                    labelPlacement="outside"
                    placeholder="Enter your phone number"
                    variant="bordered"
                    isRequired
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    className="semibold-24 font-bold"
                />
                <div className="flex items-end w-fit">
                    <Button color="secondary" type="submit" className="semibold-12">
                        Get My Order
                    </Button>
                </div>
            </form>
        </div>
        <div className="gap-12 grid grid-cols-3 pt-8 justify-center">
        {Array.isArray(orders) && orders.map((item, index) => (
        <Card shadow="sm" key={index} className="w-9/12 justify-center">
            <CardBody className="overflow-visible p-0">
            <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={"design Cake"}
                className="w-full object-cover h-[240px]"
                src={item.cake_img}
            />
            </CardBody>
            <CardFooter className="flex flex-col items-start">
                <p className="bold-16">Order Id:   <span className="text-purple-500">{item.order_id}</span></p>
                <p className="bold-16">Cake Id:    <span className="text-purple-500">{item.cake_id}</span></p>
                <p className="regular-14">Order Date:    {item.order_date}</p>
                <p className="regular-14">Pickup Date:   {item.pickup_date}</p>
                <p className="regular-14">Order Status:   {item.order_status}</p>
                <p className="regular-14">Address:   {item.addr}</p>
                <AddImageModal order_id={item.order_id}/>
            </CardFooter>
        </Card>
        ))}
        
        </div>
    </div>
  );
}
