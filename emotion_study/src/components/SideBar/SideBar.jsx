/** @jsxImportSource @emotion/react */
import * as S from "./style";

import { FaCaretRight, FaCaretLeft } from "react-icons/fa";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MENUS } from "../../constants/menu";

function SideBar() {
    const [ isShow, setShow] = useState(false);

    /**
         const menus = useMemo (() => [
        {
            id: 1,
            path: "/mypage",
            name: "마이페이지"
        },

        {
            id: 2,
            path: "/board",
            name: "게시글"
        },

        {
            id: 3,
            path: "/notice",
            name: "공지사항"
        }
        ], []);
        // 하단에 바로 MENUS import
     */
    
    return (
        <aside css={S.layout(isShow)}>
            <button css={S.toggleButton} onClick={() => setShow(!isShow)} >
                {isShow ? <FaCaretLeft /> : <FaCaretRight />}
            </button>
            <ul css={S.menuList}>
                {MENUS.map(menu => 
                    <Link css={S.menuItems} 
                        to={`${menu.path}${!menu.params ? "" : "?" + Object.entries(menu.params).map(([key, value]) => key + "=" + value).join("&")}`} 
                            key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)}
            </ul>
        </aside>
    );
}

export default SideBar;