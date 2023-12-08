import React, { useEffect, useState } from "react";
import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { getAllCake } from "@/api/cakes";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function CardProdukA() {
    const [cakes, setCakes] = useState<Cakes[]>([]);
    const router = useRouter()

    useEffect(() => {
        const getAllCakeRecords = async () => {
            try {
                const cakeRecord: any = await getAllCake();
                const cakesData: Cakes[] = cakeRecord.map((record: any) => ({
                    cake_id: record[0],
                    cake_name: record[1],
                    template_img: record[2],
                    created_at: record[3],
                    updated_at: record[4],
                    cake_image: record[5],
                  }));
                setCakes(cakesData);
                // setCakes(cakeRecord.data);
                // console.log("berhasil yeey");
                // console.log(cakeRecord)
            } catch (error) {
                console.error('Error getAllCake:', error);
            }
        };

        getAllCakeRecords();
    }, []);

  return (
    <div>
        <div className="py-4">
            <Button radius="full"
                // onPress={onOpen} 
                className="bg-gradient-to-tr from-purple-600 to-purple-500 text-white semibold-16 shadow-lg" 
                /*endContent={<HiShoppingBag color="white" size="18"/>}*/>
                Add Product
            </Button> 
        </div>
        <div className="gap-12 grid grid-cols-2 sm:grid-cols-4 pt-2 justify-center">
            {Array.isArray(cakes) && cakes.map((item, index) => (
            <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed tidak dibuat")} className="w-11/12 justify-center">
                <CardBody className="overflow-visible p-0">
                <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={item.cake_name}
                    className="w-full object-cover h-[140px]"
                    src={item.cake_image}
                />
                </CardBody>
                <CardFooter className="text-small justify-between">
                <b>{item.cake_name}</b>
                {/* <p className="text-default-500">{item.cake_id}</p> */}
                <FaEdit size="20" color="#5A5894"/>
                </CardFooter>
            </Card>
            ))}
        </div>
    </div>

  );
}
