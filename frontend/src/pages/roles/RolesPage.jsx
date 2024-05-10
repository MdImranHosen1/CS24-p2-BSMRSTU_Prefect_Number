import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../redux/slices/rolesSlice";
import { RoleForm } from "./RolesForm";
import { RoleCard } from './RoleCard';


export const RolesPage = () => {
  const data = useSelector((state) => state.roles);
  const roles = data.data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <div className="w-1/4 p-5">
        <RoleForm />
      </div>
      <div className="w-3/4">
        <div className="mt-5 mb-10 text-3xl font-bold tracking-tight">
          Roles in Dhaka North City Corporation
        </div>
        {roles.map((value) => {
          return (
            <div className="p-2" key={value._id}>
              <RoleCard role={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
