import axios from "axios";

const instance = axios.create({ // axios 수동 설정
    baseURL: "http://localhost:8080"
});

export default instance;