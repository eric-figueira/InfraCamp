import styled from "styled-components";

interface InputProps {
  backgroundColor: string;
  placeholderColor: string;
  fontColor: string;
}

interface MessageProps {
  backgroundColor: string,
  borderFontColor: string
}

interface CarouselImageProps {
  imgUrl: string
}

interface StatusLabelProps {
  color: string;
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

  @media (max-width: 660px) {
    input { font-size: 1rem; }
  }

`

export const Message = styled.div<MessageProps>`

  padding: 0.5rem 1rem;
  border-radius: 0.7rem;

  background-color: ${(props) => props.borderFontColor}35;
  border: 1.5px solid ${(props) => props.borderFontColor};
  color: ${(props) => props.borderFontColor};
  font-size: 1.25rem; 
  text-align: center;
`


export const CarouselImage = styled.img<CarouselImageProps>`

  height: 100%;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;

  background-image: url(${(props) => props.imgUrl})
`

export const StatusLabel = styled.p<StatusLabelProps>`

  display: inline;
  font-weight: bold;
  color: ${(props) => props.color};

`
