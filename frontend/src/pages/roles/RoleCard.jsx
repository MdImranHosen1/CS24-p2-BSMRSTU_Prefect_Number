import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";

export const RoleCard = ({ role }) => {
  return (
    <div className="flex items-center w-full bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200">
      <div className="flex flex-col justify-between leading-normal">
        <div className="p-6">
          <b>
            <h4 className="mb-1">Role Name: {role.roleName}</h4>
            <h4 className="mb-1">Role ID: {role.roleId}</h4>
            <h4 className="mb-1">Role Details: {role.roleDetails}</h4>
            <h4 className="mb-1">Role Assign: {role.roleAssign}</h4>
            <Link to={`/users/roles/${role._id}`}>
              <Button
                variant="contained"
                className="w-24"
                endIcon={<ReadMoreOutlinedIcon />}
              >
                More
              </Button>
            </Link>
          </b>
        </div>
      </div>
    </div>
  );
};
