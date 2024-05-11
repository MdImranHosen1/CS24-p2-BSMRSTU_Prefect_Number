import React, { useEffect } from "react";
import profileImg1 from "./../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  deleteVehicleById,
  getVehicleById,
} from "../../redux/slices/vehiclesSlice";
import { CollectionPlanForm } from "./CollectionPlanForm";
import { deleteContractorsManagerById, getContractorsManagerById } from "../../redux/slices/ContractorManagerSlice";
import { ContractorManagerForm } from "./ContractorManagerForm";
import { WorkForceForm } from "../3rdPartyContractor/workForce/WorkForceForm";
import { WorkForcePage } from "../3rdPartyContractor/workForce/WorkForcePage";


export const ContractorManagerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.contractorsManager.data[0]);



  useEffect(() => {
    dispatch(getContractorsManagerById(id));
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
      dispatch(deleteContractorsManagerById(id)).then(() => {
        navigate("/contractorsManager");
        window.location.reload();
      });
    }
  };

  // const userData = {
  //   "fullName": fullName,
  //   "userId": userId,
  //   "email": email,
  //   "date": accountCreationDate,
  //   "contactNumber": contactNumber,
  //   "assignedContractorCompany": assignedContractorCompany,
  //   "accessLevel": [accessLevel],
  //   "userName": username,
  //   "password": password,
  // };

  return (
    <div>
      <div className="flex  w-full p-10 h-full">
        <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
          {/* Assuming profileImg1 is defined elsewhere */}
          <img className="rounded-lg" src={profileImg1} alt="" />
          <h1 className="mt-5 font-semibold text-lg text-center">Name: {data.fullName}</h1>
        </div>
        <div className="w-3/4 p-5">
          <h1 className="font-bold text-2xl ml-5">About</h1>
          <div className="pl-6">
            <b>
              <h1 className="mb-1">Email: {data.email}</h1>
              <h4 className="mb-1">User ID: {data.userId}</h4>
              <h4 className="mb-1">Date of Account Creation: {data.dateOfAccountCreation}</h4>
              <h4 className="mb-1">Contact Number: {data.contactNumber}</h4>
              <h4 className="mb-1">Assigned Contractor Company: {data.assignedContractorCompany}</h4>
              <h4 className="mb-1">Access Level: {data.accessLevel}</h4>
              <h4 className="mb-1">Username: {data.userName}</h4>
            </b>
            {/* Uncomment if needed */}
            {/* <VehiclesForm update={1} data={data} /> */}
            <div className=" flex">
              {/* Button component assumed to be defined elsewhere */}
              <div className=" ml-1 mr-1"><Button
                variant="contained"
                color="error"

                onClick={onDeleteData}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Delete User
              </Button></div>
              <div className=" ml-1 mr-1"><ContractorManagerForm update={1} user={data} /></div>

              <div className=" ml-1 mr-1"><CollectionPlanForm /></div>
              
            </div>
          </div>


        </div>
        
      </div>
      <WorkForcePage />
    </div>
  );
};
