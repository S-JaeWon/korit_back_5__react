/** @jsxImportSource @emotion/react */

import { useMemo, useState } from 'react';
import * as S from "./style";
import { Link } from 'react-router-dom';

function TopBar() {
    const [ isShow, setShow] = useState(false);

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

    return (
        <aside css={S.layout(isShow)}>
            <button css={S.toggleButton} onClick={() => setShow(!isShow)}>메뉴</button>
            <ul css={S.menuList}>
                {menus.map(menu =>
                    <Link css={S.menuItems} to={menu.path} key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)}
            </ul>
        </aside>
    );
}

export default TopBar;