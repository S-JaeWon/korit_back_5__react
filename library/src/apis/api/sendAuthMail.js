import instance from "../util/instance"

export const sendAuthMailRequest = async () => {
    return await instance.post("/mail/send");
}