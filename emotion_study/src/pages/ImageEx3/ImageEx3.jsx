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

function ImageEx3() {
    const imgFileRef = useRef();
    const [ previews, setPreviews] = useState([]);

    const handleFileChange = (e) => {

        const loadfiles = Array.from(e.target.files);

        if(e.target.files.length === 0) {
            return;
        }

        let promises = [];

        promises = loadfiles.map(file => new Promise((resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
                resolve(e.target.result);
            };

            fileReader.readAsDataURL(file);
        }));

        Promise.all(promises)
        .then(result => {
            setPreviews(result);
        });

    }

    return (
        <div css={layout}>
            {previews.map((preview, index) => 
                <div key = {index} css={imgLayout}>
                    <img src={preview} alt="" />
                </div>
            )}
            <input type="file" style={{display: "none"}} multiple={true} ref={imgFileRef} onChange={handleFileChange} />
            <button onClick={() => imgFileRef.current.click()}>불러오기</button>
        </div>
    );
}

export default ImageEx3;