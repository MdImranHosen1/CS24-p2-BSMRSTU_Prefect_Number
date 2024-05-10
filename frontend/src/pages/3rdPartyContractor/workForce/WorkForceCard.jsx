import * as React from "react";
import { Link } from "react-router-dom";
import img from "./../../../assets/user.png";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";

export default function WorkForceCard({ users }) {
  console.log(users)
  console.log("this is workforceCard")
  return (
    <div className="flex items-center w-full bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-200">
      <img
        className="ml-5 mr-5 rounded-md object-cover rounded-t-lg h-40 w-40"
        src={img}
        alt="Photo"
      />
      <div className="flex justify-between w-full">
        <div className="p-5">
          <b>

            <h1 className="mb-1">Full Name: {users.fullName}</h1>
            <h4 className="mb-1">Employee ID: {users.employeeId}</h4>
            <h4 className="mb-1">Date of Birth: {users.dateOfBirth}</h4>
            <h4 className="mb-1">Date of Hire: {users.dateOfHire}</h4>
            <h4 className="mb-1">Job Title: {users.jobTitle}</h4>
            <h4 className="mb-1">Payment Rate Per Hour: {users.paymentRatePerHour}</h4>
            <h4 className="mb-1">Contact Information: {users.contactInformation.email}, {users.contactInformation.phoneNumber}, {users.contactInformation.address}</h4>
            <h4 className="mb-1">Assigned Collection Route: {users.assignedCollectionRoute}</h4>
          </b>
          <Link to={`/3rdPartContractor/workForcePage/${users._id}`}>
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
