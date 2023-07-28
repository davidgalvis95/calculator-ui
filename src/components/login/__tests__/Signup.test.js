import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SignUp from "../SignUp";
import useAuthApi from "../../../hooks/useAuthApi";

jest.mock("../../../hooks/useAuthApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("SignUp component", () => {
  test("should render SignUp component correctly", () => {
    render(<SignUp />);
    const titleElement = screen.getByText("Register User");
    expect(titleElement).toBeInTheDocument();
  });

  test("should display success message on successful sign up", async () => {
    const signUpMock = jest.fn(() =>
      Promise.resolve("User signed up successfully!")
    );
    const signInMock = jest.fn(() =>
      Promise.resolve("User signed in successfully!")
    );
    const logOutMock = jest.fn(() => Promise.resolve());

    useAuthApi.mockReturnValue({
      signUp: signUpMock,
      signIn: signInMock,
      logOut: logOutMock,
    });

    render(<SignUp />);
    const emailInput = screen.getByLabelText("email@example.com");

    const passwordInput = screen.getByTestId("password-input");

    const nameInput = screen.getByLabelText("name");
    const signUpButton = screen.getByText("Sign Up");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput.querySelector("input"), {
      target: { value: "testPassword" },
    });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    act(() => {
      fireEvent.click(signUpButton);
    });
    const successMessage = await screen.findByText(
      "User Signed Up Successfully!"
    );
    expect(successMessage).toBeInTheDocument();
  });

  test("should navigate to sign-in page when 'I Have An Account' button is clicked", () => {
    render(<SignUp />);
    const goSignInButton = screen.getByText("I Have An Account");
    fireEvent.click(goSignInButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith("/sign-in");
  });
});
