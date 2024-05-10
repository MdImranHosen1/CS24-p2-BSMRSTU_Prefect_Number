import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
// import { postEmployee, updateEmployee } from "../../../redux/slices/employeesSlice";
import { useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

export const WorkForceForm = ({ update = 0, employee = {} }) => {
  const [viewEmployeeModel, setViewEmployeeModel] = useState(false);
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState(update ? employee?.employeeId : "");
  const [fullName, setFullName] = useState(update ? employee?.fullName : "");
  const [dateOfBirth, setDateOfBirth] = useState(update ? employee?.dateOfBirth : "");
  const [dateOfHire, setDateOfHire] = useState(update ? employee?.dateOfHire : "");
  const [jobTitle, setJobTitle] = useState(update ? employee?.jobTitle : "");
  const [paymentRatePerHour, setPaymentRatePerHour] = useState(update ? employee?.paymentRatePerHour : "");
  const [email, setEmail] = useState(update ? employee?.contactInformation?.email : "");
  const [phoneNumber, setPhoneNumber] = useState(update ? employee?.contactInformation?.phoneNumber : "");
  const [address, setAddress] = useState(update ? employee?.contactInformation?.address : "");
  const [assignedCollectionRoute, setAssignedCollectionRoute] = useState(update ? employee?.assignedCollectionRoute : "");

  const toggleAddEmployeeView = () => {
    setViewEmployeeModel(!viewEmployeeModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const employeeData = {
      employeeId,
      fullName,
      dateOfBirth,
      dateOfHire,
      jobTitle,
      paymentRatePerHour,
      contactInformation: {
        email,
        phoneNumber,
        address
      },
      assignedCollectionRoute
    };

    const employeeDataUp = {
      employeeId,
      fullName,
      dateOfBirth,
      dateOfHire,
      jobTitle,
      paymentRatePerHour,
      contactInformation: {
        email,
        phoneNumber,
        address
      },
      assignedCollectionRoute
    };

    if (update === 0) {
      // dispatch(postEmployee(employeeData));
      setEmployeeId("");
      setFullName("");
      setDateOfBirth("");
      setDateOfHire("");
      setJobTitle("");
      setPaymentRatePerHour("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setAssignedCollectionRoute("");
      toggleAddEmployeeView();
      alert("Employee added successfully");
    } else if (update === 1) {
      // dispatch(updateEmployee({ employeeId: employee._id, employeeData: employeeDataUp }));
      toggleAddEmployeeView();
      alert("Employee updated successfully");
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
            onClick={toggleAddEmployeeView}
          >
            Update Employee
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={toggleAddEmployeeView}
          >
            Add Employee
          </Button>
        )}
      </div>

      {viewEmployeeModel && (
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
                {update ? "Update Employee" : "Add Employee"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleAddEmployeeView}
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
                    Employee ID
                  </label>
                  <input
                    type="text"
                    name="employeeId"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type employee ID"
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
                    placeholder="Type full name"
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
                    placeholder="Type job title"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="paymentRatePerHour"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Payment Rate Per Hour
                  </label>
                  <input
                    type="number"
                    name="paymentRatePerHour"
                    id="paymentRatePerHour"
                    value={paymentRatePerHour}
                    onChange={(e) => setPaymentRatePerHour(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type payment rate per hour"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type email"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type phone number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type address"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="assignedCollectionRoute"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Assigned Collection Route
                  </label>
                  <input
                    type="text"
                    name="assignedCollectionRoute"
                    id="assignedCollectionRoute"
                    value={assignedCollectionRoute}
                    onChange={(e) => setAssignedCollectionRoute(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type assigned collection route"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Employee" : "Add new Employee"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
