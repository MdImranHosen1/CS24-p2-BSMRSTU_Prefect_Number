// BillsForm.js

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import { postBill, updateBill } from "./../../../redux/slices/billSlice";
import { getStsById } from "../../../redux/slices/stsSlice";
import { getLandfillById } from "../../../redux/slices/landfullSlice";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../redux/slices/usersSlice";
import SortestPath from "../../users/SortestPath";
import { getVehicleById } from "../../../redux/slices/vehiclesSlice";

export const BillsForm = ({ update = 0, data = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);

  const dispatch = useDispatch();
  const [landFillId, setLandFillId] = useState(update ? data?.landFillId : "");
  const [vId, setVId] = useState(update ? data?.vId : "");
  const [stsId, setStsId] = useState(update ? data?.stsId : "");
  const [weightWaste, setWeightWaste] = useState(
    update ? data?.weightWaste : ""
  );
  const [arrivalTime, setArrivalTime] = useState(
    update ? data?.arrivalTime : ""
  );
  const [departureTime, setDepartureTime] = useState(
    update ? data?.departureTime : ""
  );
  const [totalFuelCost, setTotalFuelCost] = useState(
    update ? data?.totalFuelCost : ""
  );

  const toggleAddView = () => {
    document.body.style.overflow = viewUserModel ? "auto" : "hidden";
    setViewUserModel(!viewUserModel);
  };
  const { userId } = useParams();

  const staData = useSelector((state) => state.sts.data[0]);
  const landfilldata = useSelector((state) => state.landfill.data[0]);
  const vehicleData = useSelector((state) => state.vehicles.data[0]);
  // console.log("staData", staData, "landfilldata", landfilldata, "userLandfillNum", userLandfillNum, "vehicleData", vehicleData);
  
  useEffect(() => {
    dispatch(getLandfillById(landFillId));
  }, [dispatch, landFillId]);

  useEffect(() => {
    dispatch(getStsById(stsId));
  }, [dispatch, stsId]);

  useEffect(() => {
    dispatch(getVehicleById(vId));
  }, [dispatch, vId]);

  if(staData && landfilldata)
  {
    const distance = SortestPath(landfilldata?.coordinate, staData?.coordinate)
  }



  const handleSubmit = (event) => {
    event.preventDefault();


    const billData = {
      landFillId: landFillId,
      vId: vId,
      stsId: stsId,
      weightWaste: weightWaste,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      totalFuelCost: totalFuelCost,
    };

    if (update === 0) {
      dispatch(postBill(billData));
      // Reset form fields if needed
    } else if (update === 1) {
      dispatch(updateBill({ billId: data._id, billData: billData }));
      // Reset form fields if needed
    }
    toggleAddView();
  };

  return (
    <div>
      <div className=" w-56 mt-5">
        <Button
          variant="contained"
          className="w-full"
          startIcon={<AddRoadTwoToneIcon />}
          onClick={toggleAddView}
        >
          Add Landfill Bill
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
                {update ? "Update Landfill Bill" : "Add New Landfill Bill"}
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
                    htmlFor="vtId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Landfill ID
                  </label>
                  <input
                    type="text"
                    name="vtId"
                    id="vtId"
                    value={landFillId}
                    onChange={(e) => setLandFillId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter vehicle type ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="vId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle ID
                  </label>
                  <input
                    type="text"
                    name="vId"
                    id="vId"
                    value={vId}
                    onChange={(e) => setVId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter vehicle ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="stsId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    STS ID
                  </label>
                  <input
                    type="text"
                    name="stsId"
                    id="stsId"
                    value={stsId}
                    onChange={(e) => setStsId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter STS ID"
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
                
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Landfill Bill" : "Add Landfill Bill"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
