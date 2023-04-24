import { convertToRaw } from "draft-js";
import { taskInfoFormat } from "./taskInfoFormat.jsx";
import { v4 as uuidv4 } from "uuid";
import fetchToServer from "./fetchToServer.jsx";

export default function saveTasksData(
  dataSource,
  selectedTaskTypes,
  selectedTaskNames,
  selectedTaskTags,
  richEditorInput,
  sopId,
  setIsMistake
) {
  // if any of the input is null, return
  if (!selectedTaskTypes || !selectedTaskNames) {
    setIsMistake("task type or task name is empty");
    return;
  }
  setIsMistake(false);

  switch (dataSource) {
    case "AddUserInfo":
      updateTaskTypes(selectedTaskTypes);
      // updateTaskNames(selectedTaskTypes, selectedTaskNames);
      // updateTaskTags(selectedTaskTags);
      // updateTaskContent(
      //   selectedTaskTypes,
      //   selectedTaskNames,
      //   selectedTaskTags,
      //   richEditorInput
      // );
      break;
    case "BuildSOP":
      updateTaskTypes(selectedTaskTypes);
      updateTaskNames(selectedTaskTypes, selectedTaskNames);
      updateTaskTags(selectedTaskTags);
      updateTaskSOP(
        selectedTaskTypes,
        selectedTaskNames,
        selectedTaskTags,
        richEditorInput
      );
      break;
    case "ReviseTask":
      // type, name, tag should also be updated, because user may add new type, name, tag.
      updateTaskTypes(selectedTaskTypes);
      updateTaskNames(selectedTaskTypes, selectedTaskNames);
      updateTaskTags(selectedTaskTags);
      reviseSop(
        sopId,
        selectedTaskTypes,
        selectedTaskNames,
        selectedTaskTags,
        richEditorInput
      );
  }

  console.log("saved");
}

function updateTaskTypes(selectedTaskTypes) {
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes);

  // update info to db of "tasktypes"
  fetchToServer("updateTaskInfos", {
    id: "zoran",
    updatedInfo: {
      requestType: "taskTypes",
      taskType: selectedTaskTypes,
    },
  });
}

function updateTaskNames(selectedTaskTypes, selectedTaskNames) {
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes);
  selectedTaskNames = taskInfoFormat(selectedTaskNames);

  fetchToServer("updateTaskInfos", {
    id: "zoran",
    updatedInfo: {
      requestType: "taskNames",
      taskType: selectedTaskTypes,
      taskName: selectedTaskNames,
    },
  });
}

function updateTaskTags(selectedTaskTags) {
  let promises = [];
  //multiple tags are selected and saved as an array
  for (let element of selectedTaskTags || []) {
    element = taskInfoFormat(element);

    promises.push(
      fetchToServer("updateTaskInfos", {
        id: "zoran",
        updatedInfo: {
          requestType: "taskTags",
          TaskTag: element,
        },
      })
    );
  }
  Promise.all(promises).catch((error) => console.log("Error" + error));
}

function translateRichEditor(input) {
  // console.log(JSON.stringify(convertToRaw(input.getCurrentContent())))
  return convertToRaw(input.getCurrentContent());
}

function updateTaskContent(
  selectedTaskTypes,
  selectedTaskNames,
  selectedTaskTags,
  richEditorInput
) {
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes);
  selectedTaskNames = taskInfoFormat(selectedTaskNames);
  selectedTaskTags = taskInfoFormat(selectedTaskTags);
  richEditorInput = translateRichEditor(richEditorInput);

  let promises = [];
  let sopId = uuidv4();
  // if no tag is selected, save as "null"
  if (selectedTaskTags.length === 0) {
    fetchToServer("updateTaskInfos", {
      id: "zoran",
      updatedInfo: {
        requestType: "taskContent",
        taskType: selectedTaskTypes,
        taskName: selectedTaskNames,
        taskTag: selectedTaskTags,
        taskContent: richEditorInput,
        detailId: sopId,
      },
    });
  }
  //multiple tags are selected and saved as an array
  for (let element of selectedTaskTags || []) {
    promises.push(
      // update info to db of "taskcontent"
      fetchToServer("updateTaskInfos", {
        id: "zoran",
        updatedInfo: {
          requestType: "taskContent",
          taskType: selectedTaskTypes,
          taskName: selectedTaskNames,
          taskTag: element,
          taskContent: richEditorInput,
          detailId: sopId,
        },
      })
    );
  }
  Promise.all(promises).catch((error) => console.log("Error" + error));
}

function updateTaskSOP(
  selectedTaskTypes,
  selectedTaskNames,
  selectedTaskTags,
  richEditorInput
) {
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes);
  selectedTaskNames = taskInfoFormat(selectedTaskNames);
  selectedTaskTags = taskInfoFormat(selectedTaskTags);
  richEditorInput = translateRichEditor(richEditorInput);

  // update info to db of "taskcontent"
  fetchToServer(
    "updateTaskInfos",
    {
      id: "zoran",
      updatedInfo: {
        requestType: "TaskSOP",
        taskType: selectedTaskTypes,
        taskName: selectedTaskNames,
        taskTag: selectedTaskTags,
        sop: richEditorInput,
        sopId: uuidv4(),
      },
    },
    (serverResponseHandle = async () => {
      setIsMistake(false);
      return res.json();
    }),
    (serverErrorHandle = async () => {
      res = await res.json();
      if ((res = "SOP already exist, please revise your SOP infomation")) {
        //if SOP already exist, set error message
        setIsMistake("SOP already exist, please revise your SOP infomation");
      }
      throw new Error("Request failed.");
    })
  );
}

function reviseSop(
  sopId,
  revisedTaskTypes,
  revisedTaskNames,
  revisedTaskTags,
  revisedRichEditorInput
) {
  revisedTaskTypes = taskInfoFormat(revisedTaskTypes);
  revisedTaskNames = taskInfoFormat(revisedTaskNames);
  revisedTaskTags = taskInfoFormat(revisedTaskTags);
  revisedRichEditorInput = translateRichEditor(revisedRichEditorInput);

  fetchToServer(
    "reviseTaskInfos",
    {
      id: "zoran",
      revisedInfo: {
        requestType: "TaskSOP",
        sopId: sopId,
        taskType: revisedTaskTypes,
        taskName: revisedTaskNames,
        taskTag: revisedTaskTags,
        sop: revisedRichEditorInput,
      },
    },
    (serverResponseHandle = async () => {
      setIsMistake(false);
      return res.json();
    }),
    (serverErrorHandle = async () => {
      res = await res.json();
      if ((res = "SOP already exist, please revise it directly")) {
        //if SOP already exist, set error message
        setIsMistake("SOP already exist, please revise it directly");
      }
      throw new Error("Request failed.");
    })
  );
}
