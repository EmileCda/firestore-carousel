import styled, { keyframes } from "styled-components";

/**
 * Container for the open menu
 */
export const SlideContainer = styled.ul`
  min-width: 100vw;
  position: relative;
  padding: 0;
`;

const fade = keyframes`
  from {opacity: .0}
  to {opacity: 1}
`;

export const Slide = styled.li<{display:boolean}>`
  display: ${(props) => (props.display ? "flex" : "none")};
  animation: ${fade} 3s;
  list-style: none;
  margin: 0;
  max-width: 100vw;
  padding:0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    max-width: 95vw;
    margin: 0;
  }
`;

export const Caption = styled.div`
  position: absolute;
  min-width: 95vw;
  bottom: 2rem;
  padding:0 4rem;
  justify-content: center;
  font-size: 0.7rem;
  color: black;
  background-color: bisque;
  text-align: center;
  opacity: 0.6;
`;


export const ButtonGroup = styled.div`
display: flex;
justify-content: center;
min-width: 100vw;

`;

export const Button = styled.div`
background-color: brown;
border-radius: 0.6rem;
text-align: center;
vertical-align: middle;
font-size: 1.5rem;

margin : 0 0.1rem;

min-width: 40vw;
min-height: 2rem;
`;

