import axios from "axios"

// const externalUrl = "http://menurecommendation.hdbrd0atezbrd6eh.eastus.azurecontainer.io/"
const externalUrl = "https://menurecommend.azurewebsites.net/"

export const getTokenExternal = async (data: any) => {
    try {
        const response = await axios.post(`${externalUrl}token`, data, {
            headers: {
                'accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded",
              },
        });

        // console.log("ini berhasil ayey");
        return response.data?.access_token;
    } catch (error) {
        console.log("error1");
        console.error('Error external service:', error);
        throw new Error ("Error external service");
    }
}

export const addUserExternal = async (data: any, token: string) => {

    try {
        const response = await axios.post(`${externalUrl}add_user?id_user=${data.id_user}&nama_user=${data.nama_user}&jenis_kelamin=${data.jenis_kelamin}&umur_user=${data.umur_user}&target_kalori=${data.target_kalori}`, {}, {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": "application/json",
            },
        });
        // console.log("ini berhasil ayey");
        return response.data;
    } catch (error) {
        console.log("error1");
        console.error('Error user external service:', error);
        throw new Error ("Error user external service");
    }
}

export const getRecommendationExternal = async (id_user: number, token: string) => {
    try {
        const response = await axios.get(`${externalUrl}get_recommendation?id_user=${id_user}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
        });
        // console.log("ini berhasil ayey");
        return response.data?.recommended_meals;
    } catch (error) {
        console.log("error1");
        console.error('Error recommendation external:', error);
        throw new Error ("Error recommendation external");
    }
}
