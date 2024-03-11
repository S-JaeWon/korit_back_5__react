/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import WideButton from "../../components/WideButton/WideButton";
import { useInput } from "../../hooks/useInput";
import * as S from "./style";
import defaultProfile from "../../assets/images/profile/default.jpeg"
import { useRecoilState } from "recoil";
import { mypageSubmitRefreshState } from "../../atoms/mypageSubmitRefresh";


/**
 * 
 * 1. 이미지 클릭시 이미지 변경가능해야함.
 * 2. 수정하기 버튼 클릭시 localStorage에 key: user value: JSON데이터
 *  {
 *      nickname: "테스트계정",
 *      namd: "김준일",
 *      birthday: "1994-09-07",
 *      imgUrl: ""
 *  }
 *  저장되어야하고 페이지 로드시 불러와야함.
 * 3. RootHeader의 프로필 이미지도 변경되어야함.
 */
function Mypage(props) {
    const [ nicknameValue, setNicknameValue, handleNicknameOnChange ] = useInput();
    const [ nameValue, setNameValue, handleNameOnChange ] = useInput();
    const [ birthdayValue, setBirthdayValue, handleBirthdayOnChange ] = useInput();
    const [ profileUrl, setProfileUrl ] = useState(defaultProfile);

    const [ refresh, setRefresh ] = useRecoilState(mypageSubmitRefreshState);

    const fileRef = useRef();

    useEffect(() => { // 렌더링 시 화면에 나오는 정보는 초기화 될 필요 없으므로
        const localStorageUser = localStorage.getItem("user");
        if(!!localStorageUser) { // 그냥 들고오면 객체 이므로 '값이 있을때' 라는 조건을 달려면 앞에 !!(not not) 달아주기
            const user = JSON.parse(localStorageUser);
            setNicknameValue(() => user.nickname);
            setNameValue(() => user.name);
            setBirthdayValue(() => user.birthday);
            setProfileUrl(() => user.imgUrl);
        }
    }, [])

    const handleFileChange = (e) => {
        const files = e.target.files;

        if(files.length === 0) {
            return;
        }

        const file = files[0];

        const fileReader = new FileReader();

        fileReader.onload= (e) => {
            setProfileUrl(() => e.target.result);
        }

        fileReader.readAsDataURL(file);
    }

    const handleSubmitClick = (e) => {
        const user = {
            nickname: nicknameValue,
            name: nameValue,
            birthday: birthdayValue,
            imgUrl:profileUrl
        }

        localStorage.setItem("user", JSON.stringify(user)); // 로컬스토리지에 키 user, 값: user 객체 저장 
        alert("저장 완료");
        setRefresh(() => true);
    }
    
    return (
        <div css={S.layout}>
            <div css={S.imageBox} onClick={() => fileRef.current.click()}>
                <input style={{display:"none"}} type="file" ref={fileRef} onChange={handleFileChange} />
                <img src={profileUrl} alt="" />
            </div>
            
            <input css={S.inputBox} type="text" placeholder="닉네임" value={nicknameValue} onChange={handleNicknameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="이름" value={nameValue} onChange={handleNameOnChange}/>
            <input css={S.inputBox} type="text" placeholder="생년월일" value={birthdayValue} onChange={handleBirthdayOnChange}/>
            <WideButton text={"완료"} onClick={handleSubmitClick}/>
        </div>
    );
}

export default Mypage;