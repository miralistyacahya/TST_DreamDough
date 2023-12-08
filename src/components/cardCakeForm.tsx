import React, { useEffect, useState } from "react";
import {Button, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import { chooseCake, getCake } from "@/api/cakes";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import OrderModal from "./orderModal";

export default function CardCakeForm() {
    const [cakes, setCakes] = useState<Cakes>();
    const [cake_id, setCakeId] = useState<number>();
    const [imageSrc, setImageSrc] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const getCakeRecords = async () => {
            try {
                // console.log(path)
                const cake_id = searchParams.get("cake_id")
                console.log(cake_id)
                if(cake_id){
                    setCakeId(parseInt(cake_id));
                    const cakeRecord: any = await getCake(cake_id);
                    // console.log("ini cake record", cakeRecord)
                    const cakesData: Cakes = {
                    cake_id: cakeRecord[0],
                    cake_name: cakeRecord[1],
                    template_img: cakeRecord[2],
                    created_at: cakeRecord[3],
                    updated_at: cakeRecord[4],
                    cake_image: cakeRecord[5],
                  };
                    console.log("tes data", cakesData);
                    setCakes(cakesData);
                }
                
                // console.log("berhasil yeey");
                // console.log(cakeRecord)
            } catch (error) {
                console.error('Error getAllCake:', error);
            }
        };

        const getTemplateRecords = async () => {
            try {
                // console.log(path)
                const cake_id = searchParams.get("cake_id")
                // console.log(cake_id)
                if(cake_id){
                    const templateRecord: any = await chooseCake(cake_id);
                    // console.log("ini cake record", cakeRecord)
                    const contentType = templateRecord.headers['content-type'];
                    const imgBlob = new Blob([templateRecord.data], {type: contentType});
                    const imgUrl = URL.createObjectURL(imgBlob);
                    // console.log("tes data", cakesData);
                    setImageSrc(imgUrl);
                }
                
                // console.log("berhasil yeey");
                // console.log(cakeRecord)
            } catch (error) {
                console.error('Error getAllCake:', error);
            }
        };
        getCakeRecords();
        getTemplateRecords();
    }, []);

  return (
    <div className="p-8 flex justify-center">
      {/* {Array.isArray(cakes) && cakes.map((item, index) => ( */}
      {cakes ? 
      <Card shadow="sm" className="w-11/12 justify-center">
        <div className="pl-10 pt-6 flex justify-between items-center relative w-7/12">
            <div className="justify-start">
              <Button isIconOnly radius="full" size="sm" className="bg-purple-600 shadow-lg" onPress={() => router.push("/cakes")}>
                <IoMdArrowRoundBack size="18" color="white"/>
              </Button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <p className="semibold-24 text-purple-600">Get This Cake!</p>
            </div>
        </div> 
        <div className="grid grid-cols-2 gaps-12">
            <CardBody className="justify-center overflow-visible pl-10 py-6 gap-5">   
                <div className="pl-10 pb-4">
                    <Image
                    alt="Card background"
                    className="object-cover rounded-xl w-96 h-96"
                    src={cakes.cake_image}
                    />
                </div> 
            </CardBody>
            <CardFooter className="items-start flex flex-row pt-12 pr-20">
                <div className="items-start justify-start">
                    <p className="bold-32 py-2">{cakes.cake_name}</p>
                    <p className="text-md py-4">
                        Unleash your creativity! Craft your unique design by{' '}
                        <span className="font-semibold text-purple-500">downloading</span> this{' '}
                        <span className="font-semibold text-purple-500">template image</span>, making your{' '}
                        <span className="font-semibold text-purple-500">edits</span>, and{' '}
                        <span className="font-semibold text-purple-500">uploading</span> it on the 'My Order' page.
                    </p>
                    <div className="rounded-md ring-offset-4 ring-2 ring-purple-400/50 w-fit">
                        {imageSrc && <img src={imageSrc} alt="Cake Template" style={{ width: '100px', height: 'auto' }} className="rounded-lg cursor-pointer"/>}
                    </div>
                    <div className="flex py-4 items-center justify-end">
                        <OrderModal cake_id={cake_id}/>
                    </div> 
                </div>
                {/* <b>{cakes.cake_name}</b> */}
                {/* <p className="text-default-500">{item.cake_id}</p> */}
                {/* <IoIosAddCircle size="30" color="#5A5894"/> */}
            </CardFooter>
        </div>
      </Card> : ''}
    {/* ))} */}
    </div>
  );
}
