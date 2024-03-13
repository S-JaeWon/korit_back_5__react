/** @jsxImportSource @emotion/react */
import * as s from "./style"; 
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from '../../components/RightTopButton/RightTopButton';
import { useInput } from "../../hooks/useInput";
import axios from "axios";

function SignupPage() {
    const [ username, setUsername, userNameChange ] = useInput();
    const [ password, setPassword, passwordChange ] = useInput();
    const [ checkPassword, setCheckPassword, checkPasswordChange ] = useInput();
    const [ name, setName, nameChange ] = useInput();
    const [ email, setEmail, emailChange ] = useInput();

    const handleSignupSubmit = () => {

        const signupData = {
            username,
            password,
            checkPassword,
            name,
            email
        }

        signupRequest(signupData);

    }

    const signupRequest = async (signupData) => { // fetch 대신 axios 사용 (npm i axios)
        try {// await은 try-catch문으로 감싸기
            const response = await axios.post("http://localhost:8080/auth/signup", signupData); // 주소로 post 요청
            console.log(response)

        } catch (error) {
            console.log(error);
            
        }
        
    }

    return (
        <div>
            <div css={s.header}>
                <h1>회원가입</h1>
                <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
            </div>
            <AuthPageInput type={"text"} text={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={userNameChange} />
            <AuthPageInput type={"password"} text={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange }/>
            <AuthPageInput type={"password"} text={"checkPassword"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} />
            <AuthPageInput type={"text"} text={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} />
            <AuthPageInput type={"text"} text={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} />
         
        </div>
    );
}

export default SignupPage;