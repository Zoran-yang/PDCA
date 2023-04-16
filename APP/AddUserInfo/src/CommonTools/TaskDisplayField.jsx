import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip } from '@mui/material';



export default function TaskDisplayField({sopData, children}){
    let childrenData = JSON.parse(sopData[0].sop)
    return (
        <>
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
                {children(childrenData)}
            </TableContainer>
        </>
    );    
}