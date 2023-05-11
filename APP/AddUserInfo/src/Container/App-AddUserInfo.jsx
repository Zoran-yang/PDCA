import BasicUserInputInterface from "../CommonTools/Component/BasicUserInputInterface.jsx";
import CreateReminder from "../Component/CreateReminder/CreateReminder.jsx";
import ButtonGruopOfAddUserInfo from "../Component/ButtonGruop-AddUserInfo.jsx";
import "./App.css";
import mainTheme from "../CommonTools/Component/mainTheme.jsx";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper } from "@mui/material";

export default function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <BasicUserInputInterface
        title="Task"
        dataSource="AddUserInfo"
        AfterSubmit={() => console.log("submit")}
        defaultValues={null}
        AfterCancel={() => window.close()}
        NextPage={CreateReminder}
      >
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
          <ButtonGruopOfAddUserInfo
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
