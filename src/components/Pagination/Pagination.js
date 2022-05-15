import "../Pagination/Pagination.scss";
const Pagination = ({ page, setPage, limit }) => {
  return (
    <div>
      <button
        className={page === 1 ? "hidden" : "page-btn"}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        previous
      </button>
      <p>{`page ${page} / ${limit}`}</p>
      <button
        className={page === limit ? "hidden" : "page-btn"}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
      </button>
      );
    </div>
  );
};

export default Pagination;
