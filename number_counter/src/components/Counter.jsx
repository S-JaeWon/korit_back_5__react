import { useState } from "react";
import CounterInput from "./CounterInput";
import CountButton from "./CountButton";

function Counter() {

    const [ number, setNumber ] = useState(0); // useState("0") 이라면 자료형 number -> String
    const [ count, setCount] = useState(0);

    const  handleOnIncrese = () => {
        setNumber(number + count);
    }

    const  handleOnDecrese = () => {
        setNumber(number - count);
    }

//   const handleInputChange = (e) => {
//     console.log(e);
//     setInputValue(e.target.value);
//   }
  // onChange에 의해 값이 변해 이벤트 발생시 handleInputChage 함수에서 e.target.value에 의해 setInputValue 값 변경 -> inputValue 값 변경 / inputValue 상태 변화 -> 렌더링
    return (
        <>
            <h1>{ number }</h1>
            <CounterInput setCount= { setCount }/>
            <CountButton title={ "-" } onClick={ handleOnDecrese }/>
            <CountButton title={ "+" } onClick={ handleOnIncrese }/>
        </>
    );
}

export default Counter;