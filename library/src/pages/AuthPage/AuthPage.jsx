/** @jsxImportSource @emotion/react */
import { Route, Routes } from "react-router-dom";
import * as s from "./style"; 
import SignupPage from "../SignupPage/SignupPage";
import SigninPage from "../signinPage/SigninPage";

function AuthPage() {
    return (
        <div css={s.layout}>
            <Routes>
                <Route path='/signin' element={ <SigninPage /> } />
                <Route path='/signup' element={ <SignupPage /> } />
                <Route path='/signup/oauth' />
            </Routes>
        </div>
    );
}

export default AuthPage;