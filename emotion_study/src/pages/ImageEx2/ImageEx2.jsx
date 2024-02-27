/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { storage } from "../../configs/firebase/firebaseConfig";
import { Line } from "rc-progress";
import { v4 as uuid } from "uuid"

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
    border: 1px solid #dbdbdb;
    width: 300px;
    height: 300px;
    overflow: hidden;
    & > img {
        width: 100%;
    }
`;

function ImageEx2() {
    const uploadFilesId = useRef(0); // 인덱스로 시작하는 Ref는 0 으로 시작 
    const [ oldFiles, setOldFiles ] = useState([]);
    const [ newFiles, setNewFiles ] = useState([]);
    const imgFileRef = useRef(); // 상태로 변화로 시작하는 Ref는 빈 값 

    useEffect(() => {
        setOldFiles(!localStorage.getItem("oldFiles") ? [] : JSON.parse(localStorage.getItem("oldFiles")));
    }, []); // 비어 있는 값이면 ? A (True) : B (False), A -> 빈 배열 / B -> 기존에 있는 oldFiles을 json 형태로 변환

    const handleFileChange = (e) => {
        const loadFiles = Array.from(e.target.files); // filelist는 일반적인 배열(혹은 map)객체와 다름 -> Array 형태로 변환 ex)map 사용시 'map.from'

        if(loadFiles.length === 0) {
            imgFileRef.current.value = "";
            return;
        } // 파일 선택 취소

        const uploadFiles = loadFiles.map(file => { // [].map() -> 배열을 맵으로 치환, () 안에 함수 정의
            return {
                id: uploadFilesId.current += 1,
                percent: 0,
                originFile: file,
                url: ""
            };
        });
        // loadFiles안의 file을 객체 형태로 바꾸어 uploadFiles 배열에 넣어주기


        uploadFilesId.current = 0;

        let promises = [];

        promises = uploadFiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve(e.target.result);
            }

            fileReader.readAsDataURL(file.originFile);
        }));

        Promise.all(promises)
        .then(result => {
            setNewFiles(result.map((dataUrl, index) => {
                return {
                    ...uploadFiles[index],
                    preview: dataUrl
                };
            }));
        });        
        // 미리보기 기능 가진 프로미스 배열 

    }



    const handleImageUpload = () => {
        const promises = newFiles.map(file => new Promise(resolve => {
            const storageRef = ref(storage, `files/test/${uuid()}_${file.originFile.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file.originFile);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    setNewFiles(newFiles.map(sFile => {
                        return sFile.id !== file.id ? sFile : {
                            ...sFile, 
                            percent: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                        }
                    }));
                },
                (error) => {},
                () => {
                    getDownloadURL(storageRef).then(url => {
                        const newFile = {
                            ...file,
                            ["url"]: url
                        }
                        resolve(newFile);
                    })
                }
            );
        }));

        Promise.all(promises)
        .then((newFile) => {
            setOldFiles(newFile);
            localStorage.setItem("oldFiles", JSON.stringify(newFile));
        }).then(() => {
            setNewFiles([]);
        });
    }

    return (
        <div css={layout}>
            {oldFiles?.map(file => 
                <div key={file.id} css={imageLayout}>
                    <img src={file.url} alt="" />
                </div>
            )}
            {newFiles?.map(file => 
                <>
                    <div key={file.id} css={imageLayout}>
                        <img src={file.preview} alt="" />
                    </div>
                    <Line percent={file.percent} strokeWidth={4} strokeColor={"#dbdbdb"}/>
                </>
            )}
            
            <input style={{display: "none"}} type="file" multiple={true} ref={imgFileRef} onChange={handleFileChange}/>
            <button onClick={() => imgFileRef.current.click()}>이미지 불러오기</button>
            <button onClick={handleImageUpload}>이미지 업로드</button>
        </div>
        // 이미지 불러오기 button을 누르면 input이 동작을 함, onClick={() => imgFileRef.current.click()} -> <input ~~ ref={imgFileRef} ~~ />
        // input의 onChange={handleFileChange}가 실행
    );
}

export default ImageEx2;