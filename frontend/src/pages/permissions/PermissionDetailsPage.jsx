import React, { useEffect } from "react";
import profileImg1 from "./../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  deletePermissionById,
  getPermissionById,
} from "../../redux/slices/permissionSlice";
import { PermissionForm } from "./PermissionForm";

export const PermissionDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  useEffect(() => {
    dispatch(getPermissionById(id));
  }, [dispatch, id]);
  
  const data = useSelector((state) => state.permissions.data[0]);

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
      dispatch(deletePermissionById(id)).then(() => {
        navigate("/rbac/permissions");
      });
    }
  };

  return (
    <div className=" flex w-full p-10 h-full ">
      <div className=" p-5">
        <h1 className=" font-bold text-2xl ml-5">About </h1>
        <div className="pl-6  ">
          <b>
            <h1 className="mb-1">Name : {data.name}</h1>
            <h4 className="mb-1">Details: {data.details}</h4>
          </b>

          <PermissionForm update={1} data={data} />

          <div className=" mt-14 w-64">
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteData}
              startIcon={<DeleteForeverOutlinedIcon />}
            >
              Delete Permission
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
