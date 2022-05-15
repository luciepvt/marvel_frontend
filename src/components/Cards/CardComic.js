import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import "../Cards/CharactersAndComics.scss";
import "../../pages/Favorites/Favorites.scss";
const CardComic = ({ comic, favoriteCom, setFavoriteCom, token }) => {
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (favoriteCom.findIndex((fav) => fav._id === comic._id) !== -1) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [comic._id, favoriteCom]);

  const handleFavorite = async () => {
    if (token) {
      try {
        if (!favorite) {
          const newFav = [...favoriteCom];
          newFav.push(comic);
          const response = await axios.post(
            "https://marvel-backend-lucie.herokuapp.com/favorites/update",

            { favoriteComics: newFav },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoriteCom(response.data.favoriteComics);
          Cookies.set(
            "favoriteCom",
            JSON.stringify(response.data.favoriteComics)
          );
        } else {
          const trashFav = favoriteCom.filter((fav) => fav._id !== comic._id);
          const response = await axios.post(
            "https://marvel-backend-lucie.herokuapp.com/favorites/update",

            { favoriteComics: trashFav },
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );
          setFavoriteCom(response.data.favoriteComics);
          Cookies.set(
            "favoriteCom",
            JSON.stringify(response.data.favoriteComics)
          );
        }
        setFavorite(!favorite);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="card-comic">
      {favorite ? (
        <button className="fav-btn" onClick={handleFavorite}></button>
      ) : (
        <button className="no-fav-btn" type onClick={handleFavorite}></button>
      )}
      <div className="comic-title">{comic.title}</div>
      <div className="comic-picture-container">
        <img
          className="comic-img"
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt=""
        />
      </div>
      {comic.description && (
        <div className="comic-description-container">
          <div className="comic-description">{comic.description}</div>
        </div>
      )}
    </div>
  );
};
export default CardComic;
