import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input, Link} from "@nextui-org/react";
import { createNewCustomer } from "@/api/customers";
import { createOrder } from "@/api/orders";
import { toastError, toastSuccess } from "./toast";
import { addUserExternal, getRecommendationExternal, getTokenExternal } from "@/api/external.api";

  
export default function ExternalModal() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [calorie, setCalorie] = useState<string>("");
  const [dataDiet, setDataDiet] = useState<Diet>({ nama_menu: "", kalori: "" });
  const [count, setCount] = useState<number>(1200);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const tokenResponse = await handleToken(e);
          const newToken = tokenResponse;
        //   setCustomerId(newCustomer);

          console.log(newToken);
          if (newToken) {
            await handleAddUser(e, newToken);
          } else {
            console.error('Error: Invalid customer_id');
          }
        } catch (error) {
          console.error('Error handling submit:', error);
        }
    };
    
    const handleToken = async (e: any) => {
        e.preventDefault();
        const data = {
            username: "rarariri",
            password: "123456789",
        }
        try {
            const loginRecord: any = await getTokenExternal(data);

            const token = loginRecord;
            // toastSuccess("get Token Successful!");
            return token;
        } catch(error){
            console.log("get Token error");
            // toastError("Login Failed!");
        }
    };
    
    const handleAddUser = async (e: any, token: string) => {
        e.preventDefault();
        try {
          const createOrderRecord: any = await addUserExternal({
            "id_user": count,
            "nama_user": name,
            "jenis_kelamin": gender,
            "umur_user": age,
            "target_kalori": calorie,
          }, token);
          
          const DietRecord: any = await getRecommendationExternal(count, token);

          let randIndex;
          let randomDiet;
          if (DietRecord.length() > 0) {
            randIndex = Math.floor(Math.random() * DietRecord.length);
            if(randIndex) {
                randomDiet = DietRecord[randIndex];
                setDataDiet({
                    nama_menu: randomDiet.nama_menu,
                    kalori: randomDiet.kalori.toString(),
                  });
            }
            } else {
                randomDiet = "gaada";
            }

          toastSuccess("Get Diet Recommendation Successfully!");
          setCount(count+1);
        } catch (error) {
          console.error('Error createOrder:', error);
        }
    };

    const handleModalClose = () => {
    // Clear the data when the modal is closed
        setDataDiet({ nama_menu: "", kalori: "" });
    };

    return (
    <>
      <Button color="secondary" onPress={onOpen} variant="shadow" className="medium-14 hover:font-bold">
            Get Recommendation
     </Button>
      <Modal 
        size="xl"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        onClose={handleModalClose}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 semibold-24 text-purple-600">Get Diet Recommendation</ModalHeader>
              <form onSubmit={handleSubmit}>
              <ModalBody>
              
                <Input
                  autoFocus
                  label="Name"
                  color="secondary"
                  key={"name"}
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  label="Gender"
                  color="secondary"
                  labelPlacement="outside"
                  key={"gender"}
                  description='Fill this with "Perempuan"/"Laki-laki"'
                  placeholder="Enter your gender"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <Input
                  label="Age"
                  color="secondary"
                  labelPlacement="outside"
                  placeholder="Enter your age"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setAge(e.target.value)}
                />
                <Input
                  label="Calorie Goal"
                  color="secondary"
                  labelPlacement="outside"
                  placeholder="Enter your calorie goal"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setCalorie(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-center">
                    {dataDiet.nama_menu !== "" ?
                    <div className="flex flex-col items-start">
                        <p className="medium-16">Menu:   <span className="text-purple-500">{dataDiet.nama_menu}</span></p>
                        <p className="medium-16">Calorie:   <span className="text-purple-500">{dataDiet.kalori}</span></p>
                    </div>
                    :
                    <div className="flex flex-col items-start">
                        <p className="medium-16">Tidak ada rekomendasi</p>
                    </div>
                    }
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="secondary" type="submit">
                  Submit
                </Button>
              </ModalFooter>
            </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}