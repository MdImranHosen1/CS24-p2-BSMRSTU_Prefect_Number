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
            <h1 className="mb-1">Company Name: {users.companyName}</h1>
            <h4 className="mb-1">Contract ID: {users.contractId}</h4>
            {/* <h4 className="mb-1">Registration ID: {users.registrationId}</h4>
            <h4 className="mb-1">Registration Date: {users.registrationDate}</h4>
            <h4 className="mb-1">TIN: {users.tin}</h4> */}
            <h4 className="mb-1">Contact Number: {users.contactNumber}</h4>
            <h4 className="mb-1">Workforce Size: {users.workforceSize}</h4>
            <h4 className="mb-1">Payment Per Tonnage: {users.paymentPerTonnage}</h4>
            {/* <h4 className="mb-1">Required Waste Per Day: {users.requiredWastePerDay}</h4> */}
            {/* <h4 className="mb-1">Contract Duration: {users.contractDuration}</h4> */}
            <h4 className="mb-1">Area of Collection: {users.areaOfCollection}</h4>
            <h4 className="mb-1">Designated STS: {users.designatedSts}</h4>
          </b>
          <a href={`/3rdPartContractor/${users._id}`}>
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
