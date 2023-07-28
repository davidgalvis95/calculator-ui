import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EnhancedTableToolbar } from "../EnhancedTableToolBar";

const filters = [
  {
    filterFieldName: "status",
    display: "Status",
    filterValue: "open",
    values: ["Open", "Closed", "In Progress"],
  },
];

const actionNames = ["Process", "Delete"];

describe("EnhancedTableToolbar component", () => {
  test("renders EnhancedTableToolbar without errors", () => {
    render(
      <EnhancedTableToolbar
        numSelected={0}
        handleStatusFilterChange={() => {}}
        filters={filters}
        processSelected={() => {}}
        actionNames={actionNames}
      />
    );

    expect(screen.getByText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select status/i)).toBeInTheDocument();
    expect(screen.getByText(/Open/i)).toBeInTheDocument();
  });

  test("displays action buttons when numSelected > 0", () => {
    render(
      <EnhancedTableToolbar
        numSelected={1}
        handleStatusFilterChange={() => {}}
        filters={filters}
        processSelected={() => {}}
        actionNames={actionNames}
      />
    );

    expect(screen.getByText("Process")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("calls processSelected when action button is clicked", () => {
    const processSelectedMock = jest.fn();
    render(
      <EnhancedTableToolbar
        numSelected={1}
        handleStatusFilterChange={() => {}}
        filters={filters}
        processSelected={processSelectedMock}
        actionNames={actionNames}
      />
    );

    fireEvent.click(screen.getByText("Process"));

    expect(processSelectedMock).toHaveBeenCalledTimes(1);
  });
});
