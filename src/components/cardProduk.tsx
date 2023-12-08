import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { getAllCake } from "@/api/cakes";
import { IoIosAddCircle } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function CardProduk() {
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

const handleCardClick = (cakeId: string) => {
    const url = `/cakesForm?cake_id=${cakeId}`;
    router.push(url);
  };

  return (
    <div className="gap-12 grid grid-cols-2 sm:grid-cols-4 pt-2 justify-center">
      {Array.isArray(cakes) && cakes.map((item, index) => (
      <Card shadow="sm" key={index} isPressable onPress={() => handleCardClick(item.cake_id)/*console.log("item pressed")*/} className="w-11/12 justify-center">
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
          <IoIosAddCircle size="30" color="#5A5894"/>
        </CardFooter>
      </Card>
    ))}
    </div>
  );
}
