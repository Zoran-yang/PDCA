

export default function CreateReminder(prompts, selectedTaskTypes, selectedTaskNames, selectedTaskTags) {
    for (const element of prompts[selectedTaskTypes.title] || []){ 
        const existingTaskName = element.taskNames === selectedTaskNames.title
        const existingTaskTags = element.taskTags.every(taskTag => {
          return selectedTaskTags?.some(selectedTaskTag => {
            return selectedTaskTag === taskTag.title
          })
        })
        // if the task name and task tags are already in the data, add the task content to the taskContents
        if (existingTaskName && existingTaskTags){  
            element.reminder.forEach(URL => {
                window.open(URL, '_blank')
            });
        }
    }
}