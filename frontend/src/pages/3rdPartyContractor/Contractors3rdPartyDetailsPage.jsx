import React, { useEffect } from "react";
import profileImg1 from "./../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { WorkForcePage } from "./workForce/WorkForcePage";
// import { deleteContractById, getContractById } from "../../redux/slices/contractsSlice";


export const Contractors3rdPartyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = {
    companyName: 'XYZ Contractors Ltd.',
    contractId: 'C002',
    registrationId: 'R002',
    registrationDate: 'January 2, 2022',
    tin: '234-567-8901',
    contactNumber: '234-567-8901',
    workforceSize: 150,
    paymentPerTonnage: 55.00,
    requiredWastePerDay: 150.00,
    contractDuration: '2 years',
    areaOfCollection: 'City B',
    designatedSts: 'STS B'
  };

  console.log("asdfasd", data);

//   useEffect(() => {
//     dispatch(getContractById(id));
//   }, [dispatch, id]);

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
    const isConfirmed = window.confirm("Do you want to delete the contract?");
    // if (isConfirmed) {
    //   dispatch(deleteContractById(id)).then(() => {
    //     navigate("/contracts");
    //     window.location.reload();
    //   });
    // }
  };

  return (

    <div>
        <div className="flex w-full p-10 h-full">
      <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
        {/* Assuming profileImg1 is defined elsewhere */}
        <img className="rounded-lg" src={profileImg1} alt="" />
        <h1 className="mt-5 font-semibold text-lg text-center">Name: {data.companyName}</h1>
      </div>
      <div className="w-3/4 p-5">
        <h1 className="font-bold text-2xl ml-5">About</h1>
        <div className="pl-6">
          <b>
            <h1 className="mb-1">Registration ID: {data.registrationId}</h1>
            <h4 className="mb-1">Contract ID: {data.contractId}</h4>
            <h4 className="mb-1">Registration Date: {data.registrationDate}</h4>
            <h4 className="mb-1">TIN: {data.tin}</h4>
            <h4 className="mb-1">Contact Number: {data.contactNumber}</h4>
            <h4 className="mb-1">Workforce Size: {data.workforceSize}</h4>
            <h4 className="mb-1">Payment Per Tonnage: {data.paymentPerTonnage}</h4>
            <h4 className="mb-1">Required Waste Per Day: {data.requiredWastePerDay}</h4>
            <h4 className="mb-1">Contract Duration: {data.contractDuration}</h4>
            <h4 className="mb-1">Area of Collection: {data.areaOfCollection}</h4>
            <h4 className="mb-1">Designated STS: {data.designatedSts}</h4>
          </b>
          {/* Uncomment if needed */}
          {/* <ContractForm update={1} data={data} /> */}
          <div className="ml-48">
            {/* Button component assumed to be defined elsewhere */}
            <Button
              variant="contained"
              color="error"
              onClick={onDeleteData}
              startIcon={<DeleteForeverOutlinedIcon />}
            >
              Delete Contract
            </Button>
          </div>
        </div>
      </div>
    </div>


      <div>
      <WorkForcePage/>
      </div>
    </div>

    
  );
};
