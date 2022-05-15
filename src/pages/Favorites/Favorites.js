import React from "react";

import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CardCharacter from "../../components/Cards/CardCharacter";
import CardComic from "../../components/Cards/CardComic";

import "../../components/Cards/CharactersAndComics.scss";
import "../Favorites/Favorites.scss";

const Favorites = ({
  favoriteChar,
  setFavoriteChar,
  favoriteCom,
  setFavoriteCom,
}) => {
  const token = Cookies.get("token");

  return token ? (
    <div className="favorites">
      <div className="favorite-container">
        <div className="favorite-char">
          <p>Favorite Characters</p>
          <div className="favorite-char-cards">
            {favoriteChar.length === 0 ? (
              <div>You have no favorite characters yet</div>
            ) : (
              favoriteChar.map((character) => {
                return (
                  <CardCharacter
                    id="card-character"
                    key={character._id}
                    character={character}
                    favoriteChar={favoriteChar}
                    setFavoriteChar={setFavoriteChar}
                    token={token}
                  />
                );
              })
            )}
          </div>
          <div className="favorite-com">
            <p>Favorite Comics</p>
            <div className="favorite-com-cards">
              {favoriteCom.length === 0 ? (
                <div>You have no favorite comics yet</div>
              ) : (
                favoriteCom.map((comic) => {
                  return (
                    <CardComic
                      id="card-comic"
                      key={comic._id}
                      comic={comic}
                      favoriteCom={favoriteCom}
                      setFavoriteCom={setFavoriteCom}
                      token={token}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" state={{ fromFavorites: true }} />
  );
};
export default Favorites;
