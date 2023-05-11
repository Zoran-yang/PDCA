// import { createTheme } from "@mui/material/styles";

import { createTheme } from "@mui/material";

const mainTheme = createTheme({
  typography: {
    fontFamily: [
      "Consolas",
      "文泉驛正黑",
      "WenQuanYi Zen Hei",
      "儷黑 Pro",
      "LiHei Pro",
      "標楷體",
      "微軟正黑體",
      "Microsoft JhengHei",
      "source-code-pro",
      "Menlo",
      "Monaco",
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
      // default: "#fff5a5",
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
          // fontSize: "200rem",
        },
      },
    },
  },
});

export default mainTheme;
