/** @jsxImportSource @emotion/react */

import { useMemo, useState } from 'react';
import * as S from "./style";
import { Link } from 'react-router-dom';
import { MENUS } from '../../constants/menu';

function TopBar() {
    const [ isShow, setShow] = useState(false);

   

    return (
        <aside css={S.layout(isShow)}>
            <button css={S.toggleButton} onClick={() => setShow(!isShow)}>메뉴</button>
            <ul css={S.menuList}>
                {MENUS.map(menu =>
                    <Link css={S.menuItems} to={menu.path} key={menu.id} onClick={() => setShow(false)}>
                        <li>{menu.name}</li>
                    </Link>)}
            </ul>
        </aside>
    );
}

export default TopBar;