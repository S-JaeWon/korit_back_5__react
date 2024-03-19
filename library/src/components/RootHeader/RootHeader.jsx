/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style"; 
import { HiMenu } from "react-icons/hi";
import { menuState } from "../../atoms/menuAtom";
import { Link, useNavigate } from "react-router-dom";
import { FiUser,FiLogOut } from "react-icons/fi";
import { principalState } from "../../atoms/principalAtom";
import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import instance from "../../apis/util/instance";

function RootHeader() {
    // const [ principal, setPrincipal ] = useRecoilState(principalState);
    const [ show, setShow ] = useRecoilState(menuState); 
    const [ isLogin, setIsLogin ] = useState(false);
    const queryClient = useQueryClient();
    // const principal = queryClient.getQueryData("principalQuery");
    const principalQueryState = queryClient.getQueryState("principalQuery")
    

    useEffect(() => {
        // console.log("useEffect")
        // console.log(principal);
        // console.log(principalState)
        const principalQueryState = queryClient.getQueryState("principalQuery")
        setIsLogin(() => principalQueryState.status === "success")
    }, [principalQueryState.status])
    

    // useEffect(() => {
    //     getPrincipal();
    // }, [])

    // const getPrincipal = useCallback(() => {
    //     getPrincipalRequest()
    //     .then(response => {
    //         console.log(response);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, []);
    // AuthRoute로

    const handleOpenClick = (e) => {
       e.stopPropagation();
        setShow(() => true);
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("AccessToken"); // Authorization 에는 여전히 토큰 정보가 있으므로 응답은 200임
        instance.interceptors.request.use((config) => { // Authorization 을 null 로 바꿈
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("principalQuery"); 
    }

    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={handleOpenClick}>
                <HiMenu />
            </button>
            {
                !isLogin 
                ?   <Link css={s.account} to={"/auth/signin"}>
                        <FiUser />
                    </Link> 
                :
                    <div css={s.accountItems}>
                        <button css={s.logout} onClick={handleLogoutClick}>
                            <FiLogOut />
                        </button>
                        <Link css={s.account} to={"/accout/mypage"}>
                            <FiUser />
                        </Link>
                    </div>    
            }
        </div>
    );
}

export default RootHeader;