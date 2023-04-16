

import BasicUserInputInterface from '../CommonTools/BasicUserInputInterface.jsx';
import Reminder from '../Component/CreateReminder/Reminder.jsx';
import "./App.css"

let sopData = 
[{
    id: '10',
    tasktype: '{"title":"工作"}',
    taskname: '{"title":"寫程式"}',
    tasktag: '[{"title":"React"},{"title":"Doing"}]',
    sop: '{"blocks":[{"key":"cn15","text":"https://www.evernote.com/shard/s608/sh/1516c774-9391-1209-4ac9-c356c93f7435/gSVCLsG0ctONe3tBXrJEpExl4tozCaI4SxV2JLF0mhYZhWSjKYMfFcfeoQ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    created_at: "2023-04-14T01:57:47.013Z",
    sopid: 'cc1e4f1a-fe5a-4324-bb99-f730c556b03e'
}]

export default function App(){
  return (
    // <BasicUserInputInterface title = "Task" dataSource = "AddUserInfo" AfterSubmit = {CreateReminder}/>
    <Reminder sopData = {sopData}/>
  )
}

