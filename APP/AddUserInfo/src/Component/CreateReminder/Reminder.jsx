import SOPDisplayField from "../../CommonTools/SOPDisplayField.jsx";
import TaskDisplayField from "../../CommonTools/TaskDisplayField.jsx";

export default function Reminder({ sopData }) {
  return (
    <>
      <TaskDisplayField sopData={sopData}>
        {(childrenData) => <SOPDisplayField sopInfo={childrenData} />}
      </TaskDisplayField>
    </>
  );
}
