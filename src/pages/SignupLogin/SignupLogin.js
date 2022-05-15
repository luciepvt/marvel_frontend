import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SignupForm from "../../components/Forms/SignupForm";
import LoginForm from "../../components/Forms/LoginForm";

const SignupLogin = ({ token, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  return (
    <>
      {!token ? (
        <div id="login">
          <>
            {login ? (
              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setLogin={setLogin}
                setUser={setUser}
              />
            ) : (
              <SignupForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                setLogin={setLogin}
                setUser={setUser}
              />
            )}
          </>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
};
export default SignupLogin;
