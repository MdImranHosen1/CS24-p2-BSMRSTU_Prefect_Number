import * as React from "react";
import { Link } from "react-router-dom";
import img from "./../../assets/user.png";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";

export default function PermissionCard({ permission }) {
  return (
    <div class="  flex  items-center w-full  bg-white border border-gray-100 rounded-lg shadow   hover:bg-gray-200">
      <div class="flex justify-between w-full">
        <div class="p-5">
          <b>
            <h1 class="mb-1">Name: {permission.name}</h1>
            <h4 class="mb-1">Details: {permission.details}</h4>
          </b>
          <Link to={`/rabc/permissions/${permission._id}`}>
            <Button
              variant="contained"
              className="w-24"
              endIcon={<ReadMoreOutlinedIcon />}
            >
              More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
