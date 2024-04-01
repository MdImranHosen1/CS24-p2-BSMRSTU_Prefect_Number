import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import dhaka from "../../assets/dhaka1.jpg";

export const HomePage = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box>
        <div className=" h-screen bg-slate-300">
          <img className=" h-screen w-screen" src={dhaka} alt="Dhaka" />
        </div>
      </Box>
    </React.Fragment>
  );
};
