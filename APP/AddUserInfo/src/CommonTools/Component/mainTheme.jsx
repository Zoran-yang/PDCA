import { createTheme } from "@mui/material/styles";

const mainTheme = createTheme({
  // typography: {
  //   fontFamily: [
  //     "source-code-pro",
  //     "Menlo",
  //     "Monaco",
  //     "Consolas",
  //     "Courier New",
  //     "monospace",
  //   ].join(","),
  //   color: "red",
  // },
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#ff8264",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#2196f3",
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
    // MuiBottomNavigationAction: {
    //   styleOverrides: {
    //     root: {
    //       color: "#ffaa64",
    //       "&$selected": {
    //         color: "#ff6464",
    //       },
    //     },
    //   },
    // },
  },
});

export default mainTheme;
