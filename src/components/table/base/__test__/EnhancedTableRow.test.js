import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EnhancedTableRow } from "../EnhancedTableRow";
import { ThemeProvider, createTheme } from "@mui/material/styles";

test("renders EnhancedTableRow correctly", () => {
  const rowData = { id: 1, name: "John", age: 25 };
  const selected = true;
  const handleSelectClick = jest.fn();
  const labelId = "select-0";
  const showCheckBox = true;
  const disableParticularCheckbox = false;

  // Crear un tema de Material-UI para las pruebas
  const theme = createTheme();

  render(
    <ThemeProvider theme={theme}>
      <table>
        <tbody>
          <EnhancedTableRow
            rowData={rowData}
            selected={selected}
            handleSelectClick={handleSelectClick}
            labelId={labelId}
            showCheckBox={showCheckBox}
            disableParticularCheckbox={disableParticularCheckbox}
          />
        </tbody>
      </table>
    </ThemeProvider>
  );

  // Verificar que el checkbox está presente si showCheckBox es verdadero
  if (showCheckBox) {
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeInTheDocument();
    expect(checkboxes[0]).toHaveAttribute("aria-checked", "true");
  }

  // Verificar que el contenido de las celdas es correcto
  const idCell = screen.getByText(rowData.id.toString());
  expect(idCell).toBeInTheDocument();

  const nameCell = screen.getByText(rowData.name);
  expect(nameCell).toBeInTheDocument();

  const ageCell = screen.getByText(rowData.age.toString());
  expect(ageCell).toBeInTheDocument();
});
