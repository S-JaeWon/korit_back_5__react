import React, { useEffect, useRef, useState } from 'react';

function StudentArrayPage2(props) {
    
    const [ scoreList, setScoreList] = useState([]);

    const [ student, setStudent ] = useState ({
        id: "",
        name: "",
        age: 0,
        score: ""

    });
    
    const [ scoreData, setScoreData ] = useState({
        total: 0,
        avg: 0
    });
    
    const staticId = useRef(0); 

    const [updateid, setUpdateId] = useState(0);
    
    useEffect(() => { 
        setScoreData({
            ...scoreData,
            total: calculateTotal(),
            avg: calculateAverage()
        });
    }, [scoreList]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent({
            ...student,
            [name]: value
        });
    }

    const handleAddClick = () => {
       
        const studentScore = {
            ...student,
            id: staticId.current += 1
        };

        setScoreList([...scoreList, studentScore])

        setStudent({
        id: "",
        name: "",
        age: 0,
        score: ""
        })
    }

    const calculateTotal = () => {
        let total = 0;

        for (let i = 0; i < scoreList.length; i++) {
            total += parseInt(scoreList[i].score);
        }

        return total;
    }

    const calculateAverage = () => {
        let avg = 0;

        if (scoreList.length > 0) {
            avg = calculateTotal() / scoreList.length;
        }

        return avg;
    }

    const handleDeleteClick = (id) => {
        setScoreList([...scoreList.filter(studentScore => studentScore.id !== id)]);
    }

    const handleUpdateClick = (id) => {
        setUpdateId(id);

        setStudent(scoreList.filter(studentScore => studentScore.id === id)[0]);
    }
  
    const handleCancelClick = () => {
        setUpdateId(0);
        setStudent({
            id: "",
            name: "",
            age: 0,
            score: ""
        })

    }

    const handleUpdateSubmitClick = () => {
        setScoreList(scoreList.map(studentScore => {
            return studentScore.id !== updateid ? studentScore : {
                id: staticId.current += 1,
                name: student.name,
                score: parseInt(student.score)

            };
        }))

        handleCancelClick();
    }

    return (
        <div>
            <div>
                <input type="text" name='id' value={student.id} disabled={true} placeholder='ID'/>
                <input type="text" name='name' value={student.name} onChange={ handleInputChange } value={student.name} placeholder='이름'/>
                <input type="text" name='score' value={student.score} onChange={ handleInputChange } value={student.score} placeholder='점수'/>
                <button onClick={handleAddClick}>추가</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>이름</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                {scoreList.map(score => {
                    return <tr key={score.id}>
                        <td>{score.id}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                        <td>
                            {
                                updateid !== score.id 
                                ? <button onClick={() => handleUpdateClick(score.id)}>수정</button>
                                :<button onClick={handleUpdateSubmitClick}>확인</button> 
                            }
                            
                        </td>
                        <td>
                            {
                                updateid !== score.id 
                                ? <button onClick={() => handleDeleteClick(score.id)}>삭제</button>
                                :<button onClick={handleCancelClick}>취소</button> 
                            }
                        </td>
                    </tr>
                })}
                </tbody>
                <tfoot>
                    <tr>
                        <th>총점:</th>
                        <th colSpan={2}>{scoreData.total}</th>
                    </tr>
                    <tr>
                        <th>평균:</th>
                        <th colSpan={2}>{scoreData.avg.toFixed(2)}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default StudentArrayPage2;