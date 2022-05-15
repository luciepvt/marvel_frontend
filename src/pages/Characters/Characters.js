import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

//
import CardCharacter from "../../components/Cards/CardCharacter";
import Pagination from "../../components/Pagination/Pagination";

// import "../components/CharactersAndComics.scss";

const Characters = ({ token, favChar, setFavChar }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const [limit, setLimit] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?page=${page}&search=${search}`
        );
        // `https://marvel-backend-lucie.herokuapp.com/characters?page=${page}&search=${search}`

        setData(response.data);
        setLimit(Math.ceil(response.data.count / response.data.limit));
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [page, search]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="characters-menu-container">
          <div className="search-bar">
            <input
              className="input-search"
              type="text"
              placeholder="search your character"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Pagination page={page} setPage={setPage} limit={limit} />
          <div className="characters">
            <div className="characters-container">
              {data.results &&
                data.results.map((character) => {
                  return (
                    <div key={character._id}>
                      {character.thumbnail.path !==
                        `http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available` &&
                      character.thumbnail.path !==
                        `http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708` ? (
                        <CardCharacter
                          character={character}
                          favChar={favChar}
                          setFavChar={setFavChar}
                          token={token}
                        />
                      ) : null}
                    </div>
                  );
                })}
            </div>
          </div>
          <Pagination page={page} setPage={setPage} limit={limit} />
        </div>
      )}
    </>
  );
};
export default Characters;
