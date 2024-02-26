/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/fireBase";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid";

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

const imageLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    width: 300px;
    height: 300px;
    border: 1px solid #dbdbdb;
    overflow: hidden;
    & > img {
        width: 100%;
    }

`;

function ImageEx() {
    const [ urls, setUrls ] = useState([]);
    const [ uploadFiles, setUploadFiles ] = useState([]);
    // const [ preview, setPreview ] = useState("");
    // 여러장의 이미지를 삽입 하기 위해선 배열로 만들어줌
    const [ previews, setPreviews ] = useState([]);
    const [ progressPercent, setProgressPercent] = useState(0);
    const imgFileRef = useRef();

    useEffect(() => { // ~~ ? A : B -> !: not, !!: not의 not -> true
        setUrls(!localStorage.getItem("urls") ? [] : JSON.parse(localStorage.getItem("urls")));
    }, []);

    const handleImgFileChage = (e) => {
        const files = Array.from(e.target.files); // filelist를 일반 배열로 바꿔줌
        if(e.target.files.length === 0) { 
            imgFileRef.current.value = ""; // 취소 버튼 누르면 빈 사진 
            return;
        }    
        setUploadFiles(files);

        let promises = []; 

        // (2) 배열에서 map으로 이미지 호출 -> 코드가 더 간결해짐 
        promises = files.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();
            
            fileReader.onload = (e) => {
                console.log(e.target.result)
                resolve(e.target.result);
            };
            
            fileReader.readAsDataURL(file);
        })); // 일반 배열로 바뀐 filelist를 map으로 바꿈 
        

        // (1) 배열로 이미지 호출 
        // for(let file of e.target.files) {
        //     promises = [...promises, new Promise((resolve) => {
        //         const fileReader = new FileReader();
                
        //         fileReader.onload = (e) => {
        //             console.log(e.target.result)
        //             resolve(e.target.result);
        //         }; // 비동기로 처리 되므로 Promise.all 사용
                
        //         fileReader.readAsDataURL(file);
        //     })]; // 배열에 promise들만 순서대로 넣어둠, 실행은 아직 안 함, promise.all에서 실행하여 동기로 진행
        // }  
        
        // Promise.all은 동기로 작동함, Promise.all 에 promises를 담음, 첫번째 promise 실행 두번째...  순서대로 실행 후 배열에 들어감 
        Promise.all(promises)
        .then(result => {
            setPreviews(result);
        });
        
        // let ps = [
        //     new Promise(resolve => resolve(1)),
        //     new Promise(resolve => resolve(2)),
        //     new Promise(resolve => resolve(3))
        // ]; 

        // Promise.all(ps).then(result => console.log(result)); -> 값들을 result(배열)에 담아서 [1, 2, 3] 출력 
    }

    const handleImageUpload = () =>{
        const file = uploadFiles[0];
        console.log(uploadFiles);
        const storageRef = ref(storage, `filse/test/${uuid()}_${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file);

        let promises = []; 

        promises = urls.map(url => new Promise((resolve)=>{
            uploadTask.on(
                "state_changed", // 업로드 되고 있는 상황 
                (snapshot) => {
                    setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef).then(url => {
                        localStorage.setItem("urls", url);
                        setUrls(url);
                        setPreviews([]); // 이미지 업로드 후 이미지를 담아둔 previews는 빈 배열로 두기
                    })
                }
            );
        }));

        // uploadTask.on(
        //     "state_changed", // 업로드 되고 있는 상황 
        //     (snapshot) => {
        //         setProgressPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
        //     },
        //     (error) => {},
        //     () => {
        //         getDownloadURL(storageRef).then(urls => {
        //             localStorage.setItem("urls", urls);
        //             setUrls(urls);
        //             setPreviews([]); // 이미지 업로드 후 이미지를 담아둔 previews는 빈 배열로 두기
        //         })
        //     }
        // );
    }

    return ( // 여러장의 이미지 삽입을 위해 반복이 필요, map을 쓰기 위해 key 필수 여기선 index 사용
        <div css={layout}>
            {urls.map}
            <div css={imageLayout}>
                <img src={urls} alt=""/>
            </div>
            {previews.map((preview, index) =>
                <>
                    <div key={index} css={imageLayout}>
                        <img src={preview} alt=""/>
                    </div>
                    <Line percent={progressPercent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
                </>
            )}
            <input style={{display:"none"}}type="file" multiple={true} ref={imgFileRef} onChange={handleImgFileChage}/>
            <button  onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
    );
}

export default ImageEx;