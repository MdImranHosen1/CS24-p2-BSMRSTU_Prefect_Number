import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import MyMap from "./../../components/MyMap";
import {
  deleteLandfillById,
  getLandfillById,
} from "../../redux/slices/landfullSlice";
import { LandfillForm } from "./LandfillForm";

export const LandfillDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.landfill.data[0]);

  useEffect(() => {
    dispatch(getLandfillById(id));
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

  console.log("data", data);

  const onDeleteData = () => {
    const isConfirmed = window.confirm("Do you want to delete the landfill?");
    if (isConfirmed) {
      dispatch(deleteLandfillById(id)).then(() => {
        navigate("/landfills");
      });
    }
  };

  return (
    <div className="flex w-full p-10 h-full">
      <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
        <MyMap coordinate={data.coordinate} />
      </div>
      <div className="w-3/4 p-5">
        <h1 className="font-bold text-2xl ml-5">About</h1>
        <div className="p-6">
          <b>
            <h1 className="mb-1">Name: {data.name}</h1>
            <h4 className="mb-1">LfId: {data.lfId}</h4>
            <h4 className="mb-1">Capacity: {data.capacity}</h4>
            <h4 className="mb-1">Coordinate: {data.coordinate}</h4>
            <h4 className="mb-1">
              Operation Timespan: {data.operationTimespan}
            </h4>
            <h4 className="mb-1">Manager Id: {data.managerId}</h4>
          </b>

          <LandfillForm update={1} data={data} />

          <div className="ml-44">
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteData}
              startIcon={<DeleteForeverOutlinedIcon />}
            >
              Delete Landfill
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
