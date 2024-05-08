import { useState } from "react";
import { useQuery } from "react-query";
import { Drawer, LinearProgress, Grid, Badge } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./components/Item";
import Cart from "./components/Cart";

export type cartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<cartItemType[]> => {
  return await (await fetch('https://fakestoreapi.com/products')).json();
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  
  const [cartItems, setCartItems] = useState([] as cartItemType[])
  
  const {data, isLoading, error} = useQuery<cartItemType[]>('products', getProducts);
  
  console.log(data);

  const getTotalItems = (items: cartItemType[]) =>
    items.reduce((ack:number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      if(isItemInCart) {
        return prev.map (item => (
          item.id === clickedItem.id ? {...item, amount: item.amount + 1}: item
        ));
      }
      return [...prev, {...clickedItem, amount: 1}]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if(item.id === id) {
          if(item.amount === 1) return ack;
          return [...ack, {...item, amount: item.amount - 1}];
        } else {
          return[...ack, item];
        }
      },[] as cartItemType[])
    ))
  };

  if(isLoading) return <LinearProgress />;
  if(error) return <div>Something went wrong...</div>;

  return (
   <Wrapper>
    <Drawer anchor="right" open={cartOpen} onClose={()=> setCartOpen(false)}>
      <Cart cartItems = {cartItems} addtoCart = {handleAddToCart} removeFromCart = {handleRemoveFromCart}/>
    </Drawer>
    <StyledButton onClick={()=> setCartOpen(true)}>
      <Badge badgeContent={getTotalItems(cartItems)} color="error">
        <AddShoppingCartIcon />
      </Badge>
    </StyledButton>
    <Grid container spacing={3}>
      {data?.map((item) => (
        <Grid item key = {item.id} xs={12} sm={4}>
          <Item item = {item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}      
    </Grid>
   </Wrapper>
  );
}

export default App;
