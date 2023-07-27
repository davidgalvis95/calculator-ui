import React from "react";
import { render } from "@testing-library/react";
import { EnhancedTableBody } from "../EnhancedTableBody";

test("renders EnhancedTableBody without errors", () => {
  const rowsData = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    { id: 3, name: "Alice", age: 22 },
  ];
  const selected = [1, 3];
  const emptyRows = 2;
  const handleSelectClick = jest.fn();
  const disableCheckForIds = []; // Use an empty array as a default value

  render(
    <EnhancedTableBody
      rowsData={rowsData}
      handleSelectClick={handleSelectClick}
      selected={selected}
      emptyRows={emptyRows}
      disableCheckForIds={disableCheckForIds} // Provide the prop here
    />
  );
});
