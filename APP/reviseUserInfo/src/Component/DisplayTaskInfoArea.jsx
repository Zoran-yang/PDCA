import fetchToServer from "../../../AddUserInfo/src/CommonTools/Function/fetchToServer.jsx";
import { useState, useEffect } from "react";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DisplayTasNamesList from "./DisplayTaskNamesList.jsx";
import DisplayTaskTypesList from "./DisplayTaskTypesList.jsx";

export default function DisplayTaskInfoArea() {
  const [AllTaskTypes, setTaskTypes] = useState(null);
  const [AllTaskNames, setTaskNames] = useState(null);
  const [AllTaskTags, setTaskTags] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const allTaskTypesServerResponseHandle = async (res) => {
    if (res.ok) {
      res = await res.json();
      // console.log(res);
      setTaskTypes(res);
    } else {
      throw new Error("Request failed.");
    }
  };

  const allTaskNamesServerResponseHandle = async (res) => {
    if (res.ok) {
      res = await res.json();
      setTaskNames(res);
    } else {
      throw new Error("Request failed.");
    }
  };

  const allTaskTagsServerResponseHandle = async (res) => {
    if (res.ok) {
      res = await res.json();
      // console.log(res); // for debug
      setTaskTags(res);
    } else {
      throw new Error("Request failed.");
    }
  };

  useEffect(() => {
    // fetch task sops from server
    let getAllInfoPromise = [
      fetchToServer(
        "getTaskInfos",
        {
          id: "zoran",
          requestInfo: {
            requestType: "AllTaskTypes",
          },
        },
        allTaskTypesServerResponseHandle
      ),
      fetchToServer(
        "getTaskInfos",
        {
          id: "zoran",
          requestInfo: {
            requestType: "AllTaskNames",
          },
        },
        allTaskNamesServerResponseHandle
      ),
      fetchToServer(
        "getTaskInfos",
        {
          id: "zoran",
          requestInfo: {
            requestType: "AllTaskTags",
          },
        },
        allTaskTagsServerResponseHandle
      ),
    ];
    Promise.all(getAllInfoPromise)
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("DisplayTaskInfoArea", "useEffect", err);
      });
  }, []);

  // render task infos
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (!AllsopData || !AllsopData.length || !AllsopData[0].tasktype) {
  //   return <div>Error: No data available</div>;
  // }

  return (
    // <div>
    //   <Accordion
    //     expanded={expanded === "panel1"}
    //     onChange={handleChange("panel1")}
    //   >
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel1bh-content"
    //       id="panel1bh-header"
    //     >
    //       <Typography sx={{ width: "33%", flexShrink: 0 }}>
    //         Task Types
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
    //         Aliquam eget maximus est, id dignissim quam.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion
    //     expanded={expanded === "panel2"}
    //     onChange={handleChange("panel2")}
    //   >
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel2bh-content"
    //       id="panel2bh-header"
    //     >
    //       <Typography sx={{ width: "33%", flexShrink: 0 }}>
    //         Task Names
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Donec placerat, lectus sed mattis semper, neque lectus feugiat
    //         lectus, varius pulvinar diam eros in elit. Pellentesque convallis
    //         laoreet laoreet.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    //   <Accordion
    //     expanded={expanded === "panel3"}
    //     onChange={handleChange("panel3")}
    //   >
    //     <AccordionSummary
    //       expandIcon={<ExpandMoreIcon />}
    //       aria-controls="panel3bh-content"
    //       id="panel3bh-header"
    //     >
    //       <Typography sx={{ width: "33%", flexShrink: 0 }}>
    //         Task Tags
    //       </Typography>
    //       <Typography sx={{ color: "text.secondary" }}>
    //         Filtering has been entirely disabled for whole web server
    //       </Typography>
    //     </AccordionSummary>
    //     <AccordionDetails>
    //       <Typography>
    //         Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
    //         sit amet egestas eros, vitae egestas augue. Duis vel est augue.
    //       </Typography>
    //     </AccordionDetails>
    //   </Accordion>
    // </div>
    <>
      <DisplayTasNamesList data={AllTaskNames} />
      <h1>YOO</h1>
      <DisplayTaskTypesList data={AllTaskTypes} />
    </>
  );
}
