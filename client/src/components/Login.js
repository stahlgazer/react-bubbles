import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/login", userData)
      .then(response => {
        console.log("Successful Login", response);
        localStorage.setItem("token", response.data.payload);
        props.history.push("/bubbles");
      })
      .catch(err => {
        console.log(err);
        console.log("Login failed for:", userData.username, userData.password);
      });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form name="login" className="login">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button color="info" name="submit" onClick={handleSubmit}>
          Log in
        </button>
      </form>
    </>
  );
};

export default Login;
