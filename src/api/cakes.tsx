import axios from "axios"

const baseUrl = "https://18221116tubestst-production.up.railway.app/cake"
// const baseUrl = "http://127.0.0.1:8080/cake"

export const getAllCake = async () => {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                "Content-Type" : "application/json",
            },
        });
        // console.log("ini berhasil ayey");
        return response.data?.response as Cakes[];
    } catch (error) {
        console.log("error1");
        console.error('Error getAllCake:', error);
        throw new Error ("Error getAllCake");
    }
}

export const getCake = async (cake_id : string) => {
    try {
        const response = await axios.get(`${baseUrl}/${cake_id}`, {
            headers: {
                "Content-Type" : "application/json",
            },
        });
        // console.log("ini berhasil ayey");
        // console.log(response);
        return response.data?.response as Cakes;
    } catch (error) {
        console.log("error1");
        console.error('Error getCake:', error);
        throw new Error ("Error getCake");
    }
}

export const chooseCake = async (cake_id : string) => {
    try {
        const response = await axios.get(`${baseUrl}/${cake_id}/template`, {
            headers: {
                "Content-Type" : "application/json",
            },
            responseType: 'arraybuffer',
        });

        return response;
    } catch (error) {
        console.log("error3");
        console.error('Error chooseCake:', error);
        throw new Error ("Error chooseCake");
    }
}