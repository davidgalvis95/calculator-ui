import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import { EnhancedTableRow } from "./EnhancedTableRow";

export const EnhancedTableBody = (props) => {
  const {
    rowsData,
    handleSelectClick,
    selected,
    emptyRows,
    enableSelect,
    disableCheckForIds,
  } = props;
  const isSelected = (id) => {
    return selected.indexOf(id) !== -1;
  };

  const notInDisableCheckForIds = (searchedId) => {
    return disableCheckForIds.find((id) => id === searchedId) !== undefined;
  };

  return (
    <TableBody>
      {rowsData.map((rowData, index) => {
        return (
          <EnhancedTableRow
            key={rowData.id}
            selected={isSelected(rowData.id)}
            rowData={rowData}
            handleSelectClick={handleSelectClick}
            labelId={`select-${index}`}
            showCheckBox={enableSelect}
            disableParticularCheckbox={notInDisableCheckForIds(rowData.id)}
          />
        );
      })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: 53 * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

EnhancedTableBody.propTypes = {
  rowsData: PropTypes.arrayOf(PropTypes.object.isRequired),
  handleSelectClick: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(PropTypes.any.isRequired),
  emptyRows: PropTypes.number.isRequired,
};
