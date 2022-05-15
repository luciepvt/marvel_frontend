import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../Forms/Forms.scss";
const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  setLogin,
  setUser,
}) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        const user = {
          email,
          password,
        };
        const response = await axios.post(
          "https://marvel-backend-lucie.herokuapp.com/user/login",

          user
        );
        setUser(
          response.data.token,
          response.data.favoriteCharacters,
          response.data.favoriteComics
        );
        navigate("/");
      } catch (error) {
        if (error.status === 400 || error.status === 401) {
          setErrorMessage("your email or password is incorrect");
        }
      }
    } else {
      setErrorMessage("");
    }
  };
  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-container">
          <h1>Connect</h1>
          <span className="error-message">{errorMessage}</span>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input className="submit-btn" type="submit" value="Log in" />
          <button
            className="member-btn"
            onClick={() => {
              setLogin((prevState) => !prevState);
            }}
          >
            You don't have an account yet? Register now!
          </button>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
