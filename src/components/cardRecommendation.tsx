import React, { useEffect, useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { getRecommendation } from "@/api/orders";
import { IoIosAddCircle } from "react-icons/io";

export default function CardRecommendation() {
const [cakes, setCakes] = useState<CakeRecommendation[]>([]);
    
    useEffect(() => {
        const getRecommendationRecords = async () => {
            try {
                const cakeRecomRecord: any = await getRecommendation();
                const cakesData: CakeRecommendation[] = [
                    {
                        cake_name: cakeRecomRecord.cake_name,
                        cake_img: cakeRecomRecord.cake_img,
                      }
                ];
                setCakes(cakesData);
                // setCakes(cakeRecord.data);
                // console.log("berhasil yeey");
                // console.log(cakeRecomRecord)
            } catch (error) {
                // console.log("error kah");
                console.error('Error getRecommendationCake:', error);
            }
        };

        getRecommendationRecords();
    }, []);

  return (
    <div className="gap-12 flex justify-center items-center">
      {Array.isArray(cakes) && cakes.map((item, index) => (
        <Card shadow="sm" key={index} className="w-7/12 h-64">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              height="100%"
              alt={item.cake_name}
              className="w-full object-cover h-[200px]"
              src={item.cake_img}
            />
          </CardBody>
          <CardFooter className="text-large justify-center">
            <b>{item.cake_name}</b>
            {/* <p className="text-default-500">{item.price}</p> */}
            {/* <IoIosAddCircle size="30" color="#5A5894"/> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
