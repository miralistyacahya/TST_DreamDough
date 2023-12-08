import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
// import {MailIcon} from './MailIcon.jsx';
// import {LockIcon} from './LockIcon.jsx';
import { HiShoppingBag } from "react-icons/hi2";
import { useSearchParams } from "next/navigation";
import { createNewCustomer } from "@/api/customers";
import { createOrder } from "@/api/orders";
import { toastSuccess } from "./toast";

interface OrderModalProps {
    cake_id: number | undefined;
  }
  
const OrderModal: React.FC<OrderModalProps> = ({ cake_id }) => {

// export default function OrderModal({ cake_id }: { cake_id: string }) {
  const searchParams = useSearchParams();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [customer_name, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pickup_date, setPickupDate] = useState<string>("");
  const [order_status, setOrderStatus] = useState<string>("");
  const [addr, setAddress] = useState<string>("");
  const [customer_id, setCustomerId] = useState<string|null>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const customerResponse = await handleAddCustomer(e);
          const newCustomer = customerResponse;
          setCustomerId(newCustomer);

          console.log(newCustomer);
          if (newCustomer) {
            await handleAddOrder(e, newCustomer);
          } else {
            console.error('Error: Invalid customer_id');
          }
        } catch (error) {
          console.error('Error handling submit:', error);
        }
      };
    
      const handleAddCustomer = async (e: any) => {
        e.preventDefault();
        try {
          const createCustomerRecord: any = await createNewCustomer({
            "customer_name": customer_name,
            "phone": phone
          });
    
          const newCustomer = createCustomerRecord;
          console.log(newCustomer);
          console.log("add customer success");
          
          return newCustomer;
        } catch (error) {
          console.error('Error createNewCustomer:', error);
          throw error; 
        }
      };
    
      const handleAddOrder = async (e: any, customerId: string) => {
        e.preventDefault();
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
        // setOrderDate(formattedDate);
        // console.log("cust_id", customerId);
        // console.log("cake_id", cake_id);
        // console.log("ord_date", order_date);
        // console.log("pick_date", pickup_date);
        // console.log("orstat", order_status);
        // console.log("ad", addr);
        try {
          const createOrderRecord: any = await createOrder({
            "customer_id": customerId,
            "cake_id": cake_id,
            "order_date": formattedDate,
            "pickup_date": pickup_date,
            "order_status": order_status,
            "addr": addr,
          });
    
          const OrderRecord = createOrderRecord;
          toastSuccess("Create Order Successfully!");
        } catch (error) {
          console.error('Error createOrder:', error);
        }
      };

    return (
    <>
      <Button radius="full"
            onPress={onOpen} 
            className="bg-gradient-to-tr from-purple-500 to-blue-400 text-white semibold-16 shadow-lg" 
            endContent={<HiShoppingBag color="white" size="18"/>}>
            Order this
    </Button> 
      <Modal 
        size="xl"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 semibold-24 text-purple-600">Order Cake</ModalHeader>
              <form onSubmit={handleSubmit}>
              <ModalBody>
              
                <Input
                  autoFocus
                  label="Name"
                  color="secondary"
                  key={""}
                  labelPlacement="outside"
                  placeholder="Enter your name"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <Input
                  label="Phone"
                  color="secondary"
                  labelPlacement="outside"
                  placeholder="Enter your phone number"
                  type="tel"
                  variant="bordered"
                  isRequired
                  required
                //   pattern="\\d+"
                //   className="input peer invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                  onChange={(e) => setPhone(e.target.value)}
                />
                {/* {
                    <span className="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    Harap masukkan angka yang valid
                    </span>
                } */}
                {/* <Input
                //   endContent={
                //     <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                //   }
                  label="Order Date"
                  color="secondary"
                  labelPlacement="outside"
                  placeholder="Enter your order date"
                  description='Fill this with the order date with the pattern "2023/06/15"'
                  variant="bordered"
                  isRequired
                  required
                /> */}
                <Input
                  label="Pickup Date"
                  color="secondary"
                  labelPlacement="outside"
                  description='Fill this with the pickup date with the pattern "2023-06-15"'
                  placeholder="Enter your pickup date"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setPickupDate(e.target.value)}
                />
                <Input
                  label="Option"
                  color="secondary"
                  labelPlacement="outside"
                  placeholder="Enter your service option"
                  variant="bordered"
                  description='Fill this with "Delivery" or "Pick Up"'
                  isRequired
                  required
                  onChange={(e) => setOrderStatus(e.target.value)}
                />
                <Input
                  label="Address"
                  color="secondary"
                  labelPlacement="outside"
                  placeholder="Enter your delivery address"
                  variant="bordered"
                  isRequired
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="secondary" type="submit" onPress={onClose}>
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

export default OrderModal;