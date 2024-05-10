import { Button } from '@mui/material';
import React from 'react'

const RolesAssignPermissionPage = () => {
  const handleSubmit = (event) => {
    
    
  };

  return (
    <div className=" fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center">
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
              Assigning  Permissions
              </h3>
              
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="stsName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role Name
                  </label>
                  <input
                    type="text"
                    name="stsName"
                    id="stsName"
                    //value={stsName}
                    //onChange={(e) => setStsName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Landfill name"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label
                    htmlFor="travelRoute"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Permission
                  </label>
                  <select
                    id="travelRoute"
                    //value={travelRoute}
                    //onChange={(e) => setTravelRoute(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  >
                    <option value="Route number -1">Permission-1</option>
                    <option value="Route number -2">Permission -2</option>
                    <option value="Route number -2">Permission -3</option>
                  </select>
                </div>
              </div>
              
              <Button variant="contained" className="w-full" type="submit">
              Assign Permissions
              </Button>
            </form>
          </div>
        </div>
  ) 
}

export default RolesAssignPermissionPage
