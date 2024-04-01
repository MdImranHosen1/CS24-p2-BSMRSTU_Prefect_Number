import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { postVehicle } from "../../redux/slices/vehiclesSlice";
import UpdateIcon from "@mui/icons-material/Update";
import NoteAddIcon from "@mui/icons-material/NoteAdd";

export const StsFromVehiclesTrans = ({ update = 0, vehicle = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);
  const dispatch = useDispatch();

  // State variables for form fields
  const [regNum, setRegNum] = useState("");
  const [type, setType] = useState("Open Truck");
  const [lfId, setLfId] = useState("1"); // Default value for Landfill number
  const [weightWaste, setWeightWaste] = useState("");
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [travelRoute, setTravelRoute] = useState("Route number -1"); // Default value for Travel route

  const toggleAddUserView = () => {
    document.body.style.overflow = viewUserModel ? "auto" : "hidden";
    setViewUserModel(!viewUserModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const vehicleData = {
      vRegNum: regNum,
      stsId: "10", // Default value for stsId obtained from another table
      lfId: lfId,
      weightWaste: weightWaste,
      arrival: arrival,
      departure: departure,
      dateTime: dateTime,
      ctTotalService: "10", // Default value for ctTotalService obtained from another table
      travelDistance: "10", // Default value for travelDistance obtained from another table
      travelRoute: travelRoute,
    };

    console.log(vehicleData);
    dispatch(postVehicle(vehicleData));

    // Reset form fields
    setRegNum("");
    setType("Open Truck");
    setLfId("1");
    setWeightWaste("");
    setArrival("");
    setDeparture("");
    setDateTime("");
    setTravelRoute("Route number -1"); 

    toggleAddUserView();
  };

  return (
    <div>
      <div className="fixed w-1/4 ">
        {update ? (
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            className="w-auto"
            onClick={toggleAddUserView}
          >
            Update Vehicles
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<NoteAddIcon />}
            onClick={toggleAddUserView}
          >
            Vehicle Transaction
          </Button>
        )}
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
                Add new vehicle
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleAddUserView}
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
                    htmlFor="regNum"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle registration number
                  </label>
                  <input
                    type="text"
                    id="regNum"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Enter vehicle registration number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="lfId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Landfill number
                  </label>
                  <select
                    id="lfId"
                    value={lfId}
                    onChange={(e) => setLfId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="1">Amin bajar</option>
                    <option value="2">Boro bajar</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="weightWaste"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Waste Weight
                  </label>
                  <input
                    type="number"
                    id="weightWaste"
                    value={weightWaste}
                    onChange={(e) => setWeightWaste(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Enter weight of the waste"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="arrival"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Arrival time
                  </label>
                  <input
                    type="time"
                    id="arrival"
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Enter arrival time of the vehicle"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="departure"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Departure time
                  </label>
                  <input
                    type="time"
                    id="departure"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Enter departure time of the vehicle"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="dateTime"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="dateTime"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    placeholder="Select date"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="travelRoute"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Travel route
                  </label>
                  <select
                    id="travelRoute"
                    value={travelRoute}
                    onChange={(e) => setTravelRoute(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="Route number -1">Route number -1</option>
                    <option value="Route number -2">Route number -2</option>
                  </select>
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                Add Vehicles
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
