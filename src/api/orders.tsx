import axios from "axios"

const baseUrl = "https://18221116tubestst-production.up.railway.app/"
// const baseUrl = "http://127.0.0.1:8080/"

export const getCustomerOrder = async (phone: string) => {
    try {
        const response = await axios.get(`${baseUrl}customerOrder/${phone}`, {
            headers: {
                "Content-Type" : "application/json",
            },
        });
        // console.log("ini berhasil ayey");
        return response.data?.response as Orders[];
    } catch (error) {
        console.log("error1");
        console.error('Error getCustomerOrder:', error);
        throw new Error ("Error getCustOrder");
    }
}

export const getRecommendation = async () => {
    try {
        const response = await axios.get(`${baseUrl}recommendation`, {
            headers: {
                "Content-Type" : "application/json",
            },
        });
        // console.log(response.data)
        return response.data;
    } catch (error) {
        console.log("ini error?");
        console.error('Error getRecommendation:', error);
        throw new Error ("Error getRecommendation");
    }
}

export const createOrder = async (json: any) => {
    try {
        const response = await axios.post(`${baseUrl}order`, json, {
            headers: {
                "Content-Type" : "application/json",
            },
        });
        // console.log("ini berhasil ayey");
        return response.data;
    } catch (error) {
        console.log("error1");
        console.error('Error CreateOrder:', error);
        throw new Error ("Error createOrder");
    }
}

export const addImage = async (order_id: string, file: File) => {
    const formData = new FormData();
        formData.append('file', file);

    try {
        const response = await axios.patch(`${baseUrl}order/${order_id}/image`, formData, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        });
        // console.log("ini berhasil ayey");
        return response.data;
    } catch (error) {
        console.log("error1");
        console.error('Error CreateOrder:', error);
        throw new Error ("Error addImage");
    }
}