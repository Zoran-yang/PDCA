import BasicUserInputInterface from "../CommonTools/Component/BasicUserInputInterface.jsx";
import CreateReminder from "../Component/CreateReminder/CreateReminder.jsx";
import "./App.css";

export default function App() {
  return (
    // <BasicUserInputInterface title = "Task" dataSource = "AddUserInfo" NextPage = {CreateReminder}/>
    <BasicUserInputInterface
      title="Task"
      dataSource="AddUserInfo"
      NextPage={() => {
        console.log("KO");
      }}
    />
  );
}
