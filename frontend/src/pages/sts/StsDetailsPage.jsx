import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { StsForm } from "./StsForm";
import { deleteStsById, getStsById } from "../../redux/slices/stsSlice";
import MyMap from "./../../components/MyMap";

export const StsDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.sts.data[0]);

  useEffect(() => {
    dispatch(getStsById(id));
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
    const isConfirmed = window.confirm("Do you want to delete the sts?");
    if (isConfirmed) {
      dispatch(deleteStsById(id)).then(() => {
        navigate("/sts");
        window.location.reload();
      });
    }
  };

  return (
    <div className="flex w-full p-10 h-full">
      <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
        <MyMap />
      </div>
      <div className="w-3/4 p-5">
        <h1 className="font-bold text-2xl ml-5">About</h1>
        <div className="p-6">
          <b>
            <h1 className="mb-1">Name: {data.stsName}</h1>
            <h4 className="mb-1">Type: {data.wardNum}</h4>
            <h4 className="mb-1">Capacity: {data.capacity}</h4>
            <h4 className="mb-1">Coordinate: {data.coordinate}</h4>
            <h4 className="mb-1">Managers: {data.managers.join(", ")}</h4>
          </b>

          <StsForm update={1} data={data} />

          <div className="ml-44">
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteData}
              startIcon={<DeleteForeverOutlinedIcon />}
            >
              Delete STS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
