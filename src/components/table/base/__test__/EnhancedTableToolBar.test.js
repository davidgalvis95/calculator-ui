import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EnhancedTableToolbar } from "../EnhancedTableToolBar";

// Mock de los datos de prueba para las propiedades
const filters = [
  {
    filterFieldName: "status",
    display: "Status",
    filterValue: "open",
    values: ["Open", "Closed", "In Progress"],
  },
];

const actionNames = ["Process", "Delete"];

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

  // Verificar que el componente se renderiza sin errores
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

  // Verificar que los botones de acción se muestran cuando numSelected > 0
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

  // Simular un clic en el botón de acción
  fireEvent.click(screen.getByText("Process"));

  // Verificar que la función processSelected ha sido llamada
  expect(processSelectedMock).toHaveBeenCalledTimes(1);
});
