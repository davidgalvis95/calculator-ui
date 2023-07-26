export const numberButtonStyle = {
  borderRadius: 5,
  backgroundColor: "#74b9ff",
  "@media screen and (max-width: 1000px)": {
    maxWidth: "90%",
    minWidth: "90%",
    borderRadius: 3,
  },
  "@media screen and (max-width: 500px)": {
    maxWidth: "40%",
    minWidth: "40%",
    borderRadius: 3,
    fontSize: "10px",
  },
};

export const operatorButtonStyle = (op) => {
  return {
    borderRadius: 5,
    backgroundColor: op === "=" || op === "DEL" ? "#4b6584" : "#95afc0",
    maxWidth: "70px",
    "@media screen and (max-width: 1000px)": {
      maxWidth: "80%",
      minWidth: "80%",
      borderRadius: 3,
    },
    "@media screen and (max-width: 500px)": {
      maxWidth: "50%",
      minWidth: "50%",
      borderRadius: 3,
      fontSize: "10px",
    },
    "@media screen and (max-width: 600px)": {
      fontSize: op === "RAST" || op === "DEL" ? "10px" : "13px",
    },
  };
};

export const textFieldStyle = {
    textAlign: "right",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }
