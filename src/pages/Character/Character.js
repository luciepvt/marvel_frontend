import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardComic from "../../components/CardComic";

const Character = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comics/${id}`);
        // const response = await axios.get(
        //   `https://marvel-backend-lucie.herokuapp.com/comics/${id}`
        // );
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
        <div>{data.name}</div>
        <div>
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension} `}
            alt=""
          />
        </div>
        <div>{data.description}</div>
      </div>
      {data.comics.length > 0 && (
        <div>
          <p>{data.name} is featured in the following comics</p>
          <div className="comics-cards">
            {data.comics.map((item, index) => {
              return (
                <CardComic
                  key={item._id}
                  title={item.title}
                  picture={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  description={item.description}
                  id={item._id}
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
