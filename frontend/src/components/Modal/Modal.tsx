import React, { useState, ReactNode } from 'react';

import './Modal.css'

import { XCircle } from 'phosphor-react'

interface ModalProps {
  children: ReactNode,
  setModalOpen: (open: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ children, setModalOpen }) => {

  return (
    <div className='modal-container'>
      <div className='modal-box'>
        <XCircle onClick={() => setModalOpen(false)} size={45} className='modal-x-button' />
        {children}
      </div>
    </div>
  );
}

export default Modal;