import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { postVehicle, updateVehicle } from "../../redux/slices/vehiclesSlice";
import UpdateIcon from "@mui/icons-material/Update";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";

export const VehiclesForm = ({ update = 0, data = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);

  const dispatch = useDispatch();
  const [regNum, setRegNum] = useState(update ? data?.regNum : "");
  const [type, setType] = useState(update ? data?.type : "Open Truck");
  const [capacity, setCapacity] = useState(update ? data?.capacity : "3 ton");
  const [costLoaded, setCostLoaded] = useState(update ? data?.costLoaded : "");
  const [costUnloaded, setCostUnloaded] = useState(
    update ? data?.costUnloaded : ""
  );
  const [stsNum, setStsNum] = useState(update ? data?.stsID : "");

  const toggleAddView = () => {
    document.body.style.overflow = viewUserModel ? "auto" : "hidden";
    setViewUserModel(!viewUserModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const vehicleData = {
      regNum: regNum,
      type: type,
      capacity: capacity,
      costLoaded: costLoaded,
      costUnloaded: costUnloaded,
      stsID: stsNum,
    };

    if (update === 0) {
      dispatch(postVehicle(vehicleData));
      setRegNum("");
      setType("Open Truck");
      setCapacity("3 ton");
      setCostLoaded("");
      setCostUnloaded("");
      setStsNum("");
    } else if (update === 1) {
      dispatch(
        updateVehicle({ vehicleId: data._id, vehicleData: vehicleData })
      );
      window.location.reload();
    }
    toggleAddView();
  };

  return (
    <div>
      <div className="fixed w-1/4  pr-10">
        {update ? (
          <>
            <Button
              variant="contained"
              startIcon={<UpdateIcon />}
              className="w-auto"
              onClick={toggleAddView}
            >
              Update Vehicles
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<AddRoadTwoToneIcon />}
            onClick={toggleAddView}
          >
            Add Vehicle
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
                {update ? "Update Vehicle" : "Add New Vehicle"}
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
                    htmlFor="regNum"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Registration Id
                  </label>
                  <input
                    type="text"
                    name="regNum"
                    id="regNum"
                    value={regNum}
                    onChange={(e) => setRegNum(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter vehicle registration id"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="type"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="Open Truck">Open Truck</option>
                    <option value="Dump Truck">Dump Truck</option>
                    <option value="Compactor">Compactor</option>
                    <option value="Container Carrier">Container Carrier</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="capacity"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle Capacity
                  </label>
                  <select
                    id="capacity"
                    name="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="3 Ton">3 Ton</option>
                    <option value="5 Ton">5 Ton</option>
                    <option value="7 Ton">7 Ton</option>
                    <option value="15 Ton">15 Ton</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="costLoaded"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Fuel Cost per Kilometer - Fully Loaded
                  </label>
                  <input
                    type="number"
                    name="costLoaded"
                    id="costLoaded"
                    value={costLoaded}
                    onChange={(e) => setCostLoaded(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter fuel cost per kilometer - fully loaded"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="costUnloaded"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Fuel Cost per Kilometer - Unloaded
                  </label>
                  <input
                    type="number"
                    name="costUnloaded"
                    id="costUnloaded"
                    value={costUnloaded}
                    onChange={(e) => setCostUnloaded(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter fuel cost per kilometer - unloaded"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="stsNum"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    STS Number
                  </label>
                  <input
                    type="text"
                    name="stsNum"
                    id="stsNum"
                    value={stsNum}
                    onChange={(e) => setStsNum(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter the STS number of the vehicle"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Vehicle" : "Add Vehicle"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
