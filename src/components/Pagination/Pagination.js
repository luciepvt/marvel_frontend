import "../Pagination/Pagination.scss";
const Pagination = ({ page, setPage, limit }) => {
  return (
    <div className="page-container">
      <button
        className={page === 1 ? "hidden" : "page-btn"}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        previous
      </button>
      <button
        className={page === limit ? "hidden" : "page-btn"}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
