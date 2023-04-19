import React from 'react';

import "./Button.css"

interface ButtonProps {
  text: string,
  backgroundColor: string,
  fontColor: string,
  fontSize?: number,
  borderColor?: string,
  eventHandler: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className='button-wrapper'>
      <button 
        style={{ backgroundColor: props.backgroundColor, 
                 color: props.fontColor, 
                 fontSize: props.fontSize,
                 border:  props.borderColor
                }} 
        onClick={props.eventHandler}
      >{props.text}</button>
    </div>
  );
}

export default Button;