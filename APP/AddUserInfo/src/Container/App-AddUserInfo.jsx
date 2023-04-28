import BasicUserInputInterface from "../CommonTools/Component/BasicUserInputInterface.jsx";
import CreateReminder from "../Component/CreateReminder/CreateReminder.jsx";
import "./App.css";

export default function App() {
  return (
    <BasicUserInputInterface
      title="Task"
      dataSource="AddUserInfo"
      AfterSubmit={() => console.log("submit")}
      defaultValues={null}
      AfterCancel={() => window.close()}
      NextPage={CreateReminder}
    />
    // <BasicUserInputInterface  // for debug
    //   title="Task"
    //   dataSource="AddUserInfo"
    //   NextPage={() => {
    //     console.log("KO");
    //   }}
    // />
  );
}
