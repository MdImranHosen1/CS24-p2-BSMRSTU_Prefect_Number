import React, { useState } from "react";
import { Button } from "@mui/material";
import { postUser, updateUser } from "../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { postContractorsManager, updateContractorsManager } from "../../redux/slices/ContractorManagerSlice";

export const ContractorManagerForm = ({ update = 1, user = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(update ? user?.fullName : "");
  const [userId, setUserId] = useState(update ? user?.userId : "");
  const [email, setEmail] = useState(update ? user?.email : "");
  const [accountCreationDate, setAccountCreationDate] = useState(update ? user?.date : "");
  const [contactNumber, setContactNumber] = useState(update ? user?.contactNumber : "");
  const [assignedContractorCompany, setAssignedContractorCompany] = useState(update ? user?.assignedContractorCompany : "");
  const [accessLevel, setAccessLevel] = useState(update ? user?.accessLevel : "");
  const [username, setUsername] = useState(update ? user?.userName : "");
  const [password, setPassword] = useState(update ? user?.password : "");

  const toggleAddUserView = () => {
    setViewUserModel(!viewUserModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      "fullName": fullName,
      "userId": userId,
      "email": email,
      "date": accountCreationDate,
      "contactNumber": contactNumber,
      "assignedContractorCompany": assignedContractorCompany,
      "accessLevel": accessLevel,
      "userName": username,
      "password": password,
    };

    const userDataUp = {
      "fullName": fullName,
      "userId": userId,
      "email": email,
      "date": accountCreationDate,
      "contactNumber": contactNumber,
      "assignedContractorCompany": assignedContractorCompany,
      "accessLevel": accessLevel,
      "userName": username,
      "password": password,
    };

    console.log("Update", update);

    if (update === 0) {
      dispatch(postContractorsManager(userData));
      setFullName("");
      setUserId("");
      setEmail("");
      setAccountCreationDate("");
      setContactNumber("");
      setAssignedContractorCompany("");
      setAccessLevel("");
      setUsername("");
      setPassword("");
      toggleAddUserView();
      alert("User Create Successfully");
    } else {

      console.log("updateASFDSAF", update, userDataUp);
      dispatch(updateContractorsManager({ userId: user._id, userData: userDataUp }));
      toggleAddUserView();
      alert("User Update Successfully");
    }
    window.location.reload();
  };

  return (
    <div>
      <div className=" ">
        {update ? (
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            className="w-72"
            onClick={toggleAddUserView}
          >
            Update Contractor Manager
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={toggleAddUserView}
          >
            Add Contractor Manager
          </Button>
        )}
      </div>

      {viewUserModel && (
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
                {update ? "Update Contractor Manager" : "Add Contractor Manager"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 "
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
                    htmlFor="userId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    User ID
                  </label>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type user id"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type email address"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="accountCreationDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Date of Account Creation
                  </label>
                  <input
                    type="date"
                    name="accountCreationDate"
                    id="accountCreationDate"
                    value={accountCreationDate}
                    onChange={(e) => setAccountCreationDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="contactNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type contact number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="assignedContractorCompany"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Assigned Contractor Company
                  </label>
                  <input
                    type="text"
                    name="assignedContractorCompany"
                    id="assignedContractorCompany"
                    value={assignedContractorCompany}
                    onChange={(e) => setAssignedContractorCompany(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type assigned contractor company"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="accessLevel"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Access Level
                  </label>
                  <input
                    type="text"
                    name="accessLevel"
                    id="accessLevel"
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type access level"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type username"
                    required
                  />
                </div>
                {!update && (
                  <div className="col-span-2">
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type password"
                      required
                    />
                  </div>
                )}
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Contractor Manager" : "Add Contractor Manager"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
