/** @jsxImportSource @emotion/react */
import { useRef, useState } from "react";
import * as S from "./style";
import logo512 from "./다운로드.png"

function Mypage() {
    const [ preview, setPreview ] = useState("");
    
    const imgFileRef = useRef(); // 파일(사진) 클릭시 <input style={{display:"none"~~ handleImgFileChage}/> 대신 작동하게 함!

    const handleImgFileChage = (e) => {
        const fileReader = new FileReader();
        /*
        파일 선택 취소시 빈배열을 가지고 오게 되는데, 
        fileReader.readAsDataURL(e.target.files[0]); 코드에 의해 빈배열의 인덱스를 가져오게 되면서 오류가 생기게 됨.
        이때 배열의 길이가 0일때 빠져나오게 하는 함수를 따로 설정해주어야 함 
        */
        if(e.target.files.length === 0) { 
            return;
        }        

        fileReader.onload = (e) => {
            setPreview(e.target.result);
        };

        fileReader.readAsDataURL(e.target.files[0]);
    }

    return (
        <div css={S.layout}>
            <div css={S.profileHeader}> 
                <h1 css={S.title}>마이페이지</h1>
                    <div css={S.profileImg} onClick={() => imgFileRef.current.click()}> 
                        <img src={preview} alt="" />
                        <input style={{display: "none"}}type="file" ref={imgFileRef} onChange={handleImgFileChage}/>
                    </div>
                <div css={S.nicknameLayout}>
                    <input css={S.nickname} type="text" maxLength={20} />
                </div>
            </div>
            <div css={S.profileInputLayout}>
                <div css={S.inputBox}>
                    <input css={S.profileInput} id="name" type="text" placeholder=" " />
                    <label htmlFor="name">성명</label>
                </div>
                <div css={S.inputBox}>
                    <input css={S.profileInput} id="birth" type="text" placeholder=" " />
                    <label htmlFor="birth">생년월일</label>
                </div>
                <div css={S.inputBox}>
                    <input css={S.profileInput} id="phone" type="text" placeholder=" " />
                    <label htmlFor="phone">연락처</label>
                </div>
                <div css={S.inputBox}>
                    <input css={S.profileInput} id="address" type="text" placeholder=" " />
                    <label htmlFor="address">주소</label>
                </div>
            </div>
            <div css={S.buttonLayout}>
                <button css={S.profilebutton}>수정하기</button>
            </div>
        </div>
    );
}

export default Mypage;