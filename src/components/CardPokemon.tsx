
import back from "../back2.jpg"
import { CardFlip, CardFlipBack, CardFlipFront, CardFlipInner, StyledImage } from "../styled/CardPkemon";
export interface ICardInterface {
    imageUrl: string;
    index: number
    onTurn: (index: number) => void;
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

