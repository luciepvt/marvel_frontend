import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignupForm = ({
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
          "http://localhost:3000/user/signup",
          // https://marvel-backend-lucie.herokuapp.com/user/signup
          user
        );
        setUser(
          response.data.token,
          response.data.favoriteCharacters,
          response.data.favoriteComics
        );
        navigate("/");
      } catch (error) {
        if (error.response.status === 409) {
          setErrorMessage("This email is already linked to another account");
        }
      }
    } else {
      setErrorMessage("");
    }
  };
  return (
    <>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-container">
          <h1>Suscribe</h1>
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
          <input className="submit-btn" type="submit" value="Register" />
        </div>
      </form>
      <button
        className="member-btn"
        onClick={() => {
          setLogin((prevState) => !prevState);
        }}
      >
        Already a member ? Log in!
      </button>
    </>
  );
};
export default SignupForm;
