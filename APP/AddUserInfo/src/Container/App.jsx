import {FreeSoloCreateOption} from '../Component/FreeSoloCreateOption.jsx';
import ComboBox from "../Component/Autocomplete.jsx";
import {TaskContentField} from '../Component/TaskContentField.jsx';
import CreateReminder from './CreateReminder.jsx';
import Tags from '../Component/TaskTags.jsx';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import saveTasksData from './saveTasksData.jsx';
import "./App.css"


export default function App(){
  let taskNames
  const [selectedTaskTypes, setSelectedTaskTypes] = useState(null);
  const [selectedTaskNames, setSelectedTaskNames] = useState(null);
  // const [selectedTaskPhase, setSelectedTaskPhase] = useState(null);  considering to add concept of phase(timeline)
  const [selectedTaskTags, setSelectedTaskTags] = useState(null);
  const [addedTaskContent, setAddedTaskContent] = useState(null);
  const [taskTypes, setTaskTypes] = useState(null);
  const [taskTags, setTaskTags] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/getTaskInfos", // get task types from server
    {
      method: 'POST', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : "zoran",
          "requestInfo" : {
            "requestType" : "taskTypes",
          }
        }
      )
    })
    .then(async(res) => {
      if (res.ok) {
        return handleTaskTypes(await res.json())
      } else {
        throw new Error('Request failed.');
      }})
    .catch(console.log) 
    

    fetch("http://localhost:3000/getTaskInfos",  // get task tags from server
    {
      method: 'POST', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : "zoran",
          "requestInfo" : {
            "requestType" : "taskTags",
          }
        }
      )
    })
    .then(async(res) => {
      if (res.ok) {
        return handleTaskTags(await res.json())
      } else {
        throw new Error('Request failed.');
      }})
    .catch(console.log)     
  },[])
  
  function getTaskNames(newValue){  // get task names from server
    fetch("http://localhost:3000/getTaskInfos",  
    {
      method: 'POST', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : "zoran",
          "requestInfo" : {
            "requestType" : "taskNames",
            "taskType" : newValue,
          }
        }
      )
    })
    .then(async(res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(await res.json())
        throw new Error('Request failed.');
    }})
    .catch(console.log)  
  }
  
  function handleSelectedTaskTypes(event, newValue) {
    console.log(newValue)
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
    if (!newValue?.title) return
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
    console.log(newValue)
    console.log(selectedTaskNames)
  }

  function handleAddedTaskContent(event, newValue) {
    setAddedTaskContent(event.target.value);
  }

  function handleSelectedTaskTags(event, newValue) {
    console.log(newValue)
    setSelectedTaskTags(newValue);
  }

  function handleTaskTypes(newValue) {
    if(newValue === null) return
    newValue = newValue.map((item) => {
      return JSON.parse(item.tasktype)
    })
    setTaskTypes(newValue);
  }

  function handleTaskTags(newValue) {
    if(!newValue.length) return // if there is no task tags, return
    newValue = newValue.map((item) => {
      return JSON.parse(item.tasktag)
    })
    setTaskTags(newValue);
  }

  return (
    <div>
      <h1 style={{textAlign: "center"}}>My Task</h1>
      <div style={{display:"flex", flexWrap:"wrap"}}>
        <FreeSoloCreateOption 
          labelName="Task Type" 
          taskInfo={taskTypes||JSON.parse(JSON.stringify([{"title": ""}]))}
          selectedstatus={selectedTaskTypes} 
          handleSelectedstatus={handleSelectedTaskTypes}/>
        {/* <FreeSoloCreateOption 
          labelName="Task Name" 
          taskInfo={taskNames || [{ title: ""}]} 
          selectedstatus={selectedTaskNames} 
          handleSelectedstatus={handleSelectedTaskName}/> */}
        {/* <ComboBox taskInfo={taskPhase}/> considering to add concept of phase(timeline) */}  
        <Tags taskInfo={taskTags||JSON.parse(JSON.stringify([{"title": ""}]))} handleSelectedTaskTags={handleSelectedTaskTags}/>
        {/* <TaskContentField handleAddedTaskContent={handleAddedTaskContent}/> */}
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
              saveTasksData(taskTypes, selectedTaskTypes, taskNames, selectedTaskNames, taskTags, selectedTaskTags, addedTaskContent)
              // CreateReminder(prompts, selectedTaskTypes, selectedTaskNames, selectedTaskTags)
          }}
        >
          Save
        </Button>
        <Button id='cancel-btn' variant="outlined" onClick={()=>window.close()}>cancal</Button>
      </div>
    </div>
  )
}
