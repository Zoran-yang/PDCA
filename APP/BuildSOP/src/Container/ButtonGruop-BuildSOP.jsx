import Button from "@mui/material/Button";
import ErrorWarning from "../../../AddUserInfo/src/CommonTools/Component/ErrorWarning.jsx";
import saveTasksData from "../../../AddUserInfo/src/CommonTools/Function/saveTasksData.jsx";
import { convertToRaw } from "draft-js";

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
          console.log("BasicUserInputInterface", "isMistake", isMistake);

          if (isMistake) return; // if there is a mistake, don't go to the next page
          AfterSubmit(
            selectedTaskTypes, // for DisplaySopArea.jsx
            selectedTaskNames, // for DisplaySopArea.jsx
            selectedTaskTags, // for DisplaySopArea.jsx
            JSON.stringify(convertToRaw(addedTaskContent.getCurrentContent())), // for DisplaySopArea.jsx // If render addedTaskContent to DisplaySopArea will cause error in production mode.
            sopId // for DisplaySopArea.jsx
          );
          handleIsSubmitted();
          clearUserInput();
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
          console.log("BasicUserInputInterface", "isMistake", isMistake);

          if (isMistake) return; // if there is a mistake, don't go to the next page
          window.close();
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
