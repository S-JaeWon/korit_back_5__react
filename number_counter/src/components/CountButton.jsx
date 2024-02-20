import React from 'react';

function CountButton({ title, onClick }) {


    return (
       <button onClick={ onClick }>{ title }</button>
    );
}

export default CountButton;
// rsf 단축키 function 생성, const는 rsc