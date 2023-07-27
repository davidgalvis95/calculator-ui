import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Sidebar from "../../sidebar/Sidebar";
import PropTypes from "prop-types";
import { EnhancedTableToolbar } from "./EnhancedTableToolBar";
import { EnhancedTableHead } from "./EnhancedTableHead";
import { EnhancedTableBody } from "./EnhancedTableBody";
import { EnhancedTablePaginator } from "./EnhancedTablePaginator";
import { table, tableContainer } from "./EnhancedTableMuiStyles";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  console.log(array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const EnhancedTable = (props) => {
  const {
    headers,
    rowsData,
    defaultSelectedSortField,
    title,
    filterConfig,
    enableSelect,
    pagingData,
    handlePageChange,
    handleAppliedFilter,
    handleSelected,
    actionNames,
    generalStyles,
    disableCheckForIds,
    defaultOrder,
  } = props;
  const [order, setOrder] = useState(defaultOrder || "asc");
  const [orderBy, setOrderBy] = useState(defaultSelectedSortField);
  const [selected, setSelected] = useState([]);
  const [statusFilter, setStatusFilter] = useState(filterConfig);
  const [emptyRows, setEmptyRows] = useState(0);
  const [visibleRows, setVisibleRows] = useState(rowsData);

  useEffect(() => {
    const newVisibleRows = stableSort(rowsData, getComparator(order, orderBy));
    setVisibleRows(newVisibleRows);

    if (pagingData.page > 0) {
      setEmptyRows(
        pagingData.totalRows && pagingData.pageSize - rowsData.length
      );
    } else {
      setEmptyRows(0);
    }
  }, [rowsData, statusFilter, order]);

  useEffect(() => {
    handleFilterApplied();
  }, [statusFilter]);

  const handleStatusFilterChange = (event, filter) => {
    const statusFilterCopy = [...statusFilter];
    const filterFieldNamePredicate = (f) =>
      f.filterFieldName === filter.filterFieldName;
    const filterElementIndex = statusFilterCopy.findIndex(
      filterFieldNamePredicate
    );
    const filterElement = statusFilterCopy.find(filterFieldNamePredicate);
    const filterElementCopy = { ...filterElement };
    filterElementCopy.filterValue = event.target.value.toLowerCase();
    statusFilterCopy[filterElementIndex] = filterElementCopy;
    setStatusFilter(statusFilterCopy);
  };

  const handleFilterApplied = () => {
    if (statusFilter !== undefined) {
      const appliedFilters = statusFilter.filter(
        (conf) => conf.filterValue !== ""
      );
      const additionalQueryParams = appliedFilters
        .map((filter) => {
          const realValue = filter.values.filter(
            (value) => value.toLowerCase() === filter.filterValue
          );
          return `&${filter.filterFieldName}=${realValue}`;
        })
        .join("");
      setSelected([]);
      handleAppliedFilter(additionalQueryParams);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rowsData.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const processSelected = (event) => {
    handleSelected(event, selected).then(setSelected([]));
  };

  const handleChangePage = (type) => {
    setSelected([]);
    handlePageChange(type);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <div>
      <p>{title}</p>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleStatusFilterChange={handleStatusFilterChange}
            filters={statusFilter}
            processSelected={(e) => processSelected(e)}
            actionNames={actionNames}
          />

          <TableContainer sx={tableContainer(generalStyles)}>
            <Table
              sx={table(generalStyles)}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                headers={headers}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rowsData.length}
                enableSelect={enableSelect}
              />
              <EnhancedTableBody
                rowsData={visibleRows}
                handleSelectClick={handleSelectClick}
                selected={selected}
                emptyRows={emptyRows}
                enableSelect={enableSelect}
                disableCheckForIds={disableCheckForIds}
              />
            </Table>
          </TableContainer>
          <EnhancedTablePaginator
            rowsPerPage={pagingData.pageSize}
            page={pagingData.page}
            totalPages={pagingData.totalPages}
            totalRows={pagingData.totalRows}
            handleChangePage={handleChangePage}
          />
        </Paper>
      </Box>
      <Sidebar />
    </div>
  );
};

EnhancedTable.propTypes = {
  headers: PropTypes.array.isRequired,
  rowsData: PropTypes.array.isRequired,
  defaultSelectedSortField: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  filterConfig: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string.isRequired,
      filterFieldName: PropTypes.string.isRequired,
      filterValue: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
