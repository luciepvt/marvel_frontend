import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

// components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// pages
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import Character from "./pages/Character/Character";
import Favorites from "./pages/Favorites/Favorites";
import SignupLogin from "./pages/SignupLogin/SignupLogin";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faEnvelope,
  faKey,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
library.add(faEnvelope, faKey, faListAlt);

const App = () => {
  const [token, setToken] = useState(null);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  const setUser = (token, favoriteChar, favoriteCom) => {
    if (token) {
      // connexion
      Cookies.set("token", token);
      Cookies.set("favoriteChar", JSON.stringify(favoriteChar));
      Cookies.set("favoriteCom", JSON.stringify(favoriteCom));
    } else {
      // déconnexion
      Cookies.remove("token");
      Cookies.remove("favChar");
      Cookies.remove("favCom");
    }
    setToken(token);
    setFavoriteCharacters(favoriteChar);
    setFavoriteComics(favoriteCom);
  };

  useEffect(() => {
    const fetchUser = () => {
      const token = Cookies.get("token");
      const favoriteChar = Cookies.get("favoriteChar");
      const favoriteCom = Cookies.get("favoriteCom");

      if (token) {
        setToken(token);
        if (typeof favoriteChar === "string") {
          setFavoriteCharacters(JSON.parse(favoriteChar));
        }
        if (typeof favoriteCom === "string") {
          setFavoriteComics(JSON.parse(favoriteCom));
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={
              <Characters
                token={token}
                favoriteChar={favoriteCharacters}
                setFavoriteChar={setFavoriteCharacters}
              />
            }
          />
          <Route
            path="/characters/:id"
            element={
              <Character
                favoriteChar={favoriteCharacters}
                setFavoriteChar={setFavoriteCharacters}
                favoriteCom={favoriteComics}
                setFavoriteCom={setFavoriteComics}
                token={token}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                favoriteCom={favoriteComics}
                setFavoriteCom={setFavoriteComics}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                token={token}
                favoriteChar={favoriteCharacters}
                setFavoriteChar={setFavoriteCharacters}
                favoriteCom={favoriteComics}
                setFavoriteCom={setFavoriteComics}
              />
            }
          />
          <Route
            path="/login"
            element={<SignupLogin token={token} setUser={setUser} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
