import React from "react";

import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CardCharacter from "../../components/Cards/CardCharacter";
import CardComic from "../../components/Cards/CardComic";
const Favorites = ({ favChar, setFavChar, favCom, setFavCom }) => {
  const token = Cookies.get("token");

  return token ? (
    <div id="favorites">
      <div className="favorite-container">
        <div className="favorite-char">
          <p>Favorite Characters</p>
          <div className="favorite-char-cards">
            {favChar.length === 0 ? (
              <div>You have no favorite characters yet</div>
            ) : (
              favChar.map((character) => {
                return (
                  <CardCharacter
                    key={character._id}
                    character={character}
                    favChar={favChar}
                    setFavChar={setFavChar}
                    token={token}
                  />
                );
              })
            )}
          </div>
          <div className="favorite-com">
            <p>Favorite Comics</p>
            <div className="favorite-com-cards">
              {favCom.length === 0 ? (
                <div>You have no favorite comics yet</div>
              ) : (
                favCom.map((comic) => {
                  return (
                    <CardComic
                      key={comic._id}
                      comic={comic}
                      favCom={favCom}
                      setFavCom={setFavCom}
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
