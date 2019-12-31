import React, { useContext, useState } from "react";
import { userHistory, useHistory } from "react-router-dom";

import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";

import EmptyCart from "../components/Cart/EmptyCart";

// react-stripe-elements

import submitOrder from "../strapi/submitOrder";

const Checkout = props => {
  // context
  const { cart, total, clearCart } = useContext(CartContext);
  const { user, alert, showAlert, hideAlert } = useContext(UserContext);
  const history = useHistory();

  // state values
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const isEmpty = !name || alert.show;

  return <div>Checkout</div>;
};

export default Checkout;
