import instance from "../util/instance"

export const getPrincipalRequest = async () => {
    return await instance.get("/account/principal");
    // headers: { 
    //     Authorization: localStorage.getItem("AccessToken")
    // } 
    // instance로 빼서 한번에 쓰기 
}