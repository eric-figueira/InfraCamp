import React, { useState, useContext } from 'react';

import "./SobreNos.css"

import { imagens } from './imagens';
import { CaretCircleLeft, CaretCircleRight } from 'phosphor-react'

import Navbar from "../../components/Navbar/Navbar"

import { AuthContext } from '../../contexts/AuthContext';
import NotFound from '../NotFound/NotFound';

const SobreNos: React.FC = () => {

  const { user } = useContext(AuthContext);

  const [imgIndex, setImgIndex] = useState<number>(0)

  return (
    user?
    <div className='sobrenos-container'>
      <Navbar />
      <div className="carousel">
        <div className="carouselInner" style={{ backgroundImage: `url(${imagens[imgIndex].image})` }}>
          <div className="carousel-left-arrow" onClick={() => imgIndex > 0 ? setImgIndex(imgIndex - 1) : setImgIndex(imagens.length - 1)}>
            <CaretCircleLeft color='#FFF' size={32}/>
          </div>
          <div className="carousel-right-arrow" onClick={() => imgIndex < imagens.length - 1 ? setImgIndex(imgIndex + 1) : setImgIndex(0)}>
            <CaretCircleRight color='#FFF' size={32}/>
          </div>
        </div>
      </div>
    </div>
    :
    <NotFound text="Você não está autenticado." />
  );
}

export default SobreNos;