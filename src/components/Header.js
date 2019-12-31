import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/user";

import logo from "../assets/logo.svg";
import CartLink from "./Cart/CartLink";
import LoginLink from "./LoginLink";

const Header = () => {
  const { user } = useContext(UserContext);
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            {user.token && (
              <li>
                <Link to="checkout">checkout</Link>
              </li>
            )}
          </div>
          <div>
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
