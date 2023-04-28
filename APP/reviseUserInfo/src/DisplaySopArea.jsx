import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TaskDisplayField from "../../AddUserInfo/src/CommonTools/Component/TaskDisplayField";
import { useEffect, useState } from "react";
import FloatingWindows from "../../AddUserInfo/src/CommonTools/Component/floatingWindows";
import BasicUserInputInterface from "../../AddUserInfo/src/CommonTools/Component/BasicUserInputInterface.jsx";
import delTaskData from "../../AddUserInfo/src/CommonTools/Function/delTaskData.jsx";
import ButtonGruopOfReviseUserInfo from "./ButtonGruop - reviseUserInfo.jsx";

export default function DisplaySopArea() {
  const [AllsopData, setAllSopData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSop, setSelectedSop] = useState(null);

  function handleAllsopData(data) {
    setAllSopData(data);
  }

  const popFloatingWindow = (data) => {
    setSelectedSop(data);
  };

  const closeFloatingWindow = () => {
    setSelectedSop(null);
  };

  // re-render the updated sop data to DisplaySopArea
  const handleUpdateSop = (
    selectedTaskTypes,
    selectedTaskNames,
    selectedTaskTags,
    addedTaskContent,
    sopId
  ) => {
    selectedTaskTags = selectedTaskTags.map((item) => {
      return { title: item };
    });

    const updatedSop = {
      tasktype: JSON.stringify(selectedTaskTypes),
      taskname: JSON.stringify(selectedTaskNames),
      tasktag: JSON.stringify(selectedTaskTags),
      sop: addedTaskContent,
      sopid: sopId,
    };

    // upadte data to revised sop card
    setAllSopData((prevSopData) =>
      prevSopData.map((sop) => {
        if (sop.sopid === updatedSop.sopid) {
          updatedSop.id = sop.id;
          return updatedSop;
        } else {
          return sop;
        }
      })
    );
  };

  // re-render the delete info to DisplaySopArea
  const handleDeletedSop = (sopId) => {
    // delete sop card
    setAllSopData(
      (prevSopData) =>
        (prevSopData = prevSopData.filter((sop) => sop.sopid !== sopId))
    );
  };

  useEffect(() => {
    // fetch task sops from server
    fetch("http://localhost:3000/getTaskInfos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "zoran",
        requestInfo: {
          requestType: "AllTaskSOP",
        },
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          handleAllsopData(await res.json());
          setIsLoading(false);
        } else {
          throw new Error("Request failed.");
        }
      })
      .catch(console.log);
  }, []);

  // render task sops
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!AllsopData || !AllsopData.length || !AllsopData[0].tasktype) {
    return <div>Error: No data available</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {AllsopData.map((item) => {
        return (
          <Box sx={{ maxWidth: 275, margin: 1 }} key={item.id}>
            <Card variant="outlined">
              <React.Fragment>
                <CardContent sx={{ paddingBottom: "8px" }}>
                  <TaskDisplayField sopData={item}></TaskDisplayField>
                </CardContent>
                <CardActions sx={{ paddingTop: 0 }}>
                  <Button size="small" onClick={() => popFloatingWindow(item)}>
                    Revise
                  </Button>
                  <Button
                    size="small"
                    sx={{ color: "red" }}
                    onClick={() => {
                      delTaskData(item.sopid);
                      handleDeletedSop(item.sopid);
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </React.Fragment>
            </Card>
          </Box>
        );
      })}
      {/* render revise sop floating window */}
      <FloatingWindows isOpen={selectedSop}>
        <BasicUserInputInterface
          title="Saved SOP"
          dataSource="ReviseTask"
          defaultValues={selectedSop}
          AfterSubmit={(
            selectedTaskTypes,
            selectedTaskNames,
            selectedTaskTags,
            addedTaskContent,
            sopId // render props from BasicUserInputInterface
          ) => {
            handleUpdateSop(
              selectedTaskTypes,
              selectedTaskNames,
              selectedTaskTags,
              addedTaskContent,
              sopId
            );
            closeFloatingWindow();
          }}
          AfterCancel={closeFloatingWindow}
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
            <ButtonGruopOfReviseUserInfo
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
      </FloatingWindows>
    </div>
  );
}
