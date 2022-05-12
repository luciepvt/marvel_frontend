import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/Marvel_Logo.svg.png";

import "../components/Header.scss";
const Header = () => {
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
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
