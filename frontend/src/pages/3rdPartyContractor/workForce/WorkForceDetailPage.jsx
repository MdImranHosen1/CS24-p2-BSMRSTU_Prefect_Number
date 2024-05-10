

import React, { useEffect } from "react";
import profileImg1 from "./../../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { MonitoringWorkingForm } from "./MonitoringWorkingForm";

// import { deleteContractById, getContractById } from "../../redux/slices/contractsSlice";

export const WorkForceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = {
    employeeId: 'E001',
    fullName: 'John Doe',
    dateOfBirth: 'January 1, 1980',
    dateOfHire: 'January 1, 2020',
    jobTitle: 'Collection Driver',
    paymentRatePerHour: 20.00,
    contactInformation: {
      email: 'johndoe@example.com',
      phoneNumber: '123-456-7890',
      address: '123 Main St, Anytown, USA'
    },
    assignedCollectionRoute: 'Route A'
  };

  console.log("asdfasd", data);

  useEffect(() => {
    // dispatch(getEmployeeById(id));
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
    const isConfirmed = window.confirm("Do you want to delete the employee?");
    // if (isConfirmed) {
    //   dispatch(deleteEmployeeById(id)).then(() => {
    //     navigate("/employees");
    //     window.location.reload();
    //   });
    // }
  };

  return (
    
      <div className="flex w-full p-10 h-full">
        
        <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
          {/* Assuming profileImg1 is defined elsewhere */}
          <img className="rounded-lg" src={profileImg1} alt="" />
          <h1 className="mt-5 font-semibold text-lg text-center">Name: {data.fullName}</h1>
        </div>
        <div className="w-3/4 p-5">
          <h1 className="font-bold text-2xl ml-5">About</h1>
          <div className="pl-6">
            <b>
              <h1 className="mb-1">Employee ID: {data.employeeId}</h1>
              <h4 className="mb-1">Date of Birth: {data.dateOfBirth}</h4>
              <h4 className="mb-1">Date of Hire: {data.dateOfHire}</h4>
              <h4 className="mb-1">Job Title: {data.jobTitle}</h4>
              <h4 className="mb-1">Payment Rate Per Hour: {data.paymentRatePerHour}</h4>
              <h4 className="mb-1">Email: {data.contactInformation.email}</h4>
              <h4 className="mb-1">Phone Number: {data.contactInformation.phoneNumber}</h4>
              <h4 className="mb-1">Address: {data.contactInformation.address}</h4>
              <h4 className="mb-1">Assigned Collection Route: {data.assignedCollectionRoute}</h4>
            </b>
            {/* Uncomment if needed */}
            {/* <EmployeeForm update={1} data={data} /> */}
            <div className="ml-48">
              {/* Button component assumed to be defined elsewhere */}
              <Button
                variant="contained"
                color="error"
                onClick={onDeleteData}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Delete WorkForce
              </Button>
            <MonitoringWorkingForm/>
            </div>
          </div>
        </div>
      </div>

     
  );
};
