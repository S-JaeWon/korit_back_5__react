/** @jsxImportSource @emotion/react */
import * as S from "./style";
import WideButton from "../../components/WideButton/WideButton";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 *  1. 사진 불러오기 버튼을 클릭 후 5개 이상의 이미지를 불러올 수 있어야함.
 *  2. PromiseAll을 사용하여 이미지를 순서대로 불러와야함.
 *  3. 불러오기가 완료되면 "이미지를 저장하시겠습니까?" 라는 확인 취소 메세지 창이 떠야함.
 *  4. 확인 클릭시 localStorage에 key: photo, value: JSON 데이터
 *      [
 *          {
 *              id: 1,
 *              imageUrl: ""
 *          },
 *          {
 *              id: 2,
 *              imageUrl: ""
 *          }
 *      ]
 *      형식으로 저장되어야함.
 *  5. 취소시 저정되면 안됨.
 */

function PhotoRegister() {
    const navigate = useNavigate();
    const fileRef = useRef(); // WideButton에서 input이 작동함 Line:36, Line:37
    const [ loadPhotos, setLoadPhotos ] = useState([]); // [2]
    const [ photoSeq, setPhotoSeq ] = useState([]); // [3]

    useEffect(() => { // handlePhotoCheck에서 만든 photoSeq 배열을 가져와서 안에 있는 id가 loadPhotos 배열에 있는 객체 id와 비교하여 있다면 photoSeq 배열의 인덱스를 찾아 seq 번호 부여
        setLoadPhotos(() => loadPhotos.map((photo) => { 
            return {
                ...photo, 
                seq: photoSeq.includes(photo.id) ? photoSeq.indexOf(photo.id) + 1 : 0 // seq 번호만 부여. 배열에 없으면 0 부여
            }
        })); 
    }, [photoSeq])

    const handleFileChange = (e) => { // 파일이 변하면 작동함 Line:41
        const fileList = e.target.files; // 변화가 일어났을때 그 파일의 정보 -> e.target.files
        const fileArray = Array.from(fileList); // Array.from(); 사용하여 위 fileList를 배열로 만듦

        fileRef.current.value = ""; // List를 Array로 옮겨도 List 내에 값이 남아 있으므로 초기화 시켜줌

        if(fileArray.length === 0) { // 선택 취소 하게 해줌, 따로 명시하시 않으면 오류
            return; 
        }

        const filePromiseArray = fileArray.map((file) => new Promise((resolve) => { // 배열 속 파일을 하나씩 Promise로 변환해서 다시 배열로 만듦(map)
            // fileReader를 통해 파일을 읽어와야함
            const fileReader = new FileReader();

            fileReader.onload = (e) => { // readAsDataURL 함수 실행시Line:44 onload 실행, 파일마다 용량이 다르기 때문에 읽는 속도 다름 -> onload를 비동기 처리
                resolve(e.target.result); // e.target.result -> Promise 배열을 resolve 함수에 담아줌 
            }

            fileReader.readAsDataURL(file); // 읽어야 할 객체를 넣어줌, onload 함수가 정의되어 있어야 데이터 값 유의미 하므로 아래에 적어줌
        })); 
        //console.log(filePromiseArray); // fileArray -> 에서 Promise 가 담긴 배열로 변한걸 확인. dataURL 정보를 담고 있음

        

        Promise.all(filePromiseArray).then((result) => { // result를 객체 형태로 불러와 setLoadPhotos에 넣기
            setLoadPhotos(() => result.map( //[2]
                (dataUrl, index) => {
                    return {
                        id: index + 1,
                        seq: 0, // 초기값 0으로 선언
                        dataUrl
                    }
                }
            ));
        }); 
        
    }

    const handlePhotoCheck = (id) => { // 이미지 박스 체크 할때마다 작동, 전달 받은 photo.id를 통해 if문 실행, ex)[A, B, C] 순으로 이미지가 배열에 있을때 B이미지 선택시 이미 있으므로 filter를 통해 제거하고 다시 배열 생성 -> [A, C]
        if(photoSeq.includes(id)) { // photoSeq 빈배열, 배열 안에는 객체값이 아닌 객체의 ID값이 들어가 있음, 상태함수로 만들어서 작동할때 마다 렌더링
            setPhotoSeq(photoSeq => photoSeq.filter(seq => seq !== id)); 
        }else {
            setPhotoSeq(photoSeq => [...photoSeq, id]);
        }
    }
    // console.log(photoSeq); 이미지 체크 할때 마다 순서에 맞게 배열에 담김

    const handleSubmitClick = (e) => { // localStorage 저장
        // 결과 값을 result 라는 함수에 담아서 Promise 한번에 실행 
            //console.log(result); // dataURL 배열 확인 가능 
            const isSave = window.confirm("저장 하시겠습니까"); // (3) 
            // console.log(isSave); confirm 함수 기능 확인 가능 
            if(!isSave) { // Boolean 함수라 if문 가능, !isSave -> false 일때 if조건문 true, 취소 기능
                return;
            }
            const localStorageFiles = !localStorage.getItem("photo") ? [] : JSON.parse(localStorage.getItem("photo"))// null 값 체크, 비어있다면 빈 배열 생성, 아니라면 값 갖고 오기

            const lastId = localStorageFiles.length === 0 ? 0 : localStorageFiles[localStorageFiles.length - 1]; // 길이가 0 이라면 인덱스 -1 을 참조 하므로 인덱스 오류 발생. 길이가 0 일때 0값
            /*result*/const newPhotos = /*result*/loadPhotos
                .filter(photo => photo.seq !==0 )
                .sort((photoA, photoB) => photoA.seq - photoB.seq) // seq 번호 순서에 따라 정렬
                .map( // result 안에는 Url 값 존재, 하나씩 꺼내서 객체형태로 변환
                    (/*dataUrl*/photo, index) => {
                        return {
                            id: lastId + index + 1, // 마지막 id 에서 1씩 늘어남(index는 0 부터 시작이므로 +1 해주어야 함) ex) 3개까지 넣어쓰면 lastId는 3, 그 다음 파일의 id는 4부터 시작해서 반복
                            imageUrl: /*dataUrl*/photo.dataUrl
                        }
                    }
            ); 
            const newFiles = [...localStorageFiles, .../*result*/newPhotos] // 넣어줄 배열 생성
            localStorage.setItem("photo", JSON.stringify(newFiles)); // localStorage에 값 넣기
            alert=("저장완료");
            navigate("/photo/album");
        
    }

    return (
        <div css={S.layout}>
            <div css={S.header}>
                <h1 css={S.title}>사진 등록하기</h1>
                <button css={S.submitButton} onClick={handleSubmitClick}>완료</button>
            </div>
            <input 
                type="file" 
                style={{display: "none"}} 
                multiple={true}
                ref={fileRef} 
                onChange={handleFileChange}
            />
            <div css={S.container}>
                {
                    loadPhotos.map(photo => 
                        <div key={photo.id}>
                            <input css={S.checkBox} type="checkbox" id={"img" + photo.id} onChange={() => handlePhotoCheck(photo.id)} />
                            <label css={S.imageBox} htmlFor={"img" + photo.id}>
                                <div>{photo.seq}</div>
                                <img src={photo.dataUrl} alt="" />   
                            </label>
                        </div>
                    )
                }
            </div>
            <WideButton text={"사진 불러오기"} onClick={() => fileRef.current.click()}/>
        </div>
    );
}

export default PhotoRegister;