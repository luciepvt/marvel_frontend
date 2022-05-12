import { useEffect, useState } from "react";
import axios from "axios";
import CardCharacter from "../components/CardCharacter";
import Pagination from "../components/Pagination";

// import "../components/CharactersAndComics.scss";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [search, setSearch] = useState("");

  // const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?search=${search}`
        );
        // `https://marvel-backend-lucie.herokuapp.com/characters`
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  // const numberOfPages = Math.ceil(data.count / 100);
  // const tabNumberOfPages = [];
  // for (let i = 0; i < numberOfPages; i++) {
  //   tabNumberOfPages.push(0);
  // }

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
              }}
            />
          </div>
          <div className="characters">
            <div className="characters-container">
              {data.results &&
                data.results.map((character, index) => {
                  return (
                    <CardCharacter
                      key={character._id}
                      name={character.name}
                      description={character.description}
                      picture={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      id={character._id}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Characters;
