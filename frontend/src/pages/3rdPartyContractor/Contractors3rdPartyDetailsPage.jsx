import React, { useEffect } from "react";
import profileImg1 from "./../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { deleteContractors3rdPartyById, getContractors3rdPartyById } from "../../redux/slices/Contractors3rdPartySlice";
import { Contractors3rdPartyForm } from "./Contractors3rdPartyForm";
import { WorkForceForm } from "./workForce/WorkForceForm";
import { WorkForcePage } from "./workForce/WorkForcePage";
// import { deleteContractById, getContractById } from "../../redux/slices/contractsSlice";


export const Contractors3rdPartyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.contractors3rdParty.data[0]);


  useEffect(() => {
    dispatch(getContractors3rdPartyById(id));
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
    const isConfirmed = window.confirm("Do you want to delete the contract?");
    if (isConfirmed) {
      dispatch(deleteContractors3rdPartyById(id)).then(() => {
        navigate("/3rdPartContractor");
        window.location.reload();
      });
    }
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
              <h4 className="mb-1">Contract ID: {data.contractID}</h4>
              <h4 className="mb-1">Registration Date: {data.registrationDate}</h4>
              <h4 className="mb-1">TIN: {data.tin}</h4>
              <h4 className="mb-1">Contact Number: {data.contactNum}</h4>
              <h4 className="mb-1">Workforce Size: {data.workspaceSize}</h4>
              <h4 className="mb-1">Payment Per Tonnage: {data.payment}</h4>
              <h4 className="mb-1">Required Waste Per Day: {data.wasteRequiredPerDay}</h4>
              <h4 className="mb-1">Contract Duration: {data.contractDuration}</h4>
              <h4 className="mb-1">Area of Collection: {data.collectionArea}</h4>
              <h4 className="mb-1">Designated STS: {data.designatedSTS}</h4>
            </b>
            {/* Uncomment if needed */}
            {/* <ContractForm update={1} data={data} /> */}
            <div className=" flex"><div className=" mr-2">
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
              <div><Contractors3rdPartyForm update={1} user={data} /></div></div>
          </div>
        </div>
      </div>


      <WorkForcePage/>
    </div>


  );
};
