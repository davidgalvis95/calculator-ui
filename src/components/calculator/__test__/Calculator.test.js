import React from "react";
import { render, screen } from "@testing-library/react";
import Calculator from "../Calculator";
import { Provider } from 'react-redux';
import { store } from '../../../store/store'; 
import { BrowserRouter as Router } from 'react-router-dom'; // Import the BrowserRouter component


test("renders the calculator component", () => {
    render(
        <Provider store={store}>
          <Router> {/* Wrap the Calculator component with Router */}
            <Calculator />
          </Router>
        </Provider>
      );

  // Test that the calculator component is rendered
  const calculatorTitle = screen.getByText("Calculator");
  expect(calculatorTitle).toBeInTheDocument();
});
