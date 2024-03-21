/** @jsxImportSource @emotion/react */
import * as s from "./style"; 

import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import RightTopButton from '../../components/RightTopButton/RightTopButton';
import { useInput } from "../../hooks/useInput";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { oAuth2SignupRequest, signupRequest } from "../../apis/api/signup";
import { useMutation } from "react-query";

function OAuth2SignupPage(props) {
    const [ searchParams ] = useSearchParams();
    const navigate = useNavigate();
    const [ username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage ] = useInput("username");
    const [ password, passwordChange, passwordMessage ] = useInput("password");
    const [ checkPassword, checkPasswordChange ] = useInput("checkPassword");
    const [ name, nameChange, nameMessage ] = useInput("name");
    const [ email, emailChange, emailMessage ] = useInput("email");
    const [ checkPasswordMessage, setCheckPasswordMessage ] = useState(null);

    const oAuth2SignupMutation = useMutation({
        mutationKey: "oAuth2SignupMutaion",
        mutationFn: oAuth2SignupRequest,
        onSuccess: response => {
            navigate("/auth/signin");
        },
        onError: error => {
            if(error.response.status === 400) {
                const errorMap = error.response.data;
                const errorEntries = Object.entries(errorMap);
                for(let [ k, v ] of errorEntries) {
                    if(k === "username") {
                        setUsernameMessage(() => {
                            return {
                                type: "error",
                                text: v
                            }
                        })
                    }
                }
            }else {
                alert("회원가입 오류");
            }
        }
    });

    useEffect(() => {
      if(!checkPassword || !password) { 
        setCheckPasswordMessage(() => null)
        return;
      }

      if(checkPassword === password) {
        setCheckPasswordMessage(() => {
            return {
                type: "success",
                text: ""
            }
        })
      }else {
        setCheckPasswordMessage(() => {
            return {
                type: "error",
                text: "비밀번호가 일치하지 않습니다."
            }
        })
      }
    }, [checkPassword, password]);
    

    const handleSignupSubmit = () => {
        const checkFlags = [
            usernameMessage?.type,
            passwordMessage?.type,
            checkPasswordMessage?.type,
            nameMessage?.type,
            emailMessage?.type
        ];
        if(checkFlags.includes("error") || checkFlags.includes(null) || checkFlags.includes(undefined)) {
            alert("가입 정보를 다시 확인해주세요");
            return;
        }
        // signupRequest({
        //     username,
        //     password,
        //     name,
        //     email
        // }).then(response => {
        //     console.log(response);
        //     if(response.status === 201){
        //         navigate("/auth/signin");
        //     }
        // }).catch(error => {
        //     if(error.response.status === 400) {
        //         const errorMap = error.response.data;
        //         const errorEntries = Object.entries(errorMap);
        //         for(let [ k, v ] of errorEntries) {
        //             if(k === "username") {
        //                 setUsernameMessage(() => {
        //                     return {
        //                         type: "error",
        //                         text: v
        //                     }
        //                 })
        //             }
        //         }
        //     }else {
        //         alert("회원가입 오류");
        //     }
        // });
        oAuth2SignupMutation.mutate({
            username,
            password,
            name,
            email,
            oauth2Name: searchParams.get("name"),
            providerName: searchParams.get("provider")
        });
    }

    return (
        <div>
            <div css={s.header}>
                <h2>회원가입({searchParams.get("provider")})</h2>
                <RightTopButton onClick={handleSignupSubmit}>가입하기</RightTopButton>
            </div>
            <AuthPageInput 
                type={"text"} 
                name={"username"} 
                placeholder={"사용자이름"} 
                value={username} 
                onChange={userNameChange} 
                message={usernameMessage} 
            />
            <AuthPageInput 
                type={"password"} 
                name={"password"} 
                placeholder={"비밀번호"} 
                value={password} 
                onChange={passwordChange} 
                message={passwordMessage} 
            />
            <AuthPageInput 
                type={"password"} 
                name={"checkPassword"} 
                placeholder={"비밀번호 확인"} 
                value={checkPassword} 
                onChange={checkPasswordChange} 
                message={checkPasswordMessage} 
            />
            <AuthPageInput 
                type={"text"} 
                name={"name"} 
                placeholder={"성명"} 
                value={name} 
                onChange={nameChange} 
                message={nameMessage} 
            />
            <AuthPageInput 
                type={"text"} 
                name={"email"} 
                placeholder={"이메일"} 
                value={email} 
                onChange={emailChange} 
                message={emailMessage} 
            />
        </div>
    );
}

export default OAuth2SignupPage;