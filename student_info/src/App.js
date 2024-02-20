import { useEffect, useState, useRef } from "react";
import InfoInput from "./components/InfoInput";
import InfoButtons from "./components/InfoButtons";
import StudentInfo from "./components/StudentInfo";

function App() {
    const studentObj = {
      name:"",
      age:"",
      address:""
    };
  
    const [ student, setStudent] = useState(studentObj);
    const [ inputValues, setInputValues ] = useState(studentObj);
    
    const inputRef = { // 아래 ~~inputRef를 객체로 모아 사용
      name: useRef(),
      age: useRef(),
      address: useRef()
    }
    // const nameInputRef = useRef(); // queryselector 대신 사용 
    // const ageInputRef = useRef();
    // const addressInputRef = useRef();
    
    useEffect(() => {
      console.log(inputRef.name.current);
    }, []);
    
    useEffect(() => {
      setInputValues(studentObj)
    }, [student]);

    //const [ refresh, setRefresh ] = useState(false);

    // useEffect(() => { /** 마운트(컴포넌트가 화면에서 생김) */
    //   if(refresh){ /** 언마운트(컴포넌트가 화면에서 사라짐 */
    //     setInputValues(studentObj);
    //   }
    //   setRefresh(true);
    // }, [student]);
  
    const handlsInputChange = (e) => {
      //e.target.id /*id 혹은 name*/
      const { name, value } = e.target; // target => <input ~ handlsInputChange~ />, e.target.name 혹은 e.target.value를 비구조 할당으로 나누기 name, value
      
      setInputValues ({
        ...inputValues,
        [name]: value
      });

    /**
     * js객체 특징
     * 1. 키값은 문자열이어도 된다.
     * 2. 변수의 문자열 값을 키값으로 쓰고 싶을 때 []로 묶어서 참조 가능 
     * 3. 변수명만 입력하면 객체의 속성과 value로 한번에 정의 가능
     *  */ 
    }
  
    const handleOnOk = () => {
     
      setStudent(inputValues);

    }
    
    const handleOnClean = () => {

      setStudent(studentObj);

    }
  
    return (
      <>
        <StudentInfo title="이름" text={student.name} />
        <StudentInfo title="나이" text={student.age} />
        <StudentInfo title="주소" text={student.address} />

        <InfoInput
          name={"name"} 
          onChange={handlsInputChange}
          value={inputValues.name}
          placeholder='이름'
          inputref={inputRef.name}
        />
        <InfoInput
          name={"age"}
          onChange={handlsInputChange}
          value={inputValues.age}
          placeholder='나이'
          inputref={inputRef.age}
        />
        <InfoInput
          name={"address"}
          onChange={handlsInputChange}
          value={inputValues.address}
          placeholder='주소'
          inputref={inputRef.address}
        />
        
        <InfoButtons>
            <button onClick={ handleOnOk }>확인</button>
            <button onClick={ handleOnClean }>비우기</button>
        </InfoButtons>
      </>
        // <input type="text" 
        //   name/*id*/='name' 
        //   onChange={handlsInputChange} 
        //   value={inputValues.name} 
        //   placeholder="이름" />
        // <input type="text" 
        //   name/*id*/='age' 
        //   onChange={handlsInputChange} 
        //   value={inputValues.age} 
        //   placeholder="나이" />
        // <input type="text" 
        //   name/*id*/='address' 
        //   onChange={handlsInputChange} 
        //   value={inputValues.address} 
        //   placeholder="주소" />
    );
  }
  
  export default App;