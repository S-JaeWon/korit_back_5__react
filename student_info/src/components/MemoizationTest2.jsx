import React, { useCallback } from 'react';

function MemoizationTest2({ num1, num2 }) { // useMemo: 값을 기억함, useCallBack: 함수를 기억함

    const fx1 = useCallback(() => {

        return num1 + 10000;
        
    }, [num1])

    const fx2 = useCallback(() => {

        return num2 + 20000;

    }, [num2])



    return (
        <div>
            <h3>{fx1()}</h3>
            <h3>{fx2()}</h3>
        </div>
    );
}

export default MemoizationTest2;