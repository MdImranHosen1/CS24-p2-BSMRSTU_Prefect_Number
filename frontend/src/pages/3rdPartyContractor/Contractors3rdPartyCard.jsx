import * as React from "react";
import { Link } from "react-router-dom";
import img from "./../../assets/user.png";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";

export default function Contractors3rdPartyCard({ users }) {
  return (
    <div class="  flex  items-center w-full  bg-white border border-gray-100 rounded-lg shadow   hover:bg-gray-200">
      <img
        className="ml-5 mr-5 rounded-md object-cover rounded-t-lg h-40 w-40"
        src={img}
        alt="Photo"
      />
      <div class="flex justify-between w-full">
        <div class="p-5">
          <b>
            <h1 class="mb-1">Name: {users.userName}</h1>
            <h4 class="mb-1">Type: {users.userType}</h4>
            <h4 class="mb-1">Phone Number: {users.userPhone}</h4>
            <h4 class="mb-1">Email: {users.userEmail}</h4>
            <h4 class="mb-1">Roles: {users.userRoles}</h4>
            <h4 className="mb-1">STS/Lanfill :{users.stsOrLandfillNum}</h4>
          </b>
          <a href={`/users/${users._id}`}>
            <Button
              variant="contained"
              className="w-24"
              endIcon={<ReadMoreOutlinedIcon />}
            >
              More
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
