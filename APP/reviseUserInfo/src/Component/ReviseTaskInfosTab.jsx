import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { useEffect, useRef, useState } from "react";
import { Paper } from "@mui/material";

export default function ReviseTaskInfosTab({ value, setValue }) {
  const ref = useRef(null);
  // const [messages, setMessages] = useState(() => refreshMessages());

  useEffect(() => {
    ref.current.ownerDocument.body.scrollTop = 0;
    // setMessages(refreshMessages());
  }, [value]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Task Information"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction label="Task SOP" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
