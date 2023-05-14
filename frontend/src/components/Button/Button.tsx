import React, { MouseEvent } from 'react';

import "./Button.css"

interface ButtonProps {
  text: string,
  backgroundColor: string,
  fontColor: string,
  fontSize?: number,
  borderColor?: string,
  width?: string,
  disabled?: boolean,
  eventHandler: (event: MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div className='button-wrapper'>
      <button className="button"
        style={{
          backgroundColor: props.backgroundColor,
          color: props.fontColor,
          fontSize: props.fontSize,
          border: props.borderColor,
          width: props.width
        }}
        disabled={props.disabled}
        onClick={props.eventHandler}
      >{props.text}</button>
    </div>
  );
}

export default Button;