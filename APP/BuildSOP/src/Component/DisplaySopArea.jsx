import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';
// import SOPDisplayField from './SOPDisplayField';

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


// data = Object.entries(data[0]).map(([key, value]) => {
//     if (key === 'created_at' || key === 'sopid'){
//         value = value
//     } else if (key === 'tasktype' || key === 'taskname' ) { 
//         value = JSON.parse(value).title
//     }else if (key === 'tasktag') {
//         value = JSON.parse(value).map((item) => item.title)
//     }else {
//         value = JSON.parse(value)
//     }
//     return [key, value];
// })

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
    <TableContainer component={Paper}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                My SOP Panel
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                        key="tasktype"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Task Type
                            </TableCell>
                            <TableCell align="right">
                                {JSON.parse(sopData[0]["tasktype"]).title}
                            </TableCell>
                        </TableRow>
                        <TableRow
                        key="taskname"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Task Name
                            </TableCell>
                            <TableCell align="right">
                                {JSON.parse(sopData[0].taskname).title}
                            </TableCell>
                        </TableRow>
                        <TableRow
                        key="tasktag"
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                Task Tag
                            </TableCell>
                            <TableCell align="right">
                                {JSON.parse(sopData[0].tasktag).map((item) => <Chip label={`${item.title}`} key={`${item.title}`} variant="outlined" />)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    </CardContent>
    <CardActions>
      <Button size="small">Revise</Button>
    </CardActions>
  </React.Fragment>
);



export default function DisplaySopArea() {
    return (
        <React.Fragment>
            <Box sx={{ maxWidth: 275 }}>
                <Card variant="outlined">{card}</Card>
            </Box>
        </React.Fragment>
      );
}

