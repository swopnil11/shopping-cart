import { Button } from "@mui/material";
import { cartItemType } from "../App";
import { Wrapper } from "./CartItem.styles";

type Props = {
    item: cartItemType;
    addtoCart: (clickedItem: cartItemType) => void;
    removeFromCart: (id: number) => void;
};


const CartItem: React.FC<Props> = ({item, addtoCart, removeFromCart}) => {
    return (
        <Wrapper>
            <div>
                <h3>{item.title}</h3>
                <div className="information">
                    <p>Price: ${item.price}</p>
                    <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
                </div>
                <div className="button">
                    <Button size="small" disableElevation variant="contained" onClick={()=> removeFromCart(item.id)}>-</Button>
                    <p>{item.amount}</p>
                    <Button size="small" disableElevation variant="contained" onClick={()=> addtoCart(item)}>+</Button>
                </div>
            </div>
            <img src={item.image} alt={item.title} />
        </Wrapper>
    )
}

export default CartItem;