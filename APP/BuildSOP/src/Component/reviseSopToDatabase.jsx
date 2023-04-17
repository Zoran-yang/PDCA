
export default function reviseSopToDatabase(sopId, revisedTaskTypes, revisedTaskNames, revisedTaskTags, revisedRichEditorInput){
    fetch("http://localhost:3000/reviseTaskInfos", 
    {
      method: 'PATCH', 
      headers : {'Content-Type':'application/json'},
      body : JSON.stringify(
        {
          "id" : "zoran",
          "revisedInfo" : {
            "requestType" : "TaskSOP",
            "sopId" : sopId,
            "taskType" : revisedTaskTypes,
            "taskName" : revisedTaskNames,
            "taskTag" : revisedTaskTags,
            "sop" : revisedRichEditorInput,
          }
      })
    })
    .then(async(res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(await res.json())
        throw new Error('Request failed.');
      }
    })
    .catch((error) => {
      console.log(error);
    }) 
}