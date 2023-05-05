import BasicUserInputInterface from "../../../AddUserInfo/src/CommonTools/Component/BasicUserInputInterface.jsx";
import ButtonGruopOfBuildSOP from "./ButtonGruop-BuildSOP.jsx";

export default function App() {
  return (
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
  );
}
