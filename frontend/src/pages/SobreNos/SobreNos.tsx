import React, { useState, useContext } from 'react';

import "./SobreNos.css"

import { imagens } from './imagens';

import Navbar from "../../components/Navbar/Navbar"

const SobreNos: React.FC = () => {

  const [imgIndex, setImgIndex] = useState<number>(0)

  return (
    <div className='sobrenos-container'>
      <Navbar />
      <div className="carousel">
        <div className="carouselInner" style={{ backgroundImage: `url(${imagens[imgIndex].image})` }}>
          <div className="left" onClick={() => imgIndex > 0 ? setImgIndex(imgIndex - 1) : setImgIndex(imagens.length - 1)}>a</div>
          <div className="right" onClick={() => imgIndex < imagens.length - 1 ? setImgIndex(imgIndex + 1) : setImgIndex(0)}>a</div>
        </div>
      </div>
    </div>
  );
}

export default SobreNos;