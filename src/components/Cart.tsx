import { Wrapper } from "./Cart.styles";
import CartItem from "./CartItem";
import { cartItemType } from "../App";

type Props = {
    cartItems: cartItemType[];
    addtoCart: (clickedItem: cartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addtoCart, removeFromCart}) => {
    const calculateTotal = (items: cartItemType[])=>{
        return items.reduce((ack: number, item)=> ack + item.amount * item.price, 0);
    }
    return (
        <Wrapper>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No Items in cart.</p> : null}
            {cartItems.map((item)=>(
                <CartItem key={item.id} item={item} addtoCart={addtoCart} removeFromCart={removeFromCart} />
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;