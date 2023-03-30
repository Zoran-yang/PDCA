import {FreeSoloCreateOption} from '../Component/Autocomplete.jsx';
import {TaskContent} from '../Component/TaskContent.jsx';
import "./App.css"

const taskTypes = [
  { title: 'Work' },
  { title: 'Sleep' },
  { title: 'Play' },
  { title: 'Eat' },
];

const taskPhases = [
  { title: 'Planning' },
  { title: 'Do' },
  { title: 'Check' },
  { title: 'Action' },
  { title: 'None' },
];

const taskName = [
  { title: 'AA' },
  { title: 'SS' },
  { title: 'EEE' },
];

export default function App(){
  return (
    <div>
      <h1 style={{textAlign: "center"}}>My Task</h1>
      <div style={{display:"flex", flexWrap:"nowrap"}}>
        <FreeSoloCreateOption labelName="Task Type" taskInfo={taskTypes}/>
        <FreeSoloCreateOption labelName="Task Phase" taskInfo={taskPhases}/>
        <FreeSoloCreateOption labelName="Task Name" taskInfo={taskPhases}/>
        <TaskContent/>
      </div>
    </div>
  )
}
