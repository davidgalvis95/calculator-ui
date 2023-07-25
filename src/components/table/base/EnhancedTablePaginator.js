import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import "./EnhancedTablePaginator.css";

export const PREV_PAGE = "prev";
export const NEXT_PAGE = "next";

export const EnhancedTablePaginator = ({
  rowsPerPage,
  page,
  totalPages,
  totalRows,
  handleChangePage,
}) => {

  const handleSwitchPage = (type) => {
    handleChangePage(type);
  };

  const buildRowFromTotalRowsDesc = () => {
    const from = totalRows? (page - 1) * rowsPerPage + 1: totalRows;
    const to = Math.min(rowsPerPage * page, totalRows);
    return `${from}-${to} of ${totalRows}`;
  };

  return (
    <div className="pagingContainer">
      {page === totalPages}
      <div className="pagingElement">
        Rows Per Page: {Math.min(rowsPerPage, totalRows)}
      </div>
      <div className="pagingElement">
        {buildRowFromTotalRowsDesc()}
      </div>
      <button
        className="pagingPrevButton"
        disabled={page === 1}
        onClick={(e) => handleSwitchPage(PREV_PAGE)}
      >
        <GrFormPrevious />
      </button>
      <button
        className="pagingNextButton"
        disabled={totalPages === 0 || page === totalPages}
        onClick={(e) => handleSwitchPage(NEXT_PAGE)}
      >
        <GrFormNext />
      </button>
    </div>
  );
};
