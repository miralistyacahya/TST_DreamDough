import axios from "axios";

const baseUrl = "https://18221116tubestst-production.up.railway.app/customer"
// const baseUrl = "http://127.0.0.1:8080/customer"

export const createNewCustomer = async (json: any) => {
    try {
        const response = await axios.post(baseUrl, json, {
            headers: {
                "Content-Type" : "application/json",
            },
        });
        // console.log("ini berhasil ayey");
        // console.log(response.data?.customer_id)
        return response.data?.customer_id;
    } catch (error) {
        console.log("error1");
        console.error('Error createNewCustomer:', error);
        throw new Error ("Error createNewCustomer");
    }
}

