import axios from "axios"

// const baseUrl = "https://18221116tubestst-production.up.railway.app/cake/"
// const baseUrl = "http://127.0.0.1:8080/"
const baseUrl = "https://18221116tubestst-production.up.railway.app/"

export const loginUser = async (data: any) => {
    try {
        const response = await axios.post(`${baseUrl}login`, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
        });
        // console.log("ini berhasil ayey");
        return response.data?.access_token;
    } catch (error) {
        console.log("error1");
        console.error('Error login:', error);
        throw new Error ("Error login");
    }
}

export const registerUser = async (data: any) => {
    try {
        const response = await axios.post(`${baseUrl}signup`, data, {
            headers: {
                "Content-Type": "application/json",
              },
        });
        // console.log("ini berhasil ayey");
        return response.data;
    } catch (error) {
        console.log("error1");
        console.error('Error register:', error);
        throw new Error ("Error register");
    }
}