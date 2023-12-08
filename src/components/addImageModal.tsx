import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { toastSuccess } from "./toast";
import { addImage } from "@/api/orders";

interface AddImageModalProps {
    order_id: string;
  }
  
const AddImageModal: React.FC<AddImageModalProps> = ({ order_id }) => {

  const searchParams = useSearchParams();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

    
    const [fileStatus, setFileStatus] = useState<{ [key: string]: string }>({});
    const acceptedFileTypes = ["image/png", "image/jpeg"]
    const isError = Object.values(fileStatus).some(status => status !== 'Uploaded');

    const addImageRecords = async (file: File) => {
        try {
            console.log("tesorder", order_id);
          const addImageRecord: any = await addImage(order_id, file);
          const imageRecord = addImageRecord;
            toastSuccess("Create Order Successfully!");
        } catch (error) {
          console.error('Error getOrderCustomer:', error);
        }
      };

      const fileSelectedHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const files = Array.from(event.target.files);
            let isValid = true; // Flag to check if all files are valid
            let fileErrors: { [key: string]: string } = {};

            for (const file of files) {
                if (acceptedFileTypes && !acceptedFileTypes.includes(file.type)) {
                    fileErrors[file.name] = "File type not accepted. Accepted types: " + acceptedFileTypes.join(', ');
                    isValid = false;
                }
            }

            if (!isValid) {
                setFileStatus(fileErrors);
                console.log("sala1");
            } else {
                files.forEach(file => {
                    console.log("tesss");
                    addImageRecords(file);
                });
            }
        }
        
    };

    return (
    <>
      <Button radius="full"
            onPress={onOpen} 
            className="bg-gradient-to-tr from-purple-500 to-blue-400 text-white semibold-12 shadow-lg" 
            >
            Change Design
    </Button> 
      <Modal 
        size="md"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
            
              <ModalHeader className="flex flex-col gap-1 semibold-24 text-purple-600">Add Cake Design</ModalHeader>
              <form>
              <ModalBody>
                <div className="p-3 rounded-md">
                    <label className="block mb-2 semibold-14 text-purple-600" htmlFor="file_input">
                        Upload Cake Design
                    </label>
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] semibold-14 font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-purple-100 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
                        type="file"
                        id="formFile"
                        onChange={fileSelectedHandler}
                    />
                </div>                
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
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

export default AddImageModal;