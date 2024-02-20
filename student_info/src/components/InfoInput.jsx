import React from 'react';

function InfoInput({ name, onChange, value, placeholder, inputRef }) {

    //console.log(inputref.currnet.name); // e.target.name 과 같다

    return (
        <input type="text" 
          name/*id*/={name} 
          onChange={onChange} 
          value={value} 
          placeholder={ placeholder }
          ref={inputRef} />
    );
}

InfoInput.defaultProps = {
    ref: null
}

export default InfoInput;