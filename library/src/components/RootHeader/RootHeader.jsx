/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style"; 
import { HiMenu } from "react-icons/hi";
import { menuState } from "../../atoms/menuAtom";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { principalState } from "../../atoms/principalAtom";

function RootHeader() {
    const [ show, setShow ] = useRecoilState(menuState); 
    const [ principal, setPrincipal ] = useRecoilState(principalState);

    // useEffect(() => {
    //     getPrincipal();
    // }, [])

    // const getPrincipal = useCallback(() => {
    //     getPrincipalRequest()
    //     .then(response => {
    //         console.log(response);
    //     }).catch(error => {
    //         console.log(error);
    //     });
    // }, []);
    // AuthRoute로
    const handleOpenClick = () => {
        setShow(() => true);
    }
    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={handleOpenClick}>
                <HiMenu />
            </button>
            {
                !principal 
                ?   <Link css={s.account} to={"/auth/signin"}>
                        <FiUser />
                    </Link> 
                :   <Link css={s.account} to={"/accout/mypage"}>
                        <FiUser />
                    </Link>
            }
        </div>
    );
}

export default RootHeader;