const CardComic = ({ title, description, picture, id }) => {
  return (
    <div className="card-comic">
      <div className="comic-title">{title}</div>
      <div className="comic-picture-container">
        <img className="comic-img" src={picture} alt="" />
      </div>
      {description && (
        <div className="comic-description-container">
          <div className="comic-description">{description}</div>
        </div>
      )}
    </div>
  );
};
export default CardComic;
