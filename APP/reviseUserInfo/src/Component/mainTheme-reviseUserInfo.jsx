// import { createTheme } from "@mui/material/styles";

import { createTheme } from "@mui/material";

const mainTheme = createTheme({
  typography: {
    fontFamily: [
      "source-code-pro",
      "Menlo",
      "Monaco",
      "Consolas",
      "Courier New",
      "monospace",
    ].join(","),
    color: "red",
  },
  palette: {
    mode: "light",
    primary: {
      main: "#ff8264",
    },
    secondary: {
      main: "#2196f3",
    },
    background: {
      paper: "#fff5a5",
      default: "#fff5a5",
    },
    text: {
      primary: "#ff6464",
      hint: "#ffaa64",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "none",
          padding: "10px 15px",
        },
      },
    },
    // MuiBottomNavigation: {
    //   styleOverrides: {
    //     root: {
    //       // fontSize: 32,
    //       padding: "10px 15px",
    //       // backgroundColor: "#ffaa64",
    //       // color: "#ffaa64",
    //     },
    //     // "&selected": {
    //     //   color: "#ff6464",
    //     // },
    //   },
    // },
    // MuiBottomNavigationAction: {
    //   styleOverrides: {
    //     root: {
    //       // fontSize: 32,
    //       padding: "10px 15px",
    //       // background: {
    //       //   default: "#ffaa64",
    //       // },
    //       // color: "#ffaa64",
    //       // "&$selected": {
    //       //   color: "#ff6464",
    //       // },
    //     },
    //   },
    // },
  },
});

export default mainTheme;
