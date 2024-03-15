import instance from "../util/instance"

export const signupRequest = async (data) => {
    try {
        const response = instance.post("/auth/signup", data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;   
    }
}