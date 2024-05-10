import React, { useState } from "react";
import { Button } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BusinessIcon from "@mui/icons-material/Business";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import { useDispatch } from "react-redux";

export const MonitoringTransportedWasteForm = () => {
  const [viewForm, setViewForm] = useState(false);
  const dispatch = useDispatch();
  const [timeAndDate, setTimeAndDate] = useState("");
  const [amountWaste, setAmountWaste] = useState("");
  const [thirdPartyContractorId, setThirdPartyContractorId] = useState("");
  const [typeOfWaste, setTypeOfWaste] = useState("");
  const [stsManagerId, setStsManagerId] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const toggleViewForm = () => {
    setViewForm(!viewForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      timeAndDate,
      amountWaste,
      thirdPartyContractorId,
      typeOfWaste,
      stsManagerId,
      vehicleType
    };

    // Dispatch your action or handle form submission here

    toggleViewForm();
    alert("Form submitted successfully");
  };

  return (
    <div>
      <div className=" flex flex-shrink mt-3">
        <Button
          variant="contained"
          
          startIcon={<DateRangeIcon />}
          onClick={toggleViewForm}
        >
         Add Monitor Transported Waste
        </Button>
      </div>

      {viewForm && (
        <div className="z-20 fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div
            style={{
              maxHeight: "calc(100vh - 20px)",
              overflowY: "auto",
              width: "80%",
              maxWidth: "800px",
            }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Monitoring Transported Waste
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleViewForm}
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
                    htmlFor="timeAndDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Time and Date
                  </label>
                  <input
                    type="datetime-local"
                    name="timeAndDate"
                    id="timeAndDate"
                    value={timeAndDate}
                    onChange={(e) => setTimeAndDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="amountWaste"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Amount of Waste
                  </label>
                  <input
                    type="text"
                    name="amountWaste"
                    id="amountWaste"
                    value={amountWaste}
                    onChange={(e) => setAmountWaste(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type amount of waste"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="thirdPartyContractorId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Third Party Contractor ID
                  </label>
                  <input
                    type="text"
                    name="thirdPartyContractorId"
                    id="thirdPartyContractorId"
                    value={thirdPartyContractorId}
                    onChange={(e) => setThirdPartyContractorId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type third party contractor ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="typeOfWaste"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Type of Waste
                  </label>
                  <input
                    type="text"
                    name="typeOfWaste"
                    id="typeOfWaste"
                    value={typeOfWaste}
                    onChange={(e) => setTypeOfWaste(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type type of waste"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="stsManagerId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    STS Manager ID
                  </label>
                  <input
                    type="text"
                    name="stsManagerId"
                    id="stsManagerId"
                    value={stsManagerId}
                    onChange={(e) => setStsManagerId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type STS manager ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="vehicleType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Vehicle Type
                  </label>
                  <input
                    type="text"
                    name="vehicleType"
                    id="vehicleType"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type vehicle type"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
