import {FreeSoloCreateOption} from '../Component/FreeSoloCreateOption.jsx';
import ComboBox from "../Component/Autocomplete.jsx";
// import {TaskContentField} from '../Component/TaskContentField.jsx';
import CreateReminder from './CreateReminder.jsx';
import {EditorState, convertToRaw} from 'draft-js'
import Tags from '../Component/TaskTags.jsx';
import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import saveTasksData from './saveTasksData.jsx';
import getTaskNames from './getTaskNames.jsx';
import TaskContentField from "../../../BuildSOP/src/CreateSOP.jsx";
import "./App.css"


export default function App(){
  const [selectedTaskTypes, setSelectedTaskTypes] = useState(null);
  const [selectedTaskNames, setSelectedTaskNames] = useState(null);
  // const [selectedTaskPhase, setSelectedTaskPhase] = useState(null);  considering to add concept of phase(timeline)
  const [selectedTaskTags, setSelectedTaskTags] = useState(null);
  const [addedTaskContent, setAddedTaskContent] = useState(() => EditorState.createEmpty());
  const [taskTypes, setTaskTypes] = useState(null);
  const [taskTags, setTaskTags] = useState(null);
  const [taskNames, setTaskNames] = useState(null);
  const [isMistake, setIsMistake] = useState(false);

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
    if (!newValue?.title) return
    getTaskNames(newValue, handleTaskNames) //When TaskTypes change, taskNames change
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

  function handleAddedTaskContent(event, newEditorState) {
    console.log(JSON.stringify(convertToRaw(taskSOP.getCurrentContent())))
    setAddedTaskContent(newEditorState);
  }

  function handleSelectedTaskTags(event, newValue) {
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

  function handleTaskNames(newValue) {
    
    if(newValue === null) return
    newValue = newValue.map((item) => {
      return JSON.parse(item.taskname)
    })
    setTaskNames(newValue);
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
        <FreeSoloCreateOption 
          labelName="Task Name" 
          taskInfo={taskNames || [{ title: ""}]} 
          selectedstatus={selectedTaskNames} 
          handleSelectedstatus={handleSelectedTaskName}/>
        {/* <ComboBox taskInfo={taskPhase}/> considering to add concept of phase(timeline) */}  
        <Tags 
          taskInfo={taskTags||JSON.parse(JSON.stringify([{"title": ""}]))} 
          handleSelectedTaskTags={handleSelectedTaskTags} 
          selectedTaskTags={selectedTaskTags}
        />
        <TaskContentField handleTaskSOP={handleAddedTaskContent} editorState={addedTaskContent}/>
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
              saveTasksData(selectedTaskTypes, selectedTaskNames, selectedTaskTags, addedTaskContent, setIsMistake)
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
