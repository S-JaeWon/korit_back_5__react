import instance from "../util/instance"

export const editPasswordRequest = async (data) => {
    return await instance.put("/account/password", data);

}