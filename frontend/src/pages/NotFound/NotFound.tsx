import React from 'react';

import './NotFound.css'

import Button from '../../components/Button/Button';
import { colorPallete } from '../../styles/colors';

import ImagemNotFound  from '../../assets/imgs/notfound.png'

interface INotFound {
  text: string;
}

const NotFound: React.FC<INotFound> = (props) => {

  function handleClick() { window.history.back() }

  return (
    <div className='notfound-wrapper'>
      <div className='notfound-left'>
        <img draggable={false} src={ImagemNotFound}/>
      </div>
      <div className='notfound-right'>
        <h1>Oops!</h1>
        <h3>{props.text}</h3>
        <Button 
          backgroundColor={colorPallete.bgNotFound} 
          fontColor={colorPallete.fontWhite} 
          eventHandler={handleClick}
          text='Voltar'
          />
      </div>
    </div>
  );
}

export default NotFound;