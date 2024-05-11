import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getVehicleById, getVehicles } from "../../../redux/slices/vehiclesSlice";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import { postBill, updateBill } from "./../../../redux/slices/billSlice";
import { getSts, getStsById } from "../../../redux/slices/stsSlice";
import { getLandfillById, getLandfills } from "../../../redux/slices/landfullSlice";
import getDistance from "../../users/SortestPath";

const YOUR_API_KEY = "AIzaSyD4j0TwyOoZTpLmAjJ8j8zlf7jA2ya31MA";
// const getDistance = async (coordinate1, coordinate2, apiKey = YOUR_API_KEY) => {
//   const response = await fetch(
//     `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinate1}&destination=${coordinate2}&key=${apiKey}&mode=driving`
//   );
//   const data = await response.json();
//   if (data.status === 'OK') {
//     const route = data.routes[0];
//     let totalDistance = 0;
//     route.legs.forEach((leg) => {
//       totalDistance += leg.distance.value;
//     });
//     return totalDistance / 1000; // Converting distance from meters to kilometers
//   } else {
//     console.error('Directions request failed due to ' + data.status);
//     return null;
//   }
// };



export const BillsForm = ({ update = 0, data = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);

  const dispatch = useDispatch();
  const [landFillId, setLandFillId] = useState(update ? data?.landFillId : "");
  const [vId, setVId] = useState(update ? data?.vId : "");
  const [stsId, setStsId] = useState(update ? data?.stsId : "");
  const [weightWaste, setWeightWaste] = useState(update ? data?.weightWaste : "");
  const [arrivalTime, setArrivalTime] = useState(update ? data?.arrivalTime : "");
  const [departureTime, setDepartureTime] = useState(update ? data?.departureTime : "");
  const [totalFuelCost, setTotalFuelCost] = useState(update ? data?.totalFuelCost : "");

  const toggleAddView = () => {
    document.body.style.overflow = viewUserModel ? "auto" : "hidden";
    setViewUserModel(!viewUserModel);
  };


  const staAllData = useSelector((state) => state.sts.data);
  const landfillAlldata = useSelector((state) => state.landfill.data);
  const vehicleAllData = useSelector((state) => state.vehicles.data);

  useEffect(() => {
    dispatch(getLandfills());
    dispatch(getSts());
    dispatch(getVehicles());
  }, [dispatch]);

  const Sdata = useSelector((state) => state.sts.data[0]);
  const Ldata = useSelector((state) => state.landfill.data[0]);
  const Vdata = useSelector((state) => state.vehicles.data[0]);

  const handleSubmit = async (event) => {
    event.preventDefault();




    dispatch(getStsById(stsId));
    dispatch(getLandfillById(landFillId));
    dispatch(getVehicleById(vId));


    console.log("Vdata", Vdata)
    console.log(Sdata)
    console.log(Ldata);

    const coordinate1 = Ldata.coordinate;
    const coordinate2 = Sdata.coordinate;

    // console.log("coordinate1", coordinate1);

    // const distance = await getDistance(coordinate1, coordinate2)

    // const distance = Vdata.capacity;
    let distance = getDistance(coordinate1, coordinate2)


    // if (distance === null) distance = 10;


    const avarageCost = (Vdata.costUnloaded) + (weightWaste / parseInt(Vdata.capacity)) * (Vdata.costLoaded - Vdata.costUnloaded)
    const totalCost = avarageCost * distance
    const billData = {
      landFillId: landFillId,
      vId: vId,
      stsId: stsId,
      weightWaste: weightWaste,
      arrivalTime: arrivalTime,
      departureTime: departureTime,
      totalFuelCost: totalCost,
    };
    console.log("billData", billData)

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
                <select
                  id="stsId"
                  name="stsId"
                  value={stsId._id} // Set the value to the _id property of stsId
                  onChange={(e) => setStsId(e.target.value)} // Update stsId with the selected _id
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                >
                  {staAllData.map((value, index) => (
                    <option key={index} value={value._id}> {/* Set the value to the _id property */}
                      {value._id}{" "}{value.stsName}
                    </option>
                  ))}
                </select>

                <div className="col-span-2">
                  <label
                    htmlFor="landFillId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Landfill ID
                  </label>
                  <select
                    id="landFillId"
                    name="landFillId"
                    value={landFillId._id} // Set the value to the _id property of landFillId
                    onChange={(e) => setLandFillId(e.target.value)} // Update landFillId with the selected _id
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    {landfillAlldata.map((value, index) => (
                      <option key={index} value={value._id}> {/* Set the value to the _id property */}
                        {value._id}{" "}{value.name}
                      </option>
                    ))}
                  </select>

                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="vId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle ID
                  </label>
                  <select
                    id="vId"
                    name="vId"
                    value={vId._id} // Set the value to the _id property of vId
                    onChange={(e) => setVId(e.target.value)} // Update vId with the selected _id
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    {vehicleAllData.map((value, index) => (
                      <option key={index} value={value._id}> {/* Set the value to the _id property */}
                        {value._id}{" "}{value.regNum}


                      </option>
                    ))}
                  </select>

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
