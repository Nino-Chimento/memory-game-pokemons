import styled from 'styled-components';
import back from "../back2.jpg"

const StyledImage = styled.img`
    width: 265px;
    height: 370px;
`

const CardFlip = styled.div`
    background-color: transparent;
    width: 265px;
    height: 370px;
    margin: 5px 5px 2px 5px;    
    cursor: pointer;
    perspective: 1000px;
`

const CardFlipInner = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
`

const CardFlipBoth = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-color: transparent;
`

const CardFlipFront = styled(CardFlipBoth)`
`

const CardFlipBack = styled(CardFlipBoth)`
    transform: rotateY(180deg);
`
export interface ICardInterface {
    imageUrl: string;
    index: number
    onTurn: (index: number) => void;
    /*   otherWay: boolean; */
    isTurned: boolean;
}
export const CardPokemon = (props: ICardInterface) => (
    <CardFlip>
        <CardFlipInner
            style={props.isTurned /* && !props.otherWay */ ? { transform: 'rotateY(180deg)' } : /* props.otherWay ? { transform: 'rotateY(360deg)' } :  */{}}
            onClick={() => props.onTurn(props.index)}
        >
            <CardFlipFront>
                <StyledImage src={back} alt="img-back" />
            </CardFlipFront>
            <CardFlipBack>
                <StyledImage src={props.imageUrl} alt="img-card" />
            </CardFlipBack>
        </CardFlipInner>
    </CardFlip>
);

