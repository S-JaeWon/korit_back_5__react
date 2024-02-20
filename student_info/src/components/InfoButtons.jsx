import React from 'react';

function InfoButtons({ children /**자식 요소, 태그 사이에 사용할때 */}) {
    return (
        <div>
           { children } 
        </div>
    );
}

export default InfoButtons;