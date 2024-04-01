import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/truckDriver.png";
import { Button } from "@mui/material";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
export const VehicleCard = ({ vehicles }) => {
  return (
    <div class="  flex  items-center w-full  bg-white border border-gray-200 rounded-lg shadow   hover:bg-gray-200">
      <img
        class="ml-5 mr-5 rounded-md object-cover  rounded-t-lg h-40 w-1/4"
        src={logo}
        alt="logo"
      />
      <div class="flex flex-col justify-between leading-normal">
        <div className="p-6  ">
          <b>
            <h4 className="mb-1">Type :{vehicles.type}</h4>
            <h4 className="mb-1">Registration Number :{vehicles.regNum}</h4>
            <h4 className="mb-1"> STS number :{vehicles.stsId}</h4>
            <h4 className="mb-1">Capacity : {vehicles.capacity}</h4>
            <h4 className="mb-1">
              Fuel cost fully loaded :{vehicles.costLoaded} Liter
            </h4>
            <h4 className="mb-1">
              {" "}
              Fuel cost unloaded :{vehicles.costUnloaded} Liter
            </h4>
            <a href={`/vehicles/${vehicles._id}`}>
              <Button
                variant="contained"
                className="w-24"
                endIcon={<ReadMoreOutlinedIcon />}
              >
                More
              </Button>
            </a>
          </b>
        </div>
      </div>
    </div>
  );
};
