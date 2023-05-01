import BasicUserInputInterface from "../CommonTools/Component/BasicUserInputInterface.jsx";
import CreateReminder from "../Component/CreateReminder/CreateReminder.jsx";
import ButtonGruop from "../CommonTools/Component/ButtonGruop.jsx";
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
        isMistake
      ) => (
        <ButtonGruop
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
        />
      )}
    </BasicUserInputInterface>
    // <BasicUserInputInterface  // for debug
    //   title="Task"
    //   dataSource="AddUserInfo"
    //   NextPage={() => {
    //     console.log("KO");
    //   }}
    // />
  );
}
