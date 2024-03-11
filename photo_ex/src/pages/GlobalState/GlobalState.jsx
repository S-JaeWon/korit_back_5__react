import { inputState } from "./atoms/inputState";
import Component1 from "./components/Component1/Component1";
import { useRecoilState } from "recoil";

function GlobalState() {
    const [ value, setValue ] = useRecoilState(inputState);
    
    return (
        <div>
            <h1>{value}</h1>
            <Component1 />            
        </div>
    );
}

export default GlobalState;