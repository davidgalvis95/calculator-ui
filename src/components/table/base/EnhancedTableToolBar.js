import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types";
import "./EnhancedTableToolBar.css";
import { Button } from "@mui/material";

export const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    handleStatusFilterChange,
    filters,
    processSelected,
    actionNames,
  } = props;

  const handleStatusFilterChange1 = (event, filter1) => {
    handleStatusFilterChange(event, filter1);
  };

  return (
    <Toolbar
      sx={{
        backgroundColor: "#82ccdd",
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div>
        {filters.map((filter) => {
          return (
            <FormControl key={filter.filterValue} sx={{ ml: 2 }}>
              <div className="filter">{filter.display}</div>
              <Select
                key={filter.filterFieldName}
                sx={{
                  maxHeight: "25px",
                  fontSize: "15px",
                  backgroundColor: "#fff",
                  "@media screen and (max-width: 900px)": {
                    fontSize: "12px",
                  },
                }}
                value={filter.filterValue}
                onChange={(event) => {
                  handleStatusFilterChange1(event, filter);
                }}
                displayEmpty
                inputProps={{ "aria-label": "Select status" }}
              >
                <MenuItem
                  key={"all"}
                  sx={{ maxHeight: "25px", fontSize: "15px" }}
                  value=""
                >
                  All
                </MenuItem>
                {filter.values.map((value) => (
                  <MenuItem
                    key={value.toLowerCase()}
                    sx={{ maxHeight: "25px", fontSize: "15px" }}
                    value={value.toLowerCase()}
                  >
                    {value.charAt(0).toUpperCase() +
                      value.slice(1).toLowerCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          );
        })}
      </div>

      <div>
        {numSelected > 0 &&
          actionNames &&
          actionNames.map((name) => (
            <Button
              key={name}
              sx={{
                backgroundColor: "#f19066",
                color: "black",
                marginLeft: "15px",
                "&:hover": {
                  backgroundColor: "#e77f67",
                },
                "@media screen and (max-width: 900px)": {
                  display: "flex",
                  marginTop: "20px",
                  marginLeft: "0px",
                  fontSize: "8px",
                },
              }}
              onClick={(e) => processSelected(e)}
            >
              {name}
            </Button>
          ))}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
