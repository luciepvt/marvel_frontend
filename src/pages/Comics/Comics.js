import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

//
import CardComic from "../../components/Cards/CardComic";
import Pagination from "../../components/Pagination/Pagination";
const Comics = ({ token, favCom, setFavCom }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const [limit, setLimit] = useState();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics?page=${page}&search=${search}`
        );
        // `https://marvel-backend-lucie.herokuapp.com/comics?page=${page}&search=${search}`
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
        <div className="comics-menu-container">
          <div className="search-bar">
            <input
              className="input-search"
              type="text"
              placeholder="search your comics"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Pagination page={page} setPage={setPage} limit={limit} />
          <div className="comics">
            <div className="comics-container">
              {data.results &&
                data.results.map((comic) => {
                  return (
                    <CardComic
                      key={comic._id}
                      comic={comic}
                      favCom={favCom}
                      setFavCom={setFavCom}
                      token={token}
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
