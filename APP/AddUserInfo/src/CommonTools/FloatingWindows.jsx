import * as React from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';

function FloatingWindow({children, isOpen, closeWindow}) {

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
            width: '50%',
          }}
        >
          {children}
          <IconButton 
          aria-label="delete" 
          size="large" 
          sx={{position: 'absolute', left: '94%', top: '-6%'}}
          onClick={closeWindow}
          >
            <CancelIcon fontSize="inherit" />
          </IconButton>          
          
          <div style={{
          display:"flex",
          justifyContent:"flex-end",
          flexWrap: "wrap",
          marginRight: 5,
          marginTop: 5,}}
          >
              <Button 
              id='submit-btn' 
              variant="outlined" 
              // onClick={()=>{

              // }}
              >
                  Save
              </Button>
          </div>          
        </div>
      )}
    </div>
  );
}

export default FloatingWindow;
