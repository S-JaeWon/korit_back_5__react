/** @jsxImportSource @emotion/react */
import * as S from "./style";

function RootLayout({ children }) { // RootLayout 안에 Route 쓸려면 children 사용 
    return (
        <>
            <div css={S.backgroundLayout}></div>
            <div css={S.layout}>
                {children}
            </div>
        </>
    );
}

export default RootLayout;