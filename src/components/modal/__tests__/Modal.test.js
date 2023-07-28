import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "../Modal";

describe("Modal component", () => {
  test("renders title and message correctly", () => {
    const title = "Test Title";
    const message = "Test Message";
    const { getByText } = render(
      <Modal setIsOpen={() => {}} title={title} message={message} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(message)).toBeInTheDocument();
  });

  test("calls setIsOpen with false when Ok button is clicked", () => {
    const mockSetIsOpen = jest.fn();
    const { getByText } = render(
      <Modal
        setIsOpen={mockSetIsOpen}
        title="Test Title"
        message="Test Message"
      />
    );

    fireEvent.click(getByText("Ok"));

    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});
