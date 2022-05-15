import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

//
import "./components/Cards/CharactersAndComics.scss";
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

  useEffect(() => {
    const fetchUser = () => {
      const token = Cookies.get("token");
      const favoriteChar = Cookies.get("favoriteChar");
      const favoriteCom = Cookies.get("favoriteCom");

      if (token) {
        setToken(token);
        setFavoriteCharacters(JSON.parse(favoriteChar));
        setFavoriteComics(JSON.parse(favoriteCom));
      }
    };
    fetchUser();
  }, []);

  const setUser = (token, favChar, favCom) => {
    if (token) {
      // connexion
      Cookies.set("token", token);
      Cookies.set("favChar", JSON.stringify(favChar));
      Cookies.set("favCom", JSON.stringify(favCom));
    } else {
      // déconnexion
      Cookies.remove("token");
      Cookies.remove("favChar");
      Cookies.remove("favCom");
    }
    setToken(token);
    setFavoriteCharacters(favChar);
    setFavoriteComics(favCom);
  };
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
                favChar={favoriteCharacters}
                setFavChar={setFavoriteCharacters}
              />
            }
          />
          <Route
            path="/characters/:id"
            element={
              <Character
                favChar={favoriteCharacters}
                setFavChar={setFavoriteCharacters}
                favCom={favoriteComics}
                setFavCom={setFavoriteComics}
                token={token}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                token={token}
                favCom={favoriteComics}
                setFavCom={setFavoriteComics}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                token={token}
                favChar={favoriteCharacters}
                setFavChar={setFavoriteCharacters}
                favCom={favoriteComics}
                setFavCom={setFavoriteComics}
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
