import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { postUser, updateUser } from "../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

export const UserForm = ({ update = 0, user = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);
  const dispatch = useDispatch();
  const [name, setName] = useState(update ? user?.userName : "");
  const [password, setPassword] = useState(update ? user?.userPassword : "");
  const [userType, setUserType] = useState(
    update ? user.userName : "Unassigned"
  );
  const [phone, setPhone] = useState(update ? user?.userPhone : "");
  const [email, setEmail] = useState(update ? user?.userEmail : "");
  const [stsOrLandfillNum, setStsOrLandfillNum] = useState(
    update ? user?.stsOrLandfillNum : ""
  );
  const toggleAddUserView = () => {
    setViewUserModel(!viewUserModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      userName: name,
      userPassword: password,
      userType: userType,
      userRoles: [],
      userPhone: phone,
      userEmail: email,
      stsOrLandfillNum: stsOrLandfillNum,
    };

    const userDataUp = {
      userName: name,
      userType: userType,
      userRoles: [],
      userPhone: phone,
      userEmail: email,
      stsOrLandfillNum: stsOrLandfillNum,
    };

    if (update === 0) {
      dispatch(postUser(userData));
      setName("");
      setPassword("");
      setUserType("Unassigned");
      setPhone("");
      setEmail("");
      setStsOrLandfillNum("");
      toggleAddUserView();
      alert("User Create Successfully");
    } else if (update === 1) {
      dispatch(updateUser({ userId: user._id, userData: userDataUp }));
      toggleAddUserView();
      alert("User Update Successfully");
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
            onClick={toggleAddUserView}
          >
            Update User
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={toggleAddUserView}
          >
            Add User
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
                {update ? "Update User" : "Add new users"}
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
                    placeholder="Type user name"
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
                      placeholder="Type user password"
                      required
                    />
                  </div>
                )}

                <div className="col-span-2">
                  <label
                    htmlFor="userType"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    User type
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Landfill Manager">Landfill Manager</option>
                    <option value="STS Manager">STS Manager</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type user phone number"
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
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type user Email"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="stsOrLandfillNum"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    STS or Landfill Number
                  </label>
                  <input
                    type="number"
                    name="stsOrLandfillNum"
                    id="stsOrLandfillNum"
                    value={stsOrLandfillNum}
                    onChange={(e) => setStsOrLandfillNum(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type STS or Landfill number"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update User" : "Add new users"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
