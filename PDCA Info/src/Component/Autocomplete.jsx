

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({taskInfo}) {
  return (
    <Autocomplete
      disablePortal
      options={taskInfo}
      sx={{ margin: 1, width: "100%"}}
      renderInput={(params) => <TextField {...params} label="TaskPhase" />}
    />
  );
}