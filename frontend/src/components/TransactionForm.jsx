import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import UpdateIcon from "@mui/icons-material/Update";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import {
  postTransaction,
  updateTransaction,
} from "../redux/slices/transactionsSlice";

export const TransactionForm = ({ update = 0, data = {} }) => {
  console.log("userDAta ", data);
  const [viewUserModel, setViewUserModel] = useState(false);

  const dispatch = useDispatch();
  const [stsNum, setStsNum] = useState(data?.stsNum);
  const [lfNum, setLfNum] = useState(update ? data?.lfNum : "");
  const [vehRegNum, setVehRegNum] = useState(update ? data?.vehRegNum : "");
  const [weightWaste, setWeightWaste] = useState(
    update ? data?.weightWaste : ""
  );
  const [arrivalTime, setArrivalTime] = useState(
    update ? data?.arrivalTime : ""
  );
  const [departureTime, setDepartureTime] = useState(
    update ? data?.departureTime : ""
  );
  const [travelDistance, setTravelDistance] = useState(
    update ? data?.travelDistance : ""
  );

  const toggleAddView = () => {
    document.body.style.overflow = viewUserModel ? "auto" : "hidden";
    setViewUserModel(!viewUserModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const transactionData = {
      stsNum: stsNum,
      lfNum: lfNum,
      vehRegNum: vehRegNum,
      weightWaste: weightWaste,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      travelDistance: travelDistance,
    };
    console.log("transactionData", transactionData);
    if (update === 0) {
      dispatch(postTransaction(transactionData));

      console.log(transactionData);

      //   setLfNum("");
      //   setVehRegNum("");
      //   setWeightWaste("");
      //   setArrivalTime("");
      //   setDepartureTime("");
      //   setTravelDistance("");
    } else if (update === 1) {
      dispatch(
        updateTransaction({
          transactionId: data._id,
          transactionData: transactionData,
        })
      );
    }
    toggleAddView();
  };

  return (
    <div className=" flex w-full flex-col ">
      <div className="w-56 flex  ">
        <Button
          variant="contained"
          className="w-full"
          startIcon={<AddRoadTwoToneIcon />}
          onClick={toggleAddView}
        >
          Add Transaction
        </Button>
      </div>

      {viewUserModel && (
        <div className="z-20  fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div
            style={{
              maxHeight: "calc(100vh - 20px)",
              overflowY: "auto",
              width: "80%",
              maxWidth: "800px",
            }}
            className=" bg-white rounded-lg shadow-lg p-6 max-h-full overflow-y-auto "
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {update ? "Update Transaction" : "Add New Transaction"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleAddView}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="lfNum"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    LF Number
                  </label>
                  <input
                    type="number"
                    name="lfNum"
                    id="lfNum"
                    value={lfNum}
                    onChange={(e) => setLfNum(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter LF number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="vehRegNum"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    name="vehRegNum"
                    id="vehRegNum"
                    value={vehRegNum}
                    onChange={(e) => setVehRegNum(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter vehicle registration number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="weightWaste"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Weight of Waste
                  </label>
                  <input
                    type="number"
                    name="weightWaste"
                    id="weightWaste"
                    value={weightWaste}
                    onChange={(e) => setWeightWaste(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter weight of waste"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="arrivalTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Arrival Time
                  </label>
                  <input
                    type="datetime-local"
                    name="arrivalTime"
                    id="arrivalTime"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="departureTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Departure Time
                  </label>
                  <input
                    type="datetime-local"
                    name="departureTime"
                    id="departureTime"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="travelDistance"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Travel Distance
                  </label>
                  <input
                    type="number"
                    name="travelDistance"
                    id="travelDistance"
                    value={travelDistance}
                    onChange={(e) => setTravelDistance(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter travel distance"
                    required
                  />
                </div>
              </div>
              <Button
                variant="contained"
                className="w-full"
                onClick={handleSubmit}
              >
                {update ? "Update Transaction" : "Add Transaction"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
