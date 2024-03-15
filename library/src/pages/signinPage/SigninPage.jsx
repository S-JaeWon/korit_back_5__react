/** @jsxImportSource @emotion/react */
import * as s from "./style"; 

import { Link } from "react-router-dom";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import RightTopButton from "../../components/RightTopButton/RightTopButton";
import { useInput } from "../../hooks/useInput";
import { signinRequest } from "../../apis/api/signin";

function SigninPage(props) {
    const [ username, usernameChange ] = useInput();
    const [ password, passwordChange ] = useInput();

    const handleSigninSubmit = () => {
        signinRequest ({
            username,
            password
        }).then(response => {
            const accessToken = response.data;
            localStorage.setItem("AccessToken", accessToken); // 로컬스토리지에 토큰을 넣어줌
            window.location.replace("/") 
        }).catch(error => {
            alert(error.response.data);
        })
    }

    return (
        <>
            <div css={s.header}>
                <h1>로그인</h1>
                <RightTopButton onClick={handleSigninSubmit}>로그인하기</RightTopButton>
            </div>
            <AuthPageInput 
                type={"text"} 
                name={"username"} 
                placeholder={"사용자이름"} 
                value={username} 
                onChange={usernameChange} 
            />
            <AuthPageInput 
                type={"password"} 
                name={"password"} 
                placeholder={"비밀번호"} 
                value={password} 
                onChange={passwordChange} 
            />
            <Link to={"/autho/signup"}>회원가입</Link>
            <div>
                <Link>카카오로그인</Link>
                <Link>구글로그인</Link>
                <Link>네이버로그인</Link>

            </div>
        </>
    );
}

export default SigninPage;