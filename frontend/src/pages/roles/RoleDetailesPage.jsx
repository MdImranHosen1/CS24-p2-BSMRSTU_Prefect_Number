import React, { useEffect } from "react";
import profileImg1 from "./../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { deleteRoleById, getRoleById } from "../../redux/slices/rolesSlice";
import { RoleForm } from "./RolesForm";

export const RoleDetailsPage = () => {
  


  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.roles.data[0]);

  useEffect(() => {
    dispatch(getRoleById(id));
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
    const isConfirmed = window.confirm("Do you want to delete the role?");
    if (isConfirmed) {
      dispatch(deleteRoleById(id)).then(() => {
        navigate("/rbac/roles");
        window.location.reload(); 
      });
    }
  };

  return (
    <div className="flex w-full p-10 h-full">
      <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
        <img className="rounded-lg" src={profileImg1} alt=""></img>
        <h1 className="mt-5 font-semibold text-lg text-center ">
          Role Name: {data.roleName}
        </h1>
      </div>
      <div className="w-3/4 p-5">
        <h1 className="font-bold text-2xl ml-5">About</h1>
        <div className="pl-6">
          <b>
            <h1 className="mb-1">Role ID: {data.roleId}</h1>
            <h4 className="mb-1">Role Details: {data.roleDetails}</h4>
            <h4 className="mb-1">Role Assign: {data.roleAssign}</h4>
          </b>

          <RoleForm update={1} data={data} />

          <div className="ml-48">
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteData}
              startIcon={<DeleteForeverOutlinedIcon />}
            >
              Delete Role
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
