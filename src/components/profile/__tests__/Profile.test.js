import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Profile from "../Profile";
import useOperationsApi from "../../../hooks/useOperationsApi";

jest.mock("../../../hooks/useOperationsApi", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../../sidebar/Sidebar", () => () => {
  return <mock-sidebar data-testid="sidebar" />;
});

describe("Profile component", () => {
  test("should render Profile component correctly", () => {
    const props = {
      userEmail: "test@example.com",
      userRoles: ["ROLE_USER"],
      userBalance: 30,
    };

    render(<Profile {...props} />);
    expect(screen.getByText("Email: test@example.com")).toBeInTheDocument();
    expect(screen.getByText("Roles: USER")).toBeInTheDocument();
    expect(screen.getByText("Current Balance: $ 30")).toBeInTheDocument();
  });

  test("should display alert when balance is greater than 10 on 'Buy More Balance' button click", () => {
    const props = {
      userEmail: "test@example.com",
      userRoles: ["ROLE_USER"],
      userBalance: 20,
    };
    window.alert = jest.fn();

    render(<Profile {...props} />);
    const buyBalanceButton = screen.getByText("Buy More Balance");

    fireEvent.click(buyBalanceButton);

    expect(window.alert).toHaveBeenCalledWith(
      "You still have enough balance to play with, please add when your balance is less than $10"
    );
  });

  test("should call operationsApi.addUserBalance and update balance on 'Buy More Balance' button click", async () => {
    const props = {
      userEmail: "test@example.com",
      userRoles: ["ROLE_USER"],
      userBalance: 5,
    };

    const addUserBalanceMock = jest.fn(() => Promise.resolve(50));

    useOperationsApi.mockReturnValue({
      addUserBalance: addUserBalanceMock,
    });

    render(<Profile {...props} />);
    const buyBalanceButton = screen.getByText("Buy More Balance");

    await act(async () => {
      fireEvent.click(buyBalanceButton);
    });

    expect(addUserBalanceMock).toHaveBeenCalled();
    expect(screen.getByText("Current Balance: $ 50")).toBeInTheDocument();
  });
});
