const Pagination = ({ page, setPage, tab, numberOfPages }) => {
  return (
    <div>
      {tab.map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setPage(index + 1);
            }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
