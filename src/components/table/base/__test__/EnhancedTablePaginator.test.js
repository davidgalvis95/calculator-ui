import React from "react";
import { render } from "@testing-library/react";
import { EnhancedTablePaginator } from "../EnhancedTablePaginator"; // Importamos las constantes que necesitamos

test("renders the correct row information", () => {
  const rowsPerPage = 10;
  const page = 2;
  const totalPages = 5;
  const totalRows = 46;
  const handleChangePage = jest.fn();

  const { getByText } = render(
    <EnhancedTablePaginator
      rowsPerPage={rowsPerPage}
      page={page}
      totalPages={totalPages}
      totalRows={totalRows}
      handleChangePage={handleChangePage}
    />
  );

  const rowInformation = getByText("11-20 of 46");
  expect(rowInformation).toBeInTheDocument();
});

