import React, { createContext, useState, useEffect } from "react";

// import localCart from "../utils/localCart";

// get localStorage
const getCartFromLocalStorage = () => {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
};

const CartContext = createContext();

function CartProvider({ children }) {
  // useState
  const [cart, setCart] = useState(getCartFromLocalStorage);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  // useEffect for cart
  useEffect(() => {
    // localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // caculate cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      // console.log({ total, cartItem });
      return (total += cartItem.amount);
    }, 0);
    // console.log(newCartItems);
    setCartItems(newCartItems);

    // caculate total value
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    // console.log(newTotal);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  // function
  // remove item
  const removeItem = id => {
    const filteredCart = cart.filter(item => item.id !== id);
    setCart(filteredCart);
  };

  // increase amount
  const increaseAmount = id => {
    const newCart = cart.map(item => {
      const newAmount = item.id === id ? (item.amount += 1) : item.amount;
      return { ...item, amount: newAmount };
    });
    setCart(newCart);
  };

  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = cart.map(item => {
        const newAmount = item.id === id ? (item.amount -= 1) : item.amount;
        return { ...item, amount: newAmount };
      });
      setCart(newCart);
    }
  };

  // add to cart
  const addToCart = product => {
    const {
      id,
      image: { url },
      title,
      price
    } = product;
    const item = [...cart].find(item => item.id === id);
    // check if item exist
    // in cart, increase amount, no: create that product in cart
    if (item) {
      increaseAmount(id);
      return;
    } else {
      const newItem = { id, image: url, title, price, amount: 1 };
      const newCart = [...cart, newItem];
      setCart(newCart);
    }
  };
  // clear cart
  const clearCart = () => {};

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
