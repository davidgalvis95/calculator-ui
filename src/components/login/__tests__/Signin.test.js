import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import SignIn from "../SignIn";
import useAuthApi from "../../../hooks/useAuthApi";

jest.mock("../../../hooks/useAuthApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

describe("SignIn component", () => {
  test("should render SignIn component correctly", () => {
    render(<SignIn />);
    const titleElement = screen.getByTestId("title");
    expect(titleElement).toBeInTheDocument();
  });

  test("should call authService.signIn with entered email and password on form submit", async () => {
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
    render(<SignIn />);
    const emailInput = screen.getByLabelText("email@example.com");
    const passwordInput = screen.getByTestId("password-input");
    const signInButton = screen.getByTestId("sign-in-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput.querySelector("input"), {
      target: { value: "testPassword" },
    });

    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(signInMock).toHaveBeenCalledWith("test@example.com", "testPassword");
  });

  test("should navigate to sign-up page when 'Create An Account' button is clicked", () => {
    render(<SignIn />);
    const goSignUpButton = screen.getByText("Create An Account");
    fireEvent.click(goSignUpButton);

    // Assert that the navigate function was called with the correct path
    expect(mockedUseNavigate).toHaveBeenCalledWith("/sign-up");
  });

  test("should navigate to /calculator page after successful sign-in", async () => {
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

    signInMock.mockResolvedValue(true);

    render(<SignIn />);
    const signInButton = screen.getByTestId("sign-in-button");

    fireEvent.change(screen.getByLabelText("email@example.com"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(
      screen.getByTestId("password-input").querySelector("input"),
      {
        target: { value: "testPassword" },
      }
    );

    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(mockedUseNavigate).toHaveBeenCalledWith("/calculator");
  });
});
