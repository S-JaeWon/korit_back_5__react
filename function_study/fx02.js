응답데이터_뿌려주기();

function 응답데이터_뿌려주기() {
    const responseData = {
        tite: "응답데이터",
        dataList: [
            {
                name: "철수",
                age: 15
            },
            {
                name: "영희",
                age: 12
            },
            {
                name: "민지",
                age: 13
            }
        ]
    };

    console.log(타이틀_컴포넌트(responseData.tite));
    // 테이블_TR_TD_컴포넌트(responseData.dataList[0]);
    // 테이블_TR_TD_컴포넌트(responseData.dataList[1]);
    // 테이블_TR_TD_컴포넌트(responseData.dataList[2]);
    
    for(let i; i < responseData.dataList.length; i++) {
        console.log(테이블_TR_TD_컴포넌트(responseData.dataList[i]));
    }

    // 향샹된 for문 
    for(let 학생 of responseData.dataList) {
        console.log(테이블_TR_TD_컴포넌트(학생));
    }

    //비구조 할당
    const 타이틀 = responseData.tite;
    const 학생들 = responseData.dataList;

    const {title, dataList} = responseData;
    const {name, age} = dataList[0];

    for(let 학생 of dataList) {
        console.log(테이블_TR_TD_컴포넌트(학생, title));
    }

    const user = {
        username: "abc",
        password: "123",
        name1: "심재원"
    }
 
    // const username = user.username;
    // const password = user.password;
    
    // 비구조 할당
    const {username, password, name1} = user;

}

function 타이틀_컴포넌트(타이틀) {
    return`
        <h1>${타이틀}</h1>
    `

}

function 테이블_TR_TD_컴포넌트({name, age }, title) {
    console.log(title);
    return`
        <tr>
            <td>${이름}</td>
            <td>${나이}</td>
        </tr>
    `;
}