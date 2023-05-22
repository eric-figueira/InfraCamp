import React from 'react';

import './NotFound.css'

import Button from '../../components/Button/Button';
import { colorPallete } from '../../styles/colors';

import { ReactComponent as ImagemNotFound } from '../../assets/imgs/notfound.svg'

const NotFound: React.FC = () => {

  function handleClick() { window.history.back() }

  return (
    <div className='notfound-wrapper'>
      <div className='notfound-left'>
        <ImagemNotFound />
      </div>
      <div className='notfound-right'>
        <h1>Oops!</h1>
        <h3>A página que você procura não existe</h3>
        <Button 
          backgroundColor={colorPallete.bgBlack} 
          fontColor={colorPallete.fontWhite} 
          eventHandler={handleClick}
          text='Voltar'
          />
      </div>
    </div>
  );
}

export default NotFound;