import React, { useState, ReactNode } from 'react';

import './Modal.css'

interface ModalProps {
  isVisible: boolean,
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isVisible, children }) => {

  const [isOpen, setIsOpen] = useState<boolean>(isVisible)

  return (
    <div className={isOpen ? 'modal-container modal-open' : 'modal-container'}>
      <div className='modal-box'>
        {children}
      </div>
    </div>
  );
}

export default Modal;