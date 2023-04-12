import {FreeSoloCreateOption} from '../Component/FreeSoloCreateOption.jsx';
import ComboBox from "../Component/Autocomplete.jsx";
import {TaskContentField} from '../Component/TaskContentField.jsx';
import CreateReminder from './CreateReminder.jsx';
import Tags from '../Component/TaskTags.jsx';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import "./App.css"


export default function App(){
  let taskNames, taskTypes, taskTags
  const [selectedTaskTypes, setSelectedTaskTypes] = useState(null);
  const [selectedTaskNames, setSelectedTaskNames] = useState(null);
  // const [selectedTaskPhase, setSelectedTaskPhase] = useState(null);  considering to add concept of phase(timeline)
  const [selectedTaskTags, setSelectedTaskTags] = useState(null);
  const [addedTaskContent, setAddedTaskContent] = useState(null);

  useEffect(() => {
    taskTypes = fetch("http://localhost:3000/getTaskInfos", // get task types from server
    {
      method: 'GET', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : zoran,
          "requestInfo" : {
            "requestType" : "taskTypes",
          }
        }
      )
    })
    .then((res) => res.json())
    .catch(console.log) 

    taskTags = fetch("http://localhost:3000/getTaskInfos",  // get task tags from server
    {
      method: 'GET', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : zoran,
          "requestInfo" : {
            "requestType" : "taskTags",
          }
        }
      )
    })
    .then((res) => res.json())
    .catch(console.log)     
  })
  
  function getTaskNames(newValue){  // get task names from server
    fetch("http://localhost:3000/getTaskInfos",  
    {
      method: 'GET', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : zoran,
          "requestInfo" : {
            "requestType" : "taskNames",
            "taskType" : newValue,
          }
        }
      )
    }
    )
    .then((res) => res.json())
    .catch(console.log)  //intial default value  
  }
  
  function handleSelectedTaskTypes(event, newValue) {
    if (typeof newValue === 'string') {
      setSelectedTaskTypes({
        title: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setSelectedTaskTypes({
        title: newValue.inputValue,
      });
    } else {
      setSelectedTaskTypes(newValue);
    }
    taskNames = getTaskNames(newValue) //When TaskTypes change, taskNames change
  }

  function handleSelectedTaskName(event, newValue) {
    if (typeof newValue === 'string') {
      setSelectedTaskNames({
        title: newValue,
      });
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setSelectedTaskNames({
        title: newValue.inputValue,
      });
    } else {
      setSelectedTaskNames(newValue);
    }
  }

  function handleAddedTaskContent(event, newValue) {
    setAddedTaskContent(event.target.value);
  }

  function handleTaskTags(event, newValue) {
    setSelectedTaskTags(newValue);
  }

  function saveTasksData(
    taskTypes, 
    selectedTaskTypes, 
    taskNames, 
    selectedTaskNames, 
    taskTags, 
    selectedTaskTags, 
    taskContents, 
    addedTaskContent
  ){
    const existingTaskTypes = taskTypes.some(taskType => taskType.title === selectedTaskTypes.title)
    const existingTaskNames = taskNames[selectedTaskTypes.title]?.some(taskName => taskName.title === selectedTaskNames.title) || false
    let IsSaved = false;
    if (!existingTaskTypes){ // if the task type is not in the TaskTypes list, add it
      taskTypes = [...taskTypes, { title: selectedTaskTypes.title}];
    }
    console.log(taskTypes)

    
    if (!existingTaskNames){ // if the task name is not in the TaskNames list, add it
      if (!taskNames[selectedTaskTypes.title]){
        taskNames = {...taskNames, [selectedTaskTypes.title]: [{ title: selectedTaskNames.title}]}
      } else {
        taskNames = {...taskNames, [selectedTaskTypes.title]: [...taskNames[selectedTaskTypes.title], { title: selectedTaskNames.title}]}
      }
    }
    console.log(taskNames)
  
    selectedTaskTags?.forEach(selectedTaskTag => { // if the task tag is not in the taskTag list, add it
      const existingTaskTags = taskTags.some(taskTag => {
        return taskTag.title === selectedTaskTag.inputValue || taskTag.title === selectedTaskTag
      })

      if (!existingTaskTags){
        taskTags.push({ title: selectedTaskTag.inputValue||selectedTaskTag});
      }
    })
    console.log(taskTags)

    for (const element of taskContents[selectedTaskTypes.title] || []){ 
      if (element.taskTags.length !== selectedTaskTags?.length) continue     //finding the intersection of taskTags and selectedTaskTags -1
      const existingTaskName = element.taskNames === selectedTaskNames.title
      const existingTaskTags = element.taskTags.every(taskTag => {           //finding the intersection of taskTags and selectedTaskTags -2
        return selectedTaskTags?.some(selectedTaskTag => {
          return selectedTaskTag === taskTag.title
        })
      })
      // if the task name and task tags are already in the taskContents, add the task content to the taskContents
      if (existingTaskName && existingTaskTags){  
        element.taskContent.push(addedTaskContent);
        IsSaved = true;
        return
      }
    }

    // if the task name and task tags are not in the taskContents, add the task name, task tags and task content to the taskContents
    const newTaskTag =  selectedTaskTags?.map(item =>{
      return {title:item.inputValue||item}
    })

    if (IsSaved === false){  
      if(!taskContents[selectedTaskTypes.title]){ // if the task type is not in the taskContents, add it
        taskContents = {...taskContents, [selectedTaskTypes.title]: [
          {
            taskNames : selectedTaskNames.title,
            taskTags : newTaskTag,
            taskContent : [addedTaskContent]
          }  
        ]}
      } else {
        taskContents = {...taskContents, [selectedTaskTypes.title]: [
          ...taskContents[selectedTaskTypes.title],
          {
            taskNames : selectedTaskNames.title,
            taskTags :newTaskTag,
            taskContent : [addedTaskContent]
          }  
        ]}
      }
    }
    console.log(taskContents)
    window.close()
  }

  return (
    <div>
      <h1 style={{textAlign: "center"}}>My Task</h1>
      <div style={{display:"flex", flexWrap:"wrap"}}>
        <FreeSoloCreateOption 
          labelName="Task Type" 
          taskInfo={taskTypes} 
          selectedstatus={selectedTaskTypes} 
          handleSelectedstatus={handleSelectedTaskTypes}/>
        <FreeSoloCreateOption 
          labelName="Task Name" 
          taskInfo={taskNames[selectedTaskTypes?.title] || [{ title: "No relevent activity."}]} 
          selectedstatus={selectedTaskNames} 
          handleSelectedstatus={handleSelectedTaskName}/>
        {/* <ComboBox taskInfo={taskPhase}/> */}
        <Tags taskInfo={taskTags} handleTaskTags={handleTaskTags}/>
        <TaskContentField handleAddedTaskContent={handleAddedTaskContent}/>
      </div>
      <div style={{
        display:"flex",
        justifyContent:"flex-end",
        flexWrap: "wrap",
        marginRight: 5
      }}>
        <Button 
          id='submit-btn' 
          variant="outlined" 
          sx={{ marginRight: 1}} 
          onClick={()=>{
              saveTasksData(taskTypes, selectedTaskTypes, taskNames, selectedTaskNames, taskTags, selectedTaskTags, taskContents, addedTaskContent)
              CreateReminder(prompts, selectedTaskTypes, selectedTaskNames, selectedTaskTags)
          }}
        >
          Save
        </Button>
        <Button id='cancel-btn' variant="outlined" onClick={()=>window.close()}>cancal</Button>
      </div>
    </div>
  )
}
