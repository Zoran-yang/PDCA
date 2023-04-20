import SOPDisplayField from "../../CommonTools/Component/SOPDisplayField.jsx";
import TaskDisplayField from "../../CommonTools/Component/TaskDisplayField.jsx";

export default function Reminder({ sopData }) {
  return (
    <>
      <TaskDisplayField sopData={sopData}>
        {(childrenData) => <SOPDisplayField sopInfo={childrenData} />}
      </TaskDisplayField>
    </>
  );
}
