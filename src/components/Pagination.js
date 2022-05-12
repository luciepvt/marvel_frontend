import React from "react";
import { useState, useEffect } from "react";
// IMPORTER LE SCSS de Pagination

const Pagination = ({ search, count, skip, setSkip }) => {
  //Math.ceil = permet de retourner le plus petit entier supérieur ou égal au nb donné
  const [numberOfPages] = useState(Math.ceil(count / 100));
  const [page, setPage] = useState([1]);

  useEffect(() => {
    setPage([1]);
    for (let i = 2; i < numberOfPages + 1; i++) {
      setPage((prevState) => [...prevState, i]);
    }
  }, [numberOfPages]);

  return (
    <div>
      {search === "" ? (
        <div>
          {page.length > 1
            ? page.map((i, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSkip(index * 100);
                    }}
                  >
                    {" "}
                    {i}
                  </button>
                );
              })
            : "1"}
        </div>
      ) : null}
    </div>
  );
};

export default Pagination;
