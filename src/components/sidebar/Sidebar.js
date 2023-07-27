import React from "react";
import useAuthApi from "../../hooks/useAuthApi";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { Drawer, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Calculate as CalculateIcon,
  AccountCircle as AccountCircleIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  logoutIcon,
  sideBarContainer,
  sideBarWrapper,
  signOutButton,
  signOutButtonWrapper,
  sideBarIconsStyles,
  sideBarContainerStyle
} from "./SidebarMuiStyles";

const SidebarWrapper = styled(Drawer)(() => (sideBarWrapper));
const SidebarContainer = styled("div")(({ theme }) => (sideBarContainerStyle(theme)));
const SignOutButtonWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
}));

const Sidebar = () => {
  const authService = useAuthApi();
  const navigate = useNavigate();
  const { userMeta } = useSelector((state) => state.user);

  const SignOutButton = styled(ListItem)(() => (signOutButton));

  const navigateProfile = () => {
    navigate("/profile");
  };

  const navigateCalculator = () => {
    navigate("/calculator");
  };

  const navigateHistory = () => {
    navigate("/history");
  };

  const navigateUsers = () => {
    navigate("/users");
  };

  const handleSignoutClick = () => {
    authService.logOut();
  };

  return (
    <SidebarWrapper variant="permanent">
      <SidebarContainer sx={sideBarContainer}>
        <List>
          <div title="Profile">
            <AccountCircleIcon
              sx={sideBarIconsStyles}
              onClick={navigateProfile}
            />
          </div>
          <div title="Calculator">
            <CalculateIcon
              sx={sideBarIconsStyles}
              onClick={navigateCalculator}
            />
          </div>
          <div title="History">
            <HistoryIcon sx={sideBarIconsStyles} onClick={navigateHistory} />
          </div>
          {userMeta?.roles?.find((role) => role === "ROLE_ADMIN") && (
            <div title="Users">
              <GroupIcon sx={sideBarIconsStyles} onClick={navigateUsers} />
            </div>
          )}
        </List>
      </SidebarContainer>
      <div title="Log out">
        <SignOutButtonWrapper sx={signOutButtonWrapper}>
          <List>
            <SignOutButton
              button
              component={Link}
              onClick={handleSignoutClick}
              to="/sign-in"
            >
              <LogoutIcon className="logoutIcon" sx={logoutIcon} />
            </SignOutButton>
          </List>
        </SignOutButtonWrapper>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
