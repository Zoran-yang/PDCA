import {taskInfoFormat} from '../../CommonTools/taskInfoFormat.jsx'


export default function CreateReminder(selectedTaskTypes, selectedTaskNames, selectedTaskTags) {
  selectedTaskTypes = taskInfoFormat(selectedTaskTypes)
  selectedTaskNames = taskInfoFormat(selectedTaskNames)
  selectedTaskTags = taskInfoFormat(selectedTaskTags)

  // fetch task sops from server
  fetch("http://localhost:3000/getTaskInfos", 
  {
    method: 'POST', 
    headers : {'Content-Type':'application/json'},
    body : JSON.stringify(
      {
        "id" : "zoran",
        "requestInfo" : {
          "requestType" : "taskSOP",
          "taskType" : selectedTaskTypes,
          "taskName" : selectedTaskNames,
          "taskTags" : selectedTaskTags,
        }
      }
    )
  })
  .then(async(res) => {
    if (res.ok) {
      console.log(await res.json())
      // return handleTaskTypes(await res.json())
    } else {
      throw new Error('Request failed.');
    }})
  .catch(console.log) 

  // create floating window with reminder

}