import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/Users/user/leReacteur/react/MARVEL/marvel_frontend/src/assets/img/Marvel_Logo.svg.png";

import "../Header/Header.scss";
const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="container">
        <div className="top-banner">
          <Link to="/">
            <img className="marvel-logo" src={logo} alt="logo-marvel" />
          </Link>
        </div>
        <nav className="nav-banner">
          <ul>
            <li>
              <Link to="/"> Characters</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
            {token ? (
              <li>
                <button
                  onClick={() => {
                    setUser(null, [], []);
                    navigate("/");
                  }}
                >
                  Disconnect
                </button>
              </li>
            ) : (
              <li>
                <Link to="/login"> Connect | Suscribe</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
