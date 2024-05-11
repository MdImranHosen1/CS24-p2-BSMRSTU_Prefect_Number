import React, { useEffect, useState } from "react";
import profileImg1 from "./../../assets/user.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { getUserById } from "../../redux/slices/usersSlice";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { UserForm } from "./UserForm";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Add from "@mui/icons-material/Add";
import { TransactionForm } from "../../components/TransactionForm";
import { deleteUserById } from "./../../redux/slices/usersSlice";
import { getTransactions } from "../../redux/slices/transactionsSlice";
import TransCard from "./TransCard";
import { BillsForm } from "../landﬁll/billing/BillsForm";
import { getBills } from "../../redux/slices/billSlice";
import BillsCard from "./BillsCard";
import { MonitoringTransportedWasteForm } from "../sts/billing/MonitoringTransportedWasteForm";
import { getMonitorTransportedWaste } from "../../redux/slices/MonitorTransportedWasteSlice";
import WasteMonitorCard from "./WasteMonitorCard";



export const UserDetailsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.data[0]);
  const tranData = useSelector((state) => state.transactions.data);
  const billData = useSelector((state) => state.bills.data);
  const transportedWasteData = useSelector((state) => state.monitorTransportedWaste.data);
  const [stsView, setStsView] = useState([1, 0, 0])

  const userType = useSelector((state) => state.userType?.userData?.userType);

  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getTransactions());
    dispatch(getMonitorTransportedWaste());
    dispatch(getBills());
  }, [dispatch, userId]);
  // console.log("userType",userType);
  if (!user) {
    return (
      <div>
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      </div>
    );
  }


  if (!user) {

    if (userType === 'admin') {
      if (!user || !tranData || !billData || !transportedWasteData) {
        return (
          <div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </div>
        );
      }
    }
    else if (userType === 'STS Manager') {
      if (!user || !tranData || !transportedWasteData) {
        return (
          <div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </div>
        );
      }
    }
    else if (userType === 'Landfill Manager') {
      if (!user || !billData) {
        return (
          <div>
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </div>
        );
      }
    }


  }
  console.log("user: ", user);

  const onDeleteUser = () => {
    const isConfirmed = window.confirm("Are you confirm to delete the user?");
    if (isConfirmed) {
      console.log("isConfirmed", isConfirmed, userId);
      dispatch(deleteUserById(userId));
      navigate("/users");
      window.location.reload();
    }
  };

  const toggleTransactions = () => {
    setStsView([1, 0, 0]);
  }
  const toggleBillList = () => {
    setStsView([0, 1, 0]);
  }
  const toggleWasteMonitor = () => {
    setStsView([0, 0, 1]);
  }





  return (
    <div>
      <div className=" flex w-full p-10 h-full ">
        <div className="rounded-md w-1/4 p-5 bg-sky-500 h-full">
          <img className=" rounded-lg" src={profileImg1} alt=""></img>
          <h1 className=" mt-5 font-semibold text-lg text-center ">
            Name: {user.userName}
          </h1>
        </div>
        <div className=" w-3/4 p-5">
          <h1 className=" font-bold text-2xl ml-5">About </h1>
          <div className="p-6  ">
            <b>
              <h1 className="mb-1">Name :{user.userName}</h1>
              <h4 className="mb-1">Type :{user.userType}</h4>
              <h4 className="mb-1">Phone Number :{user.userPhone}</h4>
              <h4 className="mb-1">Email : {user.userEmail}</h4>
              <h4 className="mb-1">Roles :{user.userRoles}</h4>
              <h4 className="mb-1">STS/Lanfill :{user.stsOrLandfillNum}</h4>
            </b>

            <UserForm update={1} user={user} />

            <div className=" mt-16 w-72">
              {userType === 'admin' ? <Button
                variant="contained"
                className="w-72"
                color="error"
                onClick={onDeleteUser}
                startIcon={<DeleteForeverOutlinedIcon />}
              >
                Delete User
              </Button> : ""}

            </div>
          </div>
        </div>
      </div>
      <div className="p-10">
        {user.userType === "Landfill Manager" ? (
          <div>
            <BillsForm data={user} />
            <div className=" mt-5">
              <div className=" text-4xl text-center m-2 font-bold">
                Bills List
              </div>
              <BillsCard billData={billData} />
            </div>
          </div>
        ) : (
          ""
        )}

        {user.userType === "STS Manager" ? (
          <>
            <div className=" flex">
              <div><TransactionForm data={user} /></div>
              <div className=" ml-2">
                <Button
                  variant="contained"
                  className="w-auto "
                >
                  Genarate Today Bill
                </Button>
              </div>
              <MonitoringTransportedWasteForm />
            </div>
            <div className=" mt-5">
              <div className=" flex  text-[20px] font-bold bg-[#0EA5E9] text-gray-900 p-2">
                <div className=" bg-green-400 p-1 rounded-lg pl-2 pr-2 ml-1 mr-1 cursor-pointer" onClick={toggleTransactions}>Transactions List</div>
                <div className=" bg-green-400 p-1 rounded-lg pl-2 pr-2 ml-1 mr-1 cursor-pointer" onClick={toggleBillList}>Today Bill List</div>
                <div className=" bg-green-400 p-1 rounded-lg pl-2 pr-2 ml-1 mr-1 cursor-pointer" onClick={toggleWasteMonitor}>Transported Waste List</div>
              </div>
              {stsView[0] && <TransCard tranData={tranData} />}
              {stsView[2] && <WasteMonitorCard Data={transportedWasteData} />}
            </div>
          </>
        ) : (
          ""
        )}

        {user.userType === "admin" ? (
          <>
            <TransactionForm data={user} />
            <div> <BillsForm data={user} /></div>
            <div className=" flex w-full p-5">
              <div className=" mt-5 w-1/2">
                <div className=" text-4xl text-center m-2 font-bold">
                  Transactions List
                </div>
                <TransCard tranData={tranData} />
              </div>
              <div className=" w-1/2 p-5">
                <div className=" text-4xl text-center m-2 font-bold">
                  Bills List
                </div>
                <BillsCard billData={billData} />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};