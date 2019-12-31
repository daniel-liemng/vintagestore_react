import React, { createContext, useState } from "react";

const UserContext = createContext();

// get user from localStorage
const getUserFromLocalStorage = () => {
  return localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : { username: null, token: null };
};

function UserProvider({ children }) {
  // useState
  // const [user, setUser] = useState({ username: null, token: null });

  // useState - default from localStorage
  const [user, setUser] = useState(getUserFromLocalStorage);

  // userLogin
  const userLogin = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // userLogout
  const userLogout = () => {
    setUser({ username: null, token: null });
    localStorage.removeItem("user");
  };

  // ALERT functionality
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "success"
  });

  const showAlert = ({ msg, type = "success" }) => {
    setAlert({ show: true, msg, type });
  };

  const hideAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <UserContext.Provider
      value={{ user, userLogin, userLogout, alert, showAlert, hideAlert }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
