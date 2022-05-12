import { useEffect, useState } from "react";
import axios from "axios";
import CardCharacter from "../../components/CardCharacter";
import Pagination from "../../components/Pagination/Pagination";

// import "../components/CharactersAndComics.scss";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/characters?page=${page}&search=${search}`
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
  }, [page, search]);

  const numberOfPages = Math.ceil(data.count / 100);
  const tab = [];
  for (let i = 0; i < numberOfPages; i++) {
    tab.push(0);
  }

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
          <Pagination
            page={page}
            setPage={setPage}
            tab={tab}
            numberOfPages={numberOfPages}
          />
        </div>
      )}
    </>
  );
};
export default Characters;
