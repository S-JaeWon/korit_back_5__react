/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useRef, useState } from 'react';

const layout = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const imgLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px soliod #dbdbdb;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    overflow: hidden;

    & > img {
        width: 100%;
    }
`;

function ImageEx3_1() {
    const fileInputref = useRef();
    const imageIdRef = useRef(0);
    const [ loadImages, setloadImages] = useState([]);

    /**
     * {
     *      id: 1,
     *      file: file객체,
     *      dataURL: ""
     * }
     */

    const handleFileChange = (e) => {
        const { files } = e.target
        const fileArray = Array.from(files);
         
        if(fileArray.length === 0) {
            return;
        }

        let promises = [];

        promises = fileArray.map(file => new Promise(resolve => { // fileArray.map 에 있는 객체를 file로 꺼내서 각각 Promise 들로 만듦
            const loadImage = {
                id: imageIdRef.current += 1,
                file,
                dataURL: ""
            };
            
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve({
                    ...loadImage,
                    dataURL: e.target.result
                });
            };

            fileReader.readAsDataURL(file);
        }));

        Promise.all(promises)
        .then(result => {
            setloadImages(result);
        });

    }

    return (
        <div css={layout}>
            {loadImages.map(loadImage => 
                <div key = {loadImage.id} css={imgLayout}>
                    <img src={loadImage.dataURL} alt={loadImage.file.name} />
                </div>
            )}
            <input type="file" style={{display: "none"}} multiple={true} ref={fileInputref} onChange={handleFileChange} />
            <button onClick={() => fileInputref.current.click()}>불러오기</button>
        </div>
    );
}

export default ImageEx3_1;