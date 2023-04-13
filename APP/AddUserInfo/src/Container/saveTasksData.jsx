

export default function saveTasksData(
    selectedTaskTypes, 
    selectedTaskNames= null, 
    selectedTaskTags= null, 
    addedTaskContent= null,
    setIsMistake
){
  // if any of the input is null, return
  // if (!selectedTaskTypes || !selectedTaskNames || !selectedTaskTags || !addedTaskContent) {
  //   setIsMistake(true)
  //   return
  // }

  let IsSaved = false;
  updateTaskTypes(selectedTaskTypes)
  updateTaskNames(selectedTaskTypes, selectedTaskNames)
  // updateTaskTags(selectedTaskTags)

    // if (!existingTaskNames){ // if the task name is not in the TaskNames list, add it
    //     if (!taskNames[selectedTaskTypes.title]){
    //     taskNames = {...taskNames, [selectedTaskTypes.title]: [{ title: selectedTaskNames.title}]}
    //     } else {
    //     taskNames = {...taskNames, [selectedTaskTypes.title]: [...taskNames[selectedTaskTypes.title], { title: selectedTaskNames.title}]}
    //     }
    // }
    // console.log(taskNames)

    // for (const element of taskContents[selectedTaskTypes.title] || []){ 
    //     if (element.taskTags.length !== selectedTaskTags?.length) continue     //finding the intersection of taskTags and selectedTaskTags -1
    //     const existingTaskName = element.taskNames === selectedTaskNames.title
    //     const existingTaskTags = element.taskTags.every(taskTag => {           //finding the intersection of taskTags and selectedTaskTags -2
    //     return selectedTaskTags?.some(selectedTaskTag => {
    //         return selectedTaskTag === taskTag.title
    //     })
    //     })
    //     // if the task name and task tags are already in the taskContents, add the task content to the taskContents
    //     if (existingTaskName && existingTaskTags){  
    //     element.taskContent.push(addedTaskContent);
    //     IsSaved = true;
    //     return
    //     }
    // }

    // // if the task name and task tags are not in the taskContents, add the task name, task tags and task content to the taskContents
    // const newTaskTag =  selectedTaskTags?.map(item =>{
    //     return {title:item.inputValue||item}
    // })

    // if (IsSaved === false){  
    //     if(!taskContents[selectedTaskTypes.title]){ // if the task type is not in the taskContents, add it
    //     taskContents = {...taskContents, [selectedTaskTypes.title]: [
    //         {
    //         taskNames : selectedTaskNames.title,
    //         taskTags : newTaskTag,
    //         taskContent : [addedTaskContent]
    //         }  
    //     ]}
    //     } else {
    //     taskContents = {...taskContents, [selectedTaskTypes.title]: [
    //         ...taskContents[selectedTaskTypes.title],
    //         {
    //         taskNames : selectedTaskNames.title,
    //         taskTags :newTaskTag,
    //         taskContent : [addedTaskContent]
    //         }  
    //     ]}
    //     }
    // }
    // console.log(taskContents)
    // window.close()
}


function updateTaskTypes(selectedTaskTypes){ 
  selectedTaskTypes = transferTaskInfoForm(selectedTaskTypes)

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

function updateTaskNames(selectedTaskTypes = "工作", selectedTaskNames){
  console.log("selectedTaskTypes",selectedTaskTypes)
  console.log("selectedTaskNames",selectedTaskNames)

  selectedTaskTypes = transferTaskInfoForm(selectedTaskTypes)
  selectedTaskNames = transferTaskInfoForm(selectedTaskNames)
  
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
    element = transferTaskInfoForm(element)

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


function transferTaskInfoForm(taskInfo){
  //three kinds of tags are selected, one is a string, the others are an object. 
  //e.g. "tag1", {"title":tag2} and { inputValue: 'tag3', title: 'Add "tag3"' }
  if (taskInfo.inputValue) {
    taskInfo = {"title":taskInfo.inputValue}
  }else if (typeof(taskInfo) === "string"){
    taskInfo = {"title":taskInfo}
  }
  return taskInfo
}