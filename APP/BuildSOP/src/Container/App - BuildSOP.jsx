import BasicUserInputInterface from "../../../AddUserInfo/src/CommonTools/Component/BasicUserInputInterface.jsx";
import ButtonGruopOfBuildSOP from "./ButtonGruop-BuildSOP.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Paper } from "@mui/material";
// import mainTheme from "../../../AddUserInfo/src/CommonTools/Component/mainTheme.jsx";
import "./App.css";

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
  },
});

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <BasicUserInputInterface title="SOP" dataSource="BuildSOP">
        {(
          dataSource,
          AfterSubmit,
          AfterCancel,
          clearUserInput,
          handleIsSubmitted,
          selectedTaskTypes,
          selectedTaskNames,
          selectedTaskTags,
          addedTaskContent,
          sopId,
          setIsMistake,
          isMistake,
          setButtonClicked
        ) => (
          <ButtonGruopOfBuildSOP
            dataSource={dataSource}
            AfterSubmit={AfterSubmit}
            AfterCancel={AfterCancel}
            clearUserInput={clearUserInput}
            handleIsSubmitted={handleIsSubmitted}
            selectedTaskTypes={selectedTaskTypes}
            selectedTaskNames={selectedTaskNames}
            selectedTaskTags={selectedTaskTags}
            addedTaskContent={addedTaskContent}
            sopId={sopId}
            setIsMistake={setIsMistake}
            isMistake={isMistake}
            setButtonClicked={setButtonClicked}
          />
        )}
      </BasicUserInputInterface>
    </ThemeProvider>
  );
}
