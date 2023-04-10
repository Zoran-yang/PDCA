
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';


const filter = createFilterOptions();

//For revising data source, I takes useStates as parameters from parent component.
export function FreeSoloCreateOption({labelName, taskInfo, selectedstatus, handleSelectedstatus}) {

  return (
    <Autocomplete
        value={selectedstatus}
        onChange={handleSelectedstatus}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.title);
            if (inputValue !== '' && !isExisting) {
                filtered.push({
                    inputValue,
                    title: `Add "${inputValue}"`,
                });
            }

            return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={taskInfo}
        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
                return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
                return option.inputValue;
            }
            // Regular option
            return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ margin: 1, width: "100%"}}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label={labelName} />
        )}
    />
  );
}