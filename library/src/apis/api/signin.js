import instance from "../util/instance"

export const signinRequest = async(data) => { // HTTP 요청을 보내면 해당 요청은 비동기적으로 처리, 리턴값은 Promise 객체이며, .then .catch 사용 가능
    const response = await instance.post("/auth/signin", data);
    return response;
}

