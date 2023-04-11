import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export function TaskContentField({handleAddedTaskContent}) {
    return (
      <TextField
        id="outlined-multiline-static"
        label="What am I doing"
        multiline
        rows={4}
        sx={{margin: 1,  width: "100%"}}
        onChange={handleAddedTaskContent}
      />
    )
}