/** @jsxImportSource @emotion/react */
import { Link } from "react-router-dom";
import * as S from "./style";
import defaultImg from "../../assets/images/profile/default.jpeg"
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { mypageSubmitRefreshState } from "../../atoms/mypageSubmitRefresh";

function RootHeader() {

    const [ profileImage, setProfileImage ] = useState(defaultImg);
    const [ refresh, SetRefresh] = useRecoilState(mypageSubmitRefreshState);

    useEffect(() => {
        if(refresh) {
            const localStroageUser = localStorage.getItem("user");
            if(!localStroageUser) {
                return;
            }
            const user = JSON.parse(localStroageUser);
            setProfileImage(() => user.imgUrl);
            SetRefresh(() => false);
        }
    }, [refresh])

    return (
        <div css={S.layout}>
            <Link css={S.titleLink} to={"/"}>
                <h1>사진첩 어플</h1>
            </Link>
            <Link css={S.mypageLink} to={"/mypage"}>
                <img src={profileImage} alt="" />
            </Link>
        </div>
    );
}

export default RootHeader;