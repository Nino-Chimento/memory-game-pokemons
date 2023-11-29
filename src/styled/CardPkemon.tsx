import styled from 'styled-components';
export const StyledImage = styled.img`
    width: 265px;
    height: 370px;
`

export const CardFlip = styled.div`
    background-color: transparent;
    width: 265px;
    height: 370px;
    margin: 5px 5px 2px 5px;    
    cursor: pointer;
    perspective: 1000px;
`

export const CardFlipInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
`

export const CardFlipBoth = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-color: transparent;
`

export const CardFlipFront = styled(CardFlipBoth)`
`

export const CardFlipBack = styled(CardFlipBoth)`
    transform: rotateY(180deg);
`