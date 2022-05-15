import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardComic from "../../components/Cards/CardComic";
import CardCharacter from "../../components/Cards/CardCharacter";

const Character = ({
  favoriteChar,
  setFavoriteChar,
  favoriteCom,
  setFavoriteCom,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-lucie.herokuapp.com/comics/${id}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div className="character-infos">
        <CardCharacter
          id="character-details"
          character={data}
          favoriteChar={favoriteChar}
          setFavoriteChar={setFavoriteChar}
          token={token}
        />
      </div>
      {data.comics.length > 0 && (
        <div>
          <p> is featured in the following comics</p>
          <div className="comics-cards">
            {data.comics.map((comic) => {
              return (
                <CardComic
                  key={comic._id}
                  comic={comic}
                  favoriteCom={favoriteCom}
                  setFavoriteCom={setFavoriteCom}
                  token={token}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default Character;
