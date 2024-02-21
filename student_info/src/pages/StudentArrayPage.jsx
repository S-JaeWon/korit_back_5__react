import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage(props) {
    // const studentObj = { // 초기값 세팅 (1)
    //     id: 0,
    //     name: "",
    //     age: 0,
    //     address: ""
    // };

    const [ studentList, setStudentList] = useState([]);

    // 초기값 세팅 (2)
    // const [ student, setStudent ] = useState({ // (studentObj) -> ({  })
    //     id: 0,
    //     name: "",
    //     age: 0,
    //     address: ""
    // }); 

    const [ inputValue, setInputValue ] = useState({ // studentObj 받아올시 빈 칸에 값 생김
        id: "",
        name: "",
        age: "",
        address: ""
    });
    const [ updateId, setUpdateId ] = useState(0);

    const staticId = useRef(0); 
    // staticId.current 값이 변해도 렌더링 일어나지 않음
    // 재렌더링일이 발생해도 초기화 되지 않음

    useEffect(() => { // studnetList 값 변화시 studnetList 출력 
        console.log(studentList);
    }, [studentList]); 

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value
        });
    }

    const handleAddClick = () => {
        //console.log(staticId.current +=1 );

        const student = { 
            // id: 0,
            // name: "",
            // age: 0,
            // address: ""

            ...inputValue,
            id: staticId.current += 1 
        };

        setStudentList([...studentList, student]);
    }
    
    const handleDeleteClick = (id) => {
        setStudentList([...studentList.filter(student => student.id != id)]);
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);
        setInputValue(studentList.filter(student => student.id === id)[0]); // 수정 버튼 누를시 input칸에 값 생성, 배열로 나타나므로 [0] 붙여줌 
    }

    const handleUpdateSubmitClick = () => { // indexof 를 이용해 수정하는 방법 
        const findIndex = 
            studentList.indexOf(studentList.filter(student => student.id === updateId)[0]);
        const updateStudentList = [...studentList];

        updateStudentList[findIndex] = inputValue;

        setStudentList(updateStudentList); 
        handleCancelClick();
    }

    /**
    const handleUpdateSubmitClick = () => { // map 을 이용해 수정 하는 방법 
        // updateId를 기준으로 studentList를 업데이트합니다.
        setStudentList(studentList.map(student => 
            student.id === updateId ? inputValue : student
        ));
        
        handleCancelClick(); // 수정 후에는 취소와 동일한 초기화 작업을 수행합니다.
    }
    */

    const handleCancelClick = () => {
        setUpdateId(0);
        setInputValue({
            id: "",
            name: "",
            age: "",
            address: ""
        })
    }

    return (
        <div>
            <div>
                <input type="text" name='id' disabled={true} value={inputValue.id} placeholder='ID' />
                <input type="text" name='name' onChange={ handleInputChange } value={inputValue.name} placeholder='이름' />
                <input type="text" name='age' onChange={ handleInputChange } value={inputValue.age} placeholder='나이' />
                <input type="text" name='address' onChange={ handleInputChange } value={inputValue.address} placeholder='주소' />
                <button onClick={handleAddClick}>추가</button>
            </div> 
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>이름</th>
                        <th>나이</th>
                        <th>주소</th>
                    </tr>
                </thead>
                <tbody>
                {studentList.map(student => {
                    // {} 열면 return 필수, jsx 사용시 return 한 묶음만 사용 가능하나 프래그먼트 사용시 하나 더 사용 가능
                    // key 값이 없다면 전체 렌더링 -> 리액트 장점인 부분렌더링 안됨
                    // onClick={handleDeleteClick} -> 렌더링 되면 함수가 호출 되버림 
                    // () => {handleDeleteClick()} -> () 호출시 {} 호출
                    // !== A ? B -> 다르면(True) A 같으면(False) B 
                    // updateId는 하나만 가지기에 수정/취소 버튼은 하나씩
                    return <tr key={student.id}> 
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.address}</td>
                        <td>
                            {
                                updateId !== student.id
                                ? <button onClick={() => {handleUpdateClick(student.id);}}>수정</button>
                                : <button onClick={handleUpdateSubmitClick}>확인</button>
                            }
                        </td>
                        <td>{
                                updateId !== student.id
                                ? <button onClick={() => {handleDeleteClick(student.id);}}>삭제</button>
                                : <button onClick={handleCancelClick}>취소</button>
                            }
                        </td>
                    </tr>
                })}             
                </tbody>
            </table>
        </div>
    );
}

export default StudentArrayPage;