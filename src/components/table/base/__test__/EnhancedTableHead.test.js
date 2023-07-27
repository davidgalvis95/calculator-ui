import React from "react";
import { render, screen } from "@testing-library/react";
import { EnhancedTableHead } from "../EnhancedTableHead";

test("renders the correct number of headers", () => {
  const headers = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "age", numeric: true, disablePadding: false, label: "Age" },
  ];
  const numSelected = 2;
  const order = "asc";
  const orderBy = "name";
  const rowCount = 10;
  const onRequestSort = jest.fn();
  const onSelectAllClick = jest.fn();

  render(
    <EnhancedTableHead
      headers={headers}
      numSelected={numSelected}
      onRequestSort={onRequestSort}
      onSelectAllClick={onSelectAllClick}
      order={order}
      orderBy={orderBy}
      rowCount={rowCount}
      enableSelect={true}
    />
  );

  const headerCells = screen.getAllByRole("columnheader");
  expect(headerCells).toHaveLength(headers.length + 1); // Ajusta la longitud esperada
});



test("calls onRequestSort when clicking on a header", () => {
  const headers = [
    { id: "name", numeric: false, disablePadding: false, label: "Name" },
    { id: "age", numeric: true, disablePadding: false, label: "Age" },
  ];
  const numSelected = 2;
  const order = "asc";
  const orderBy = "name";
  const rowCount = 10;
  const onRequestSort = jest.fn();
  const onSelectAllClick = jest.fn();

  render(
    <EnhancedTableHead
      headers={headers}
      numSelected={numSelected}
      onRequestSort={onRequestSort}
      onSelectAllClick={onSelectAllClick}
      order={order}
      orderBy={orderBy}
      rowCount={rowCount}
      enableSelect={true}
    />
  );

  const headerCell = screen.getByText("Name");
  headerCell.click();

  expect(onRequestSort).toHaveBeenCalledWith(expect.anything(), "name");
});
