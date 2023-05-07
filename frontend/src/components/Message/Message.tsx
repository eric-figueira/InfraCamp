import React from 'react';

import { Message as MessageCSS } from "../../styles/styled-components"

import { colorPallete } from "../../styles/colors"

export enum ETypes {
  Warning,
  Info,
  Sucess
}

interface IMessageProps {
  text: string,
  type: ETypes,
  isVisible: boolean
}

export const Message: React.FC<IMessageProps> = (props) => { 

  let backgroundColor;
  let borderFontColor;

  if (props.type === ETypes.Info)
  {
    backgroundColor = colorPallete.bgBlue;
    borderFontColor = colorPallete.bgBlue; 
  }
  else if (props.type === ETypes.Warning)
  {
    backgroundColor = colorPallete.bgRed;
    borderFontColor = colorPallete.bgRed; 
  }
  else 
  {
    backgroundColor = colorPallete.bgGreen;
    borderFontColor = colorPallete.bgGreen; 
  }

  if (props.isVisible) {
    return (
      props.isVisible &&
      <MessageCSS backgroundColor={backgroundColor} borderFontColor={borderFontColor} >
        <div className='message-container'>
          <p>{props.text}</p>
        </div>
      </MessageCSS>
    )
  }
  else {
    return (
      <></>
    )
  }
}
