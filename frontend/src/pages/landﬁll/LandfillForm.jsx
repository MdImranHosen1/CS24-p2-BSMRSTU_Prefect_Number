import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";
import UpdateIcon from "@mui/icons-material/Update";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { postLandfill, updateLandfill } from "../../redux/slices/landfullSlice";
const YOUR_API_KEY = "AIzaSyD4j0TwyOoZTpLmAjJ8j8zlf7jA2ya31MA";


export const LandfillForm = ({ update = 0, data = {} }) => {
  const [viewModel, setViewModel] = useState(false);

  const dispatch = useDispatch();
  const [lfId, setLfId] = useState(update ? data?.lfId : "");
  const [name, setName] = useState(update ? data?.name : "");
  const [capacity, setCapacity] = useState(update ? data?.capacity : "");
  const [coordinate, setCoordinate] = useState(update ? data?.coordinate : "");
  const [operationTimespan, setOperationTimespan] = useState(
    update ? data?.operationTimespan : ""
  );
  const [managerId, setManagerId] = useState(update ? data?.managerId : "");
  const [autocomplete, setAutocomplete] = useState(null);

  const toggleViewModel = () => {
    document.body.style.overflow = viewModel ? "auto" : "hidden";
    setViewModel(!viewModel);
  };

  const handlePlaceSelect = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinate(`${lat}, ${lng}`);
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    const landfillData = {
      lfId: lfId,
      name: name,
      capacity: capacity,
      coordinate: coordinate,
      operationTimespan: operationTimespan,
      managerId: managerId,
    };

    if (update === 0) {
      console.log("landfillData", landfillData)
      dispatch(postLandfill(landfillData));
      // setLfId("");
      // setName("");
      // setCapacity("");
      // setCoordinate("");
      // setOperationTimespan("");
      // setManagerId("");
    } else if (update === 1) {
      dispatch(
        updateLandfill({ landfillId: data._id, landfillData: landfillData })
      );
    }
    toggleViewModel();
  };

  return (
    <div>
      <div className="fixed w-1/4 pr-10">
        {update ? (
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            className="w-auto"
            onClick={toggleViewModel}
          >
            Update Landfills
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<AddCircleOutlineIcon />}
            onClick={toggleViewModel}
          >
            Add Landfills
          </Button>
        )}
      </div>

      {viewModel && (
        <div className="z-20 fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-gray-800 bg-opacity-50">
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
                {update ? "Update Landfill" : "Add New Landfill"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleViewModel}
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
                    htmlFor="lfId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Landfill Id
                  </label>
                  <input
                    type="number"
                    name="lfId"
                    id="lfId"
                    value={lfId}
                    onChange={(e) => setLfId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter landfill id"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter the landfill name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="capacity"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter capacity"
                    required
                  />
                </div>
              
                  <div className="col-span-2">
                    <label
                      htmlFor="coordinate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      STS Coordinate
                    </label>

                    <LoadScript googleMapsApiKey={YOUR_API_KEY} libraries={["places"]}>
                      <Autocomplete
                        onLoad={(autocomplete) => {
                          setAutocomplete(autocomplete); // Set autocomplete variable
                        }}
                        onPlaceChanged={handlePlaceSelect} // Use handlePlaceSelect directly
                      >
                        <TextField
                          type="text"
                          name="coordinate"
                          id="coordinate"
                          value={coordinate}
                          onChange={(e) => setCoordinate(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Type STS coordinate"
                          required
                        />
                      </Autocomplete>
                    </LoadScript>

                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="operationTimespan"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Operation Timespan
                  </label>
                  <input
                    type="text"
                    name="operationTimespan"
                    id="operationTimespan"
                    value={operationTimespan}
                    onChange={(e) => setOperationTimespan(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter operation timespan"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="managerId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Manager Id
                  </label>
                  <input
                    type="text"
                    name="managerId"
                    id="managerId"
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter manager id"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Landfill" : "Add Landfill"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
