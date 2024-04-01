import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPermissions } from "../../redux/slices/permissionSlice";
import { PermissionForm } from "./PermissionForm";
import PermissionCard from "./PermissionCard";

export const PermissionsPage = () => {
  const permissionsData = useSelector((state) => state.permissions);
  const permissions = permissionsData.data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPermissions());
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <div className="w-1/4 p-5">
        <PermissionForm />
      </div>
      <div className="w-3/4 pl-10">
        <div className="mt-5 mb-10 text-3xl font-bold tracking-tight">
          Permissions Management
        </div>
        {permissions.map((permission) => (
          <div className="p-2" key={permission.id}>
            <PermissionCard permission={permission} />
          </div>
        ))}
      </div>
    </div>
  );
};
