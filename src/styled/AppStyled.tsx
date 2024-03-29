import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
flex-flow: row wrap;
height: 100%;
width: 100%;
background-color: #000;
`;

export const View = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 1320px;
`;

export const ContainerTitle = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`;


export const ContainerCards = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-flow: row wrap;
height: 100%;
width: 100%;
`;

export const StyledMemoryTitle = styled.span`
  width: 300px;
  height: auto;
  background-clip: text;
  font-weight: bold;  
  font-size: 2em;
  color:white
`

