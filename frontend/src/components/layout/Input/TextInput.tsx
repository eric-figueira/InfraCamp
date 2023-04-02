import React from 'react';

import "./TextInput.css"

interface InputProps {
  placeholder: string,
  backgroundColor?: string,
  fontColor: string,
  fontSize?: number,
  icon?: React.ElementType,
  iconSize?: number
}

const TextInput: React.FC<InputProps> = (props) => {
  return (
    <div className='textinput-wrapper' style={{
      backgroundColor: props.backgroundColor
    }}>
      {props.icon && <props.icon size={props.iconSize}/>}
      <input className='textinput'
        placeholder={props.placeholder}
        style={{ 
          color: props.fontColor,
          fontSize: props.fontSize}}
      />
    </div>
  );
}

export default TextInput;