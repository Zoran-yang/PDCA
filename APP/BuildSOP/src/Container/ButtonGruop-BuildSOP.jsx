import Button from "@mui/material/Button";
import ErrorWarning from "../../../AddUserInfo/src/CommonTools/Component/ErrorWarning.jsx";
import saveTasksData from "../../../AddUserInfo/src/CommonTools/Function/saveTasksData.jsx";

export default function ButtonGruopOfBuildSOP({
  dataSource,
  AfterSubmit, // not close window,
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
  setButtonClicked,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        marginRight: 5,
      }}
    >
      <div style={{ textAlign: "right", padding: 5 }}>
        {isMistake && <ErrorWarning error={isMistake} />}
      </div>
      <Button
        id="submit-btn"
        variant="outlined"
        sx={{ marginRight: 1 }}
        onClick={async () => {
          await saveTasksData(
            dataSource,
            selectedTaskTypes,
            selectedTaskNames,
            selectedTaskTags,
            addedTaskContent,
            sopId,
            setIsMistake
          );
          setButtonClicked("BuildSOP-save");
        }}
      >
        Save and Add More
      </Button>
      <Button
        id="cancel-btn"
        variant="outlined"
        sx={{ marginRight: 1 }}
        onClick={async () => {
          await saveTasksData(
            dataSource,
            selectedTaskTypes,
            selectedTaskNames,
            selectedTaskTags,
            addedTaskContent,
            sopId,
            setIsMistake
          );
          setButtonClicked("BuildSOP-cancel");
        }}
      >
        Save and Leave
      </Button>
      <Button id="cancel-btn" variant="outlined" onClick={AfterCancel}>
        cancal
      </Button>
    </div>
  );
}
