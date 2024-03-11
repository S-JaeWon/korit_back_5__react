import { css } from "@emotion/react";

export const background = css`
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1; // z축이 -1 이라 다른 layout을 덮지 않음
    width: 100%;
    height: 100%;
    background-color: #222222;
`;

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 30px auto;
    border: 2px solid #fafafa;
    border-radius: 30px;
    padding-top: 40px;
    width: 420px;
    height: 800px;
    background-color: #000000;
    overflow: hidden; // 모서리가 radius 이므로 튀어나온 부분 숨기기 
`;

export const container = css`
    height: 665px;
    overflow-y: auto; // 스크롤 생성 
    &::-webkit-scrollbar { // 스크롤바를 안 숨기면 contents 들이 왼쪽으로 밀림 
        display: none;
    }
`;