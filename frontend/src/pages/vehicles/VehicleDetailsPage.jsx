import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import profileImg1 from "./../../assets/truckDriver.png";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { VehiclesForm } from "./VehiclesForm";
import {
  deleteVehicleById,
  getVehicleById,
} from "../../redux/slices/vehiclesSlice";


export const VehiclesDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.vehicles.data[0]);

  console.log("asdfasd", data);

  useEffect(() => {
    dispatch(getVehicleById(id));
  }, [dispatch, id]);

  if (!data) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
    );
  }

  const onDeleteData = () => {
    const isConfirmed = window.confirm("Do you want to delete the vehicles?");
    if (isConfirmed) {
      dispatch(deleteVehicleById(id)).then(() => {
        navigate("/vehicles");
        window.location.reload();
      });
    }
  };

  return (
    <div className=" flex w-full p-10 h-full ">
      <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
        <img className=" rounded-lg" src={profileImg1} alt=""></img>
        <h1 className=" mt-5 font-semibold text-lg text-center ">
          Name: {data.userName}
        </h1>
      </div>
      <div className=" w-3/4 p-5">
        <h1 className=" font-bold text-2xl ml-5">About </h1>
        <div className="pl-6  ">
          <b>
            <h1 className="mb-1">Capacity: {data.capacity}</h1>
            <h4 className="mb-1">Cost Loaded: {data.costLoaded}</h4>
            <h4 className="mb-1">Cost Unloaded: {data.costUnloaded}</h4>
            <h4 className="mb-1">Registration Number: {data.regNum}</h4>
            <h4 className="mb-1">Status ID: {data.stsID}</h4>
            <h4 className="mb-1">Type: {data.type}</h4>
          </b>

          <VehiclesForm update={1} data={data} />


          <div className=" ml-48">
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteData}
              startIcon={<DeleteForeverOutlinedIcon />}
            >
              Delete Vehicles
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
