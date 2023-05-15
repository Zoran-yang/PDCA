// import BasicUserInputInterface from "../../../AddUserInfo/src/CommonTools/Component/BasicUserInputInterface.jsx";
import {
  BasicUserInputInterface,
  ThemeProvider as ThemeProviderZy,
} from "reactcommontool-zy";
import ButtonGruopOfBuildSOP from "./ButtonGruop-BuildSOP.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import mainTheme from "../../../AddUserInfo/src/Container/mainTheme-AddUserInfo.jsx";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <ThemeProviderZy theme={mainTheme}>
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
      </ThemeProviderZy>
    </ThemeProvider>
  );
}
