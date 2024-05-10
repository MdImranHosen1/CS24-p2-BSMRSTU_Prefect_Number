import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

import UpdateIcon from "@mui/icons-material/Update";
import AddRoadTwoToneIcon from "@mui/icons-material/AddRoadTwoTone";
import { postPermission, updatePermission } from "../../redux/slices/permissionSlice";

export const PermissionForm = ({ update = 0, data = {} }) => {
  const [viewPermissionModel, setViewPermissionModel] = useState(false);

  const dispatch = useDispatch();
  const [name, setName] = useState(update ? data?.name : "");
  const [details, setDetails] = useState(update ? data?.details : "");

  const toggleAddView = () => {
    document.body.style.overflow = viewPermissionModel ? "auto" : "hidden";
    setViewPermissionModel(!viewPermissionModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const permissionData = {
      name: name,
      details: details,
    };

    if (update === 0) {
      dispatch(postPermission(permissionData));
      setName("");
      setDetails("");
    } else if (update === 1) {
      dispatch(
        updatePermission({
          permissionId: data._id,
          permissionData: permissionData,
        })
      );
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
              Update Permission
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<AddRoadTwoToneIcon />}
            onClick={toggleAddView}
          >
            Add Permission
          </Button>
        )}
      </div>

      {viewPermissionModel && (
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
                {update ? "Update Permission" : "Add New Permission"}
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
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Permission Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter permission name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="details"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Permission Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 resize-none"
                    placeholder="Enter permission details"
                    rows="4"
                    required
                  ></textarea>
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Permission" : "Add Permission"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
