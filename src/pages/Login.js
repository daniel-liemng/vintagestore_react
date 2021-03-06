import React, { useState, useContext } from "react";

// strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";

// handle user
import { useHistory } from "react-router-dom";

// context
import { UserContext } from "../context/user";

const Login = () => {
  const history = useHistory();

  // setup user context
  const { userLogin, alert, showAlert } = useContext(UserContext);

  // state values to toggle between sign in and register
  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("default");
  const [isMember, setIsMember] = useState(true);

  // let isEmpty = false;
  let isEmpty = !email || !password || !username || alert.show;

  const toogleMember = () => {
    setIsMember(prevMember => {
      // toggle member status
      let isMember = !prevMember;
      // check member to set username
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };

  const handleSubmit = async e => {
    // alert
    showAlert({ msg: "accessing user data. please wait..." });
    // prevent Default
    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      // register user
      response = await registerUser({ email, password, username });
    }

    if (response) {
      //  console.log(response);
      const {
        jwt: token,
        user: { username }
      } = response.data;
      // create new obj
      const newUser = { token, username };
      // login user
      userLogin(newUser);
      // show alert
      showAlert({ msg: `you are logged in: ${username}. shop away my friend` });
      // navigate to Products Page
      history.push("/products");
    } else {
      // show alert
      showAlert({
        msg: "there was an error. please try again..",
        type: "danger"
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form className="login-form">
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
        )}
        {isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}
        <p className="register-link">
          {isMember ? "need to register" : "already a member"}
          <button type="button" onClick={toogleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
};

export default Login;
