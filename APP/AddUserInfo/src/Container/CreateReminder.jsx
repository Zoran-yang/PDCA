import {taskInfoFormat} from '../CommonTools/taskInfoFormat.jsx'


export default function CreateReminder(selectedTaskTypes, selectedTaskNames, selectedTaskTags) {
    // for (const element of prompts[selectedTaskTypes.title] || []){ 
    //     const existingTaskName = element.taskNames === selectedTaskNames.title
    //     // Union of taskTags and selectedTaskTags
    //     const existingTaskTags = element.taskTags.every(taskTag => {
    //       return selectedTaskTags?.some(selectedTaskTag => {
    //         return selectedTaskTag === taskTag.title
    //       })
    //     })
    //     // if the task name and task tags are already in the data, add the task content to the taskContents
    //     if (existingTaskName && existingTaskTags){  
    //         element.reminder.forEach(URL => {
    //             window.open(URL, '_blank')
    //         });
    //     }
    // }
    selectedTaskTypes = taskInfoFormat(selectedTaskTypes)
    selectedTaskNames = taskInfoFormat(selectedTaskNames)
    selectedTaskTags = taskInfoFormat(selectedTaskTags)

    console.log(selectedTaskTypes)
    console.log(selectedTaskNames)
    console.log(selectedTaskTags)

    fetch("http://localhost:3000/getTaskInfos", // get task types from server
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
                "taskTags" : selectedTaskTags.map(taskTag => taskTag.title),
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
}