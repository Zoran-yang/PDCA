import {FreeSoloCreateOption} from '../Component/Autocomplete.jsx';
import {TaskContentField} from '../Component/TaskContentField.jsx';
import Tags from '../Component/TaskTags.jsx';
import {useState} from 'react';
import Button from '@mui/material/Button';
import "./App.css"

const taskTypes = [
  { title: 'Work'},
  { title: 'Sleep'},
  { title: 'Play' },
  { title: 'Eat' },
];


const taskNames = {
  Work: [
    { title: 'Writing the code' },
    { title: 'SS' },
  ] ,
  Sleep:[
    { title: 'Sleep-A' },
    { title: 'Sleep-S' },
  ]
};

const taskTags = [
  { title: "Planning" },
  { title: "Doing" },
  { title: "Checking" },
  { title: "Acting" },
  { title: "None" },
  { title: "React" }
];

const taskContents = {
  Work : [
    {
      taskNames : 'Writing the code',
      taskTags : [{ title: "Planning" },{ title: "React" }],
      taskContent : ['Planning the code structure', 'Writing the notification function']
    },
    {
      taskNames : 'Apply jobs',
      taskTags : [{ title: "Doing" }],
      taskContent : ['Writing the resume', 'Writing the cover letter']
    },
  ]
}







export default function App(){
  const [selectedTaskTypes, setSelectedTaskTypes] = useState({ title: 'Work'});
  const [selectedTaskNames, setSelectedTaskNames] = useState(null);
  const [selectedTaskTags, setSelectedTaskTags] = useState(null);
  const [addedTaskContent, setAddedTaskContent] = useState(null);
  
  
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

  function saveTasksData(taskTypes, selectedTaskTypes, taskNames, selectedTaskNames, taskTags, selectedTaskTags, taskContents, addedTaskContent){
    
    const existingTaskTypes = taskTypes.some(taskType => taskType.title === selectedTaskTypes.title)
    const existingTaskNames = taskNames[selectedTaskTypes?.title]?.some(taskName => taskName.title === selectedTaskNames.title) || false
    let IsSaved = false;
    if (!existingTaskTypes){ // if the task type is not in the TaskTypes list, add it
      taskTypes = [...taskTypes, { title: selectedTaskTypes.title}];
    }
    
    console.log(taskNames[selectedTaskTypes.title])
    console.log(selectedTaskNames.title)
    if (!existingTaskNames){ // if the task name is not in the TaskNames list, add it
      if (!taskNames[selectedTaskTypes.title]){
        taskNames = {...taskNames, [selectedTaskTypes.title]: [{ title: selectedTaskNames.title}]}
      }
      taskNames[selectedTaskTypes.title] = [...taskNames[selectedTaskTypes.title], { title: selectedTaskNames.title}];
    }

    
  
    selectedTaskTags?.forEach(selectedTaskTag => { // if the task tag is not in the taskTag list, add it
      if (!taskTags?.some(taskTag => taskTag.title === selectedTaskTag.title)){
        taskTags?.push({ title: selectedTaskTag });
      }
    })

    for (const element of taskContents[selectedTaskTypes?.title] || []){ 
      const existingTaskName = element.taskNames === selectedTaskNames.title
      const existingTaskTags = element.taskTags.every(taskTag => {
        return selectedTaskTags.some(selectedTaskTag => {
          return selectedTaskTag === taskTag.title
        })
      })
      // if the task name and task tags are already in the taskContents, add the task content to the taskContents
      console.log(existingTaskName, existingTaskTags)
      if (existingTaskName && existingTaskTags){  
        element.taskContent.push(addedTaskContent);
        IsSaved = true;
        console.log(taskContents)
        return
      }
    }

    // if the task name and task tags are not in the taskContents, add the task name, task tags and task content to the taskContents
    // if (IsSaved === false){   
    //   taskContents[selectedTaskTypes?.title].push(
    //     {
    //       taskNames : selectedTaskNames.title,
    //       taskTags : selectedTaskTags,
    //       taskContent : [addedTaskContent]
    //     }
    //   )
    // }
    console.log(taskContents)
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
        <Tags taskInfo={taskTags} handleTaskTags={handleTaskTags}/>
        <TaskContentField handleAddedTaskContent={handleAddedTaskContent}/>
      </div>
      <div style={{
        display:"flex",
        justifyContent:"flex-end",
        flexWrap: "wrap",
        marginRight: 5
      }}>
        <Button variant="outlined" sx={{ marginRight: 1}} onClick={()=>saveTasksData(taskTypes, selectedTaskTypes, taskNames, selectedTaskNames, taskTags, selectedTaskTags, taskContents, addedTaskContent)}>Save</Button>
        <Button variant="outlined">cancal</Button>
      </div>
    </div>
  )
}
