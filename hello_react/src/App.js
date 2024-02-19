/**
 * react component 특징
 * 1. 파일명과 함수명을 일치시킨다.
 * 2. 하나의 컴포넌트 함수는 하나의 태그 묶음만 리턴할 수 있다.
 * 3. 함수를 꼭 export 해야한다.
 * 
 *  */
import { useState } from "react";

 

export default function App() {
  let names = ["철수", "영희", "민지"];

  // [ <h1>철수</h1> <h1>영희</h1> <h1>민지</h1> ]
  //const jsxnames = names.map(name => <h1>{ name }</h1>); 

  // 비구조 할당 
  const [ nameArrayState, setNameArrayState /*setter*/ ] = useState(["철수", "영희", "민지"]);
  // 상태관리
  // 상태가 변하면 렌더링이 다시 된다. 일반변수로 렌더링x 

  const { name, age } = { name: "민수", age: 12};
  const [ num1, num2, num3, num4] = [ 1, 2, 3, 4 ]

  console.log("콘솔 호출?");

  //funtion handleClick() {}; 함수 속에 함수x 
  const handleClick = () => {
    setNameArrayState([...names, "민수"]);
    console.log(names);
  }

  // setTimeout(() => {
  //   setNmaeArrayState ([/*...names*/...nameArrayState , "진수"]); // -> 이 내용으로 윗 배열에 덮어씀 
  //   setTimeout(() => {
  //     setNmaeArrayState ([...nameArrayState , "진희"]);
  //     setTimeout(() => {
  //       setNmaeArrayState ([...nameArrayState , "민수"]);

  //     }, 2000);
  //   }, 2000);
  // }, 2000);
  

  return <>
    <button onClick={ handleClick }>추가</button>
    <div>
      {nameArrayState.map(name => <h1>{name}</h1>)}
    </div>
  </>;
}



