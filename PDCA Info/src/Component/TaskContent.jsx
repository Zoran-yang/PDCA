import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function TaskContent() {
    return (
        <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
        defaultValue="Default Value"
      />
    )
}