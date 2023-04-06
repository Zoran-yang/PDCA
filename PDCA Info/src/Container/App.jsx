import {FreeSoloCreateOption} from '../Component/Autocomplete.jsx';
import {TaskContentField} from '../Component/TaskContentField.jsx';
import CreateReminder from './CreateReminder.jsx';
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
    { title: 'Apply jobs' },
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

const prompts = {
  Work : [
      {
        taskNames : 'Writing the code',
        taskTags : [{ title: "Doing" },{ title: "React" }],
        reminder : ['https://www.evernote.com/shard/s608/sh/1516c774-9391-1209-4ac9-c356c93f7435/gSVCLsG0ctONe3tBXrJEpExl4tozCaI4SxV2JLF0mhYZhWSjKYMfFcfeoQ', 
                      'https://www.evernote.com/shard/s608/sh/5a240998-6200-da61-1051-b44c1e14e07d/D1xqCgjUk5fD2sUfoOt_xElSdyUOwoyQNxPqd-raSbamL0WyPIh8yLkQng'
                      ]
      },
      {
        taskNames : 'Apply jobs',
        taskTags : [{ title: "Doing" }],
        reminder : ['https://www.evernote.com/shard/s608/sh/5af1507d-3af3-0988-f68f-433428038f86/oXJlO12snMJL7_Gn-SBi6k1ZTfVO-WNnmEm01yFx4lf97g_hf_cc8Rf3yA']
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
      const existingTaskName = element.taskNames === selectedTaskNames.title
      const existingTaskTags = element.taskTags.every(taskTag => {
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
