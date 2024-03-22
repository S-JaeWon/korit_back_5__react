import axios from "axios";

const instance = axios.create({ // axios 수동 설정 ,axios를 api로 호출
    baseURL: "http://localhost:8080",
    headers: { // 모든 요청이 아래 Token을 가지고 감 
        Authorization: "Bearer " + localStorage.getItem("AccessToken")
    }
});

export default instance;

// https://velog.io/@dusunax/AXIOS%EB%9E%80-feat.-React