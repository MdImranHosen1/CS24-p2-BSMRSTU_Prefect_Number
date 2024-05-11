import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { getWorkForces, updateWorkForce } from "../../../redux/slices/WorkForcesSlice";

export const WorkForceForm = ({ update = 0, plan = {} }) => {
  const [viewPlanModel, setViewPlanModel] = useState(false);
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState(update ? plan?.employeeId : "");
  const [fullName, setFullName] = useState(update ? plan?.fullName : "");
  const [dateOfBirth, setDateOfBirth] = useState(update ? plan?.dateOfBirth : "");
  const [dateOfHire, setDateOfHire] = useState(update ? plan?.dateOfHire : "");
  const [jobTitle, setJobTitle] = useState(update ? plan?.jobTitle : "");
  const [paymentPerHour, setPaymentPerHour] = useState(update ? plan?.paymentPerHour : "");
  const [contactInfo, setContactInfo] = useState(update ? plan?.contactInfo : "");
  const [assignedRoute, setAssignedRoute] = useState(update ? plan?.assignedRoute : "");

  const toggleAddPlanView = () => {
    setViewPlanModel(!viewPlanModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const planData = {
      employeeId: employeeId,
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      dateOfHire: dateOfHire,
      jobTitle: jobTitle,
      paymentPerHour: paymentPerHour,
      contactInfo: contactInfo,
      assignedRoute: assignedRoute,
    };

    const planDataUp = {
      employeeId: employeeId,
      fullName: fullName,
      dateOfBirth: dateOfBirth,
      dateOfHire: dateOfHire,
      jobTitle: jobTitle,
      paymentPerHour: paymentPerHour,
      contactInfo: contactInfo,
      assignedRoute: assignedRoute,
    };

    if (update === 0) {
      dispatch(getWorkForces(planData));
      setEmployeeId("");
      setFullName("");
      setDateOfBirth("");
      setDateOfHire("");
      setJobTitle("");
      setPaymentPerHour("");
      setContactInfo("");
      setAssignedRoute("");
      toggleAddPlanView();
      alert("Plan Created Successfully");
    } else {
      dispatch(updateWorkForce({ planId: plan._id, planData: planDataUp }));
      toggleAddPlanView();
      alert("Plan Updated Successfully");
    }
    window.location.reload();
  };

  return (
    <div>
      <div className="">
        {update ? (
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            className="w-72"
            onClick={toggleAddPlanView}
          >
            Update Workforce
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={toggleAddPlanView}
          >
            Add Workforce
          </Button>
        )}
      </div>

      {viewPlanModel && (
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
                {update ? "Update Workforce" : "Add new Workforce"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleAddPlanView}
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
                    htmlFor="employeeId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Workforce ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Employee ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Full Name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="dateOfBirth"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Date of Birth"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="dateOfHire"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date of Hire
                  </label>
                  <input
                    type="date"
                    name="dateOfHire"
                    id="dateOfHire"
                    value={dateOfHire}
                    onChange={(e) => setDateOfHire(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Date of Hire"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="jobTitle"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Job Title"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="paymentPerHour"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Payment Per Hour
                  </label>
                  <input
                    type="number"
                    name="paymentPerHour"
                    id="paymentPerHour"
                    value={paymentPerHour}
                    onChange={(e) => setPaymentPerHour(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Payment Per Hour"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="contactInfo"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contact Info
                  </label>
                  <input
                    type="text"
                    name="contactInfo"
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Contact Info"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="assignedRoute"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Assigned Route
                  </label>
                  <input
                    type="text"
                    name="assignedRoute"
                    id="assignedRoute"
                    value={assignedRoute}
                    onChange={(e) => setAssignedRoute(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type Assigned Route"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Workforce" : "Add new Workforce"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
