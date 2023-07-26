export const logoutIcon = {
  "@media screen and (max-width: 600px)": {
    fontSize: "20px",
    textAlign: "center",
    marginLeft: "0",
  },
};

export const sideBarContainer = {
  "@media screen and (max-width: 500px)": {
    paddingLeft: "8px",
    paddingRight: "8px",
  },
};

export const signOutButtonWrapper = {
  "@media screen and (max-width: 600px)": {
    maxWidth: "30px",
    paddingLeft: "0",
    paddingRight: "0",
  },
};

export const signOutButton = {
  backgroundColor: "#82ccdd",
  color: "#0a3d62",
  borderRadius: "4px",
  width: "60px",
  "&:hover": {
    backgroundColor: "#60a3bc",
    color: "black",
    "& .MuiListItemIcon-root": {
      color: "black",
    },
  },
  "@media screen and (max-width: 600px)": {
    maxWidth: "38px",
    minWidth: "38px",
    height: "30px",
    marginRight: "0",
    textAlign: "center",
  },
};

export const sideBarWrapper = {
  width: "auto",
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: "auto",
    backgroundColor: "#0a3d62",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export const sideBarIconsStyles = {
  color: "#82ccdd",
  fontSize: "35px",
  paddingTop: "10px",
};

export const sideBarContainerStyle = (theme) => {
  return {
    overflow: "auto",
    alignItems: "center",
    padding: theme.spacing(2),
  };
};
