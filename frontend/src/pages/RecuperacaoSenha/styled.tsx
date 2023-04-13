import styled from "styled-components";

interface InputProps {
  backgroundColor: string;
  placeholderColor: string;
  fontColor: string;
}

export const Input = styled.div<InputProps>`

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => props.backgroundColor};

  border-radius: 100rem;

  .icon-container svg {
    width: 50px;
    zoom: 1.5;
  }

  input {
    outline: none;
    border: none;
    background: transparent;
    color: ${(props) => props.fontColor};
    font-size: 1.2rem;
    padding: 1rem 0.5rem;
  }

  input::placeholder {
    color: ${(props) => props.placeholderColor};
  }

`