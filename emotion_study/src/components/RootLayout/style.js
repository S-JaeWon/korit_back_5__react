import { css } from "@emotion/react";

// 그 외 배경은 index.css 에서 html { } 로 설정, html은 public에 있음. index.js 에 자체적으로 css 적용
// fixed 로 잡고 height 100%로 잡을때 내용이 화면을 넘어버리면 스크롤이 생기지 않음 -> overflow 사용시 스크롤 생김 
// height: ~~vh 사용 하여 스크롤 생성 
export const backgroundLayout = css`
    position: fixed;
    transform: translateX(-50%);
    top: 0;
    left: 50%;
    z-index: -1;
    width: 1000px;
    height: 100vh;
    background-color: white;
`;

export const layout = css`
    width: 1000px;
    margin: 0 auto;
`;