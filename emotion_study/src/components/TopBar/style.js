import { css } from "@emotion/react";

export const layout = (isShow) => css`
    box-sizing: border-box;
    // position: https://www.daleseo.com/css-position/
    position: fixed;
    top: ${isShow ? "0px" : "-82px"};
    right: 0px;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;

    border-bottom: 1px solid #dbdbdb;
    width: 50%;
    height: 80px;
    transition: top 0.5s ease-in-out;
    background-color: white;
    box-shadow: 0px 1px 2px;
`;

export const toggleButton = css`
    box-sizing: border-box;
    position: absolute;
    right: 0;
    bottom: -17px;
    display: flex;
    justify-content: center;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    align-items: center;
    border: 1px solid #dbdbdb;
    margin-right: 25px;
    width: 50px;
    height: 15px;
    background-color: white;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    &:active {
        background-color: #ccc;
    }
`;

export const menuList = css`
    display: flex;
`;

export const menuItems = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #dbdbdb;
    width: 170px;
    height: 50px;
    margin-left: 20px;
    color: black;
    font-weight: 600;
    text-decoration: none;;
    cursor: pointer;
    &:hover {
        background-color: #eee;
    }
    &:active {
        background-color: #dbdbdb;
    }

`;
