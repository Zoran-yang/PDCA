import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TaskDisplayField from "../../AddUserInfo/src/CommonTools/TaskDisplayField"
import { useEffect, useState } from 'react';
import FloatingWindows from "../../AddUserInfo/src/CommonTools/floatingWindows"
import BasicUserInputInterface from "../../AddUserInfo/src/CommonTools/BasicUserInputInterface.jsx"




export default function DisplaySopArea() {
    const [AllsopData, setAllSopData] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSop, setSelectedSop] = useState(null);
    
    function handleAllsopData(data) {
        setAllSopData(data)
    }

    const popWindow = (data) => {
        setSelectedSop(data);
    };

    const closeWindow = () => {
        setSelectedSop(null);
    }

    useEffect(() => {
        // fetch task sops from server
        fetch("http://localhost:3000/getTaskInfos", 
        {
          method: 'POST', 
          headers : {'Content-Type':'application/json'},
          body : JSON.stringify(
            {
              "id" : "zoran",
              "requestInfo" : {
                "requestType" : "AllTaskSOP",
              }
            }
          )
        })
        .then(async(res) => {
          if (res.ok) {
            handleAllsopData(await res.json())
            setIsLoading(false);
          } else {
            throw new Error('Request failed.');
          }})
        .catch(console.log) 
    },[])    

    // render task sops
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (!AllsopData || !AllsopData.length || !AllsopData[0].tasktype) {
        return <div>Error: No data available</div>;
    }


    return (
        <div style={{display:"flex", flexWrap:"wrap"}}>
            {AllsopData.map((item) => {
                return (
                    <Box sx={{ maxWidth: 275, margin:1}} key={item.id}>
                        <Card variant="outlined">
                            <React.Fragment>
                                <CardContent>
                                    <TaskDisplayField sopData={item}></TaskDisplayField>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={()=>popWindow(item)}>Revise</Button>
                                </CardActions>
                            </React.Fragment>                    
                        </Card>
                    </Box>
                )
            })}
            <FloatingWindows isOpen={selectedSop} closeWindow={closeWindow} >
                <BasicUserInputInterface 
                title = "Saved SOP" 
                dataSource = "ReviseTask" 
                defaultValues = {selectedSop} 
                AfterSubmit={closeWindow} 
                AfterCancel={closeWindow}
                />
            </FloatingWindows>
        </div>
    );
}


