import { useState, useEffect } from "react";
import axios from "axios";
import CardComic from "../../components/CardComic";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?search=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      // const response = await axios.get(
      //   `https://marvel-backend-lucie.herokuapp.com/comics`
      // );
    };
    fetchData();
  }, [search]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="comics-menu-container">
          <div className="search-bar">
            <input
              className="input-search"
              type="text"
              placeholder="search your comics"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          <div className="comics">
            <div className="comics-container">
              {data.results &&
                data.results.map((comic, index) => {
                  return (
                    <CardComic
                      key={comic._id}
                      title={comic.title}
                      description={comic.description}
                      picture={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      id={comic._id}
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
export default Comics;
