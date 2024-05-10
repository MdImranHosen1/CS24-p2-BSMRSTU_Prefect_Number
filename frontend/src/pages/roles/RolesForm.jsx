import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { postRole, updateRole } from "../../redux/slices/rolesSlice";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";

export const RoleForm = ({ update = 0, data = {} }) => {
  const [viewRoleModel, setViewRoleModel] = useState(false);

  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState(update ? data?.roleName : "");
  const [roleDetails, setRoleDetails] = useState(
    update ? data?.roleDetails : ""
  );
  const [roleAssign, setRoleAssign] = useState(update ? data?.roleAssign : "");

  const toggleAddView = () => {
    document.body.style.overflow = viewRoleModel ? "auto" : "hidden";
    setViewRoleModel(!viewRoleModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const roleData = {
      roleName: roleName,
      roleDetails: roleDetails,
      roleAssign: roleAssign,
    };

    if (update === 0) {
      dispatch(postRole(roleData));
      setRoleName("");
      setRoleDetails("");
      setRoleAssign("");
    } else if (update === 1) {
      dispatch(updateRole({ roleId: data._id, roleData: roleData }));
      window.location.reload(); 
    }
    toggleAddView();
    
  };

  return (
    <div>
      <div className="fixed w-1/4 pr-10">
        {update ? (
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            className="w-auto"
            onClick={toggleAddView}
          >
            Update Role
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<AddIcon />}
            onClick={toggleAddView}
          >
            Add Role
          </Button>
        )}
      </div>

      {viewRoleModel && (
        <div className="z-20 fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div
            style={{
              maxHeight: "calc(100vh - 20px)",
              overflowY: "auto",
              width: "80%",
              maxWidth: "800px",
            }}
            className="bg-white rounded-lg shadow-lg p-6 max-h-full overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {update ? "Update Role" : "Add New Role"}
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
              <div className="grid gap-4 mb-4 grid-cols-1">
                <div>
                  <label
                    htmlFor="roleName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role Name
                  </label>
                  <input
                    type="text"
                    name="roleName"
                    id="roleName"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter role name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="roleDetails"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role Details
                  </label>
                  <textarea
                    type="text"
                    name="roleDetails"
                    id="roleDetails"
                    value={roleDetails}
                    onChange={(e) => setRoleDetails(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter role details"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="roleAssign"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role Assign
                  </label>
                  <input
                    type="text"
                    name="roleAssign"
                    id="roleAssign"
                    value={roleAssign}
                    onChange={(e) => setRoleAssign(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter role assign"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update Role" : "Add Role"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
