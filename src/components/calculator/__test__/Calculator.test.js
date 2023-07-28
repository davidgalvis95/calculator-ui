import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Calculator from "../Calculator";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../../hooks/useOperationsApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../sidebar/Sidebar", () => () => {
  return <mock-sidebar data-testid="sidebar" />;
});

describe("Calculator tests", () => {
  test("renders the calculator component", () => {
    render(
      <Provider store={store}>
        <Router>
          <Calculator />
        </Router>
      </Provider>
    );

    const calculatorTitle = screen.getByText("Calculator");
    expect(calculatorTitle).toBeInTheDocument();
  });
});
