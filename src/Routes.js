import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/login/SignIn";
import Calculator from "./components/calculator/Calculator";
import { UsersTable } from "./components/table/users/UsersTable";
import { HistoryTable } from "./components/table/history/HistoryTable";
import SignUp from "./components/login/SignUp";
import Profile from "./components/profile/Profile";

const RoutesComponent = () => {
  const { userMeta } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {userMeta && (
          <Route
            path="/profile"
            element={
              <Profile
                userEmail={userMeta.email}
                userRoles={userMeta.roles}
                userBalance={userMeta.balance}
              />
            }
          />
        )}
        {userMeta && <Route path="/calculator" element={<Calculator />} />}
        {userMeta && <Route path="/history" element={<HistoryTable />} />}
        {userMeta && userMeta.roles?.find((role) => role === "ROLE_ADMIN") && (
          <Route path="/users" element={<UsersTable />} />
        )}
        <Route path="/" element={<SignIn />} />
        <Route path="*" element={<div>404 Page not Found</div>} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
