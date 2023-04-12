import {FreeSoloCreateOption} from '../../../PDCA Info/src/Component/FreeSoloCreateOption.jsx';
import {TaskContentField} from '../../../PDCA Info/src/Component/TaskContentField.jsx';
import {EditorState, convertToRaw} from 'draft-js'
import Tags from '../../../PDCA Info/src/Component/TaskTags.jsx';
import CreateSOP from '../CreateSOP.jsx';
import {useState} from 'react';
import Button from '@mui/material/Button';


// const taskPhase = [
//   "Plan", "Do", "Check", "Act"
// ];


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
  { title: "React" },
  { title: "None" },
];



const prompts = {
  Work : [
    {
      taskNames : 'Practice the interview code questions',
      taskTags : [{ title: "Planning" }],

    },
    {
      taskNames : 'Writing the code',
      taskTags : [{ title: "Planning" }],

    },
    {
      taskNames : 'Writing the code',
      taskTags : [{ title: "Doing" },{ title: "React" }],

    },
    {
      taskNames : 'Writing the code',
      taskTags : [{ title: "Checking" },{ title: "React" }],

    },
    {
      taskNames : 'Writing the code',
      taskTags : [{ title: "Doing" },{ title: "React" }],

    },
    {
      taskNames : 'Apply jobs',
      taskTags : [{ title: "Doing" }],
    
    },
  ]
}


export default function App(){
  const [selectedTaskTypes, setSelectedTaskTypes] = useState({ title: 'Work'});
  const [selectedTaskNames, setSelectedTaskNames] = useState(null);
  // const [selectedTaskPhase, setSelectedTaskPhase] = useState(null);
  const [selectedTaskTags, setSelectedTaskTags] = useState(null);
  const [taskSOP, setTaskSOP] = useState(() => EditorState.createEmpty());
  
  
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

  function handleTaskTags(event, newValue) {
    setSelectedTaskTags(newValue);
  }

  function handleTaskSOP(newEditorState) {
    console.log(JSON.stringify(convertToRaw(taskSOP.getCurrentContent())))
    setTaskSOP(newEditorState);
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
            sop : [addedTaskContent]
          }  
        ]}
      } else {
        taskContents = {...taskContents, [selectedTaskTypes.title]: [
          ...taskContents[selectedTaskTypes.title],
          {
            taskNames : selectedTaskNames.title,
            taskTags :newTaskTag,
            sop : [addedTaskContent]
          }  
        ]}
      }
    }
    console.log(taskContents)
    window.close()
  }

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Build My SOP</h1>
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
        <CreateSOP handleTaskSOP={handleTaskSOP} editorState={taskSOP}/>
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
            saveTasksData(taskTypes, selectedTaskTypes, taskNames, selectedTaskNames, taskTags, selectedTaskTags, prompts, JSON.stringify(convertToRaw(taskSOP.getCurrentContent())))
          }}
        >
          Save
        </Button>
        <Button id='cancel-btn' variant="outlined" onClick={()=>window.close()}>cancal</Button>
      </div>
    </div>
  )
}
