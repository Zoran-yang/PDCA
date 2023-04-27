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
import { CompositeDecorator, EditorState, convertToRaw } from "draft-js";
import delTaskData from "../../AddUserInfo/src/CommonTools/Function/delTaskData.jsx";

// Change LINKS format
const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};
const Link = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      style={{ color: "blue", fontStyle: "italic" }}
      href={url}
      target="_blank"
    >
      {props.children}
    </a>
  );
};

const strategyDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

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
        />
      </FloatingWindows>
    </div>
  );
}
