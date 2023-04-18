
import {convertToRaw} from 'draft-js'
import {taskInfoFormat} from './taskInfoFormat.jsx'
import { v4 as uuidv4 } from 'uuid';

export default function saveTasksData(
    dataSource,
    selectedTaskTypes,  
    selectedTaskNames, 
    selectedTaskTags, 
    richEditorInput,
    sopId,
    setIsMistake
){
  // if any of the input is null, return
  // if (!selectedTaskTypes || !selectedTaskNames || !selectedTaskTags || !richEditorInput) {
  //   setIsMistake(true)
  //   return
  // }
  
  switch (dataSource) {
    case "AddUserInfo":
      updateTaskTypes(selectedTaskTypes)
      updateTaskNames(selectedTaskTypes, selectedTaskNames)
      updateTaskTags(selectedTaskTags)
      updateTaskContent(selectedTaskTypes, selectedTaskNames, selectedTaskTags, richEditorInput)
      break;
    case "BuildSOP":
      updateTaskTypes(selectedTaskTypes)
      updateTaskNames(selectedTaskTypes, selectedTaskNames)
      updateTaskTags(selectedTaskTags)
      updateTaskSOP(selectedTaskTypes, selectedTaskNames, selectedTaskTags, richEditorInput)
      break;
    case "ReviseTask":
      // type, name, tag should also be updated, because user may add new type, name, tag.
      updateTaskTypes(selectedTaskTypes)
      updateTaskNames(selectedTaskTypes, selectedTaskNames)
      updateTaskTags(selectedTaskTags)
      reviseSop(sopId, selectedTaskTypes, selectedTaskNames, selectedTaskTags, richEditorInput)

  }
  console.log("saved")
}




function updateTaskTypes(selectedTaskTypes){ 
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes)

  // update info to db of "tasktypes"  
  fetch("http://localhost:3000/updateTaskInfos", 
  {
    method: 'PATCH', 
    headers : {'Content-Type':'application/json'},
    body : JSON.stringify(
      {
        "id" : "zoran",
        "updatedInfo" : {
          "requestType" : "taskTypes",
          "taskType" : selectedTaskTypes,
        }
    })
  })
  .then(async(res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(await res.json())
      throw new Error('Request failed.');
    }
  })
  .catch((error) => {
    console.log(error);
  })             
}

function updateTaskNames(selectedTaskTypes, selectedTaskNames){
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes)
  selectedTaskNames = taskInfoFormat(selectedTaskNames)
  
  fetch("http://localhost:3000/updateTaskInfos", 
  {
    method: 'PATCH', 
    headers : {'Content-Type':'application/json'},
    body : JSON.stringify(
      {
        "id" : "zoran",
        "updatedInfo" : {
          "requestType" : "taskNames",
          "taskType" : selectedTaskTypes,
          "taskName" : selectedTaskNames,
        }
      }
    )
  })
  .then((res) => res.json())
  .catch(console.log)
}

function updateTaskTags(selectedTaskTags){
  let promises = [];
  //multiple tags are selected and saved as an array
  for (let element of selectedTaskTags || []){  
    element = taskInfoFormat(element)

    promises.push(
    fetch("http://localhost:3000/updateTaskInfos", 
    {
      method: 'PATCH', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : "zoran",
          "updatedInfo" : {
            "requestType" : "taskTags",
            "TaskTag" : element,
          }
        }
      )
    }))
  }
  Promise.all(promises).catch((error)=>console.log("Error" + error))
}


function translateRichEditor(input){
  // console.log(JSON.stringify(convertToRaw(input.getCurrentContent())))
  return convertToRaw(input.getCurrentContent())
}

function updateTaskContent(selectedTaskTypes, selectedTaskNames, selectedTaskTags, richEditorInput){ 
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes) 
  selectedTaskNames = taskInfoFormat(selectedTaskNames) 
  selectedTaskTags = taskInfoFormat(selectedTaskTags) 
  richEditorInput = translateRichEditor(richEditorInput) 
  let promises = []; 
  let sopId = uuidv4() 
  //multiple tags are selected and saved as an array 
  for (let element of selectedTaskTags || []){   
    promises.push( 
      // update info to db of "taskcontent"   
      fetch("http://localhost:3000/updateTaskInfos",  
      { 
        method: 'PATCH',  
        headers : {'Content-Type':'application/json'}, 
        body : JSON.stringify( 
          { 
            "id" : "zoran", 
            "updatedInfo" : { 
              "requestType" : "taskContent", 
              "taskType" : selectedTaskTypes, 
              "taskName" : selectedTaskNames, 
              "taskTag" : element, 
              "taskContent" : richEditorInput, 
              "detailId" : sopId, 
            } 
        }) 
      }) 
    ) 
  } 
  Promise.all(promises).catch((error)=>console.log("Error" + error))   
} 

function updateTaskSOP(selectedTaskTypes, selectedTaskNames, selectedTaskTags, richEditorInput){
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes)
  selectedTaskNames = taskInfoFormat(selectedTaskNames)
  selectedTaskTags = taskInfoFormat(selectedTaskTags)
  richEditorInput = translateRichEditor(richEditorInput)
  console.log("updateTaskSOP")
  
  // update info to db of "taskcontent"  
  fetch("http://localhost:3000/updateTaskInfos", 
  {
    method: 'PATCH', 
    headers : {'Content-Type':'application/json'},
    body : JSON.stringify(
      {
        "id" : "zoran",
        "updatedInfo" : {
          "requestType" : "TaskSOP",
          "taskType" : selectedTaskTypes,
          "taskName" : selectedTaskNames,
          "taskTag" : selectedTaskTags,
          "sop" : richEditorInput,
          "sopId" : uuidv4(),
        }
    })
  })
  .then(async(res) => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error('Request failed.');
    }})
  .catch(console.log) 
}


function reviseSop(sopId, revisedTaskTypes, revisedTaskNames, revisedTaskTags, revisedRichEditorInput){
  revisedTaskTypes = taskInfoFormat(revisedTaskTypes)
  revisedTaskNames = taskInfoFormat(revisedTaskNames)
  revisedTaskTags = taskInfoFormat(revisedTaskTags)
  revisedRichEditorInput = translateRichEditor(revisedRichEditorInput)
  
  fetch("http://localhost:3000/reviseTaskInfos", 
  {
    method: 'PATCH', 
    headers : {'Content-Type':'application/json'},
    body : JSON.stringify(
      {
        "id" : "zoran",
        "revisedInfo" : {
          "requestType" : "TaskSOP",
          "sopId" : sopId,
          "taskType" : revisedTaskTypes,
          "taskName" : revisedTaskNames,
          "taskTag" : revisedTaskTags,
          "sop" : revisedRichEditorInput,
        }
    })
  })
  .then(async(res) => {
    if (res.ok) {
      return res.json();
    } else {
      console.log(await res.json())
      throw new Error('Request failed.');
    }
  })
  .catch((error) => {
    console.log(error);
  }) 
}

