/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useMemo, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import { QUILL_MODULES } from "../../constants/quillModules";
import { useInput, useMaxSizeValidateInput } from "../../hooks/inputHook";
import { useQuillInput } from "../../hooks/qillHook";
import { useNavigate } from "react-router-dom";
import { useLoadList } from "../../hooks/boardListHook";

const layout = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 100px 120px;
    border: 1px solid #dbdbdb;
    padding: 50px 0px;

`;

const headerTitle = css`
    margin-bottom: 30px;
    text-align: center;
    font-size: 40px;
    font-weight: 700;
`;

const boardTitle = css`
    box-sizing: border-box;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #ccc;
    padding: 10px;
    width: 90%;
`;

const submitButton = css`
    box-sizing: border-box;
    margin-top: 50px;
    border: 1px solid #ccc;
    padding: 10px;
    width: 90%;
    background-color: white;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        background-color: #fafafa;
    }
    &:active {
        background-color: #eee;
    }

`;

function BoardWrite() {

    // const [ inputValue, setInputValue] = useState("");

    // const handleInputChange = (e) => {
    //     const { value } = e.target;


    //     if(value.length < 20) {
    //         setInputValue(() => value);
    //     }
    // }

    const navigate = useNavigate();

    // 비구조 할당 const [ a, b ] = [ 1, 2 ]; a에 1, b에 2
    const [ inputValue, handleInputChange ] = useMaxSizeValidateInput(20); // 문자 20자 만 가능
    // const [ inputValue2, handleInputChange2 ] = useInput(); 하나 더 만들때 한 번 더 호출

    const [ quillValue, handleQuillValueChange ] = useQuillInput();
    const { boardList, lastId } = useLoadList();

    // const boardList = useMemo(() => { // hook으로 
    //     const lsBoardList = localStorage.getItem("boardList");
    //     return !lsBoardList ? [] : JSON.parse(lsBoardList);
    // }, []);

    const handleSubmitClick = () => {
        // const lastIndex = boardList.length - 1; // hook으로 
        // const lastId = lastIndex < 0 ? 0 : boardList[boardList.length - 1].boardId;
        let newBoardList = [];

        for(let i = 0; i < 203; i++) {
            const board ={
                boardId: /**lastId + 1 */i + 1,
                boardTitle: inputValue + (i + 1),
                boardContent: quillValue
            };

           // newBoardList = [...boardList, board];
            newBoardList = [...newBoardList, board];
        }
        
        localStorage.setItem("boardList", JSON.stringify(newBoardList)); // 로컬스토리지에 위에 만든 새 배열을 덮어씀 
        alert("글 작성");

        // boardList로 넘어가기 
        navigate("/board/list"); 
    }

    return (
        <div css={layout}>
            <h1 css={headerTitle}>글 작성하기</h1>
            <input 
                css= {boardTitle} 
                type="text" 
                placeholder="제목을 입력하세요."
                onChange={handleInputChange} 
                value={inputValue} 
             />
            <ReactQuill 
                style={{
                width: "90%",
                height: "400px"
                }} 
                modules={QUILL_MODULES}
                onChange={handleQuillValueChange}
            />
            <button css={submitButton} onClick={handleSubmitClick}>작성하기</button>
        </div>
    );
}

export default BoardWrite;