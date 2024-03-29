/** @jsxImportSource @emotion/react */
import * as s from "./style"; 

import { useMutation, useQueryClient } from "react-query";
import { sendAuthMailRequest } from "../../apis/api/sendAuthMail";
import FullSizeLoader from "../../components/FullSizeLoader/FullSizeLoader";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { useNavigate } from "react-router-dom";


function MyPage() {
    useAuthCheck();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    const sendAuthMailMutation = useMutation({
        mutationKey: "sendAuthMailMutation",
        mutationFn: sendAuthMailRequest,
        retry: 0,
        onSuccess: (response) => {
            if(response) {
                alert("메일 전송 완료");

            }else {
                alert("메일 전송 실패");
            }
        }
    });

    const handleSendAuthMailClick = () => {
        sendAuthMailMutation.mutate();
    }

    return (
        <>
            {
                sendAuthMailMutation.isLoading
                ? <FullSizeLoader />
                :   <div css={s.layout}>
                        <div css={s.header}>
                            <div css={s.imgBox}>
                                <div css={s.profileImg}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR269mOZsfjSCnzmb39WXMTeSO0OBruslICgA&s" alt="" />
                                </div>
                            </div>
                            <div css={s.infoBox}>
                                <div css={s.infoText}>사용자이름: {principalData?.data.username}</div>
                                <div css={s.infoText}>이름: {principalData?.data.name}</div>
                                <div css={s.emailBox}>
                                    <div css={s.infoText}>이메일: {principalData?.data.email}</div>
                                    {
                                        principalData?.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0 
                                        ?
                                            <button css={s.infoButton} onClick={handleSendAuthMailClick}>인증하기</button>
                                        :
                                            <div css={s.emailcheck}><FaRegCircleCheck/></div>
                                    }
                                </div>
                                <div css={s.infobuttons}>
                                    <button css={s.infoButton}>정보 수정</button>
                                    <button css={s.infoButton} onClick={() => navigate("/account/edit/password")}>비밀번호 수정</button>
                                </div>
                            </div>
                        </div>
                        <div css={s.bottom}>
                        </div>
                    </div>
            }
            
        </>
    );
}

export default MyPage;