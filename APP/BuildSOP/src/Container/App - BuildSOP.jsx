import BasicUserInputInterface from "../../../AddUserInfo/src/CommonTools/Component/BasicUserInputInterface.jsx";
import ButtonGruop from "../../../AddUserInfo/src/CommonTools/Component/ButtonGruop.jsx";

export default function App() {
  return (
    <BasicUserInputInterface title="SOP" dataSource="BuildSOP">
      {({
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
      }) => (
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
  );
}
