export const tableContainer = (generalStyles) => {
  return {
    maxWidth: generalStyles.minWidth,
    "@media screen and (max-width: 1500px)": {
      maxWidth: "1100px",
    },
    "@media screen and (max-width: 1350px)": {
      maxWidth: "900px",
    },
    "@media screen and (max-width: 1200px)": {
      maxWidth: "800px",
    },
    "@media screen and (max-width: 1050px)": {
      maxWidth: "700px",
    },
    "@media screen and (max-width: 950px)": {
      maxWidth: "550px",
    },
    "@media screen and (max-width: 800px)": {
      maxWidth: "450px",
    },
    "@media screen and (max-width: 600px)": {
      maxWidth: "350px",
    },
    "@media screen and (max-width: 500px)": {
      maxWidth: "310px",
    },
  };
};

export const table = (generalStyles) => {
  return {
    minWidth: generalStyles.minWidth,
    "@media screen and (max-width: 800px)": {
      minWidth: "1000px",
    },
  };
};
