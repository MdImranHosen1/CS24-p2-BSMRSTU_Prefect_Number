import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/slices/usersSlice";
import { useEffect } from "react";

import { WorkForceForm } from "./WorkForceForm";
import WorkForceCard from "./WorkForceCard";
import { getWorkForces } from "../../../redux/slices/WorkForcesSlice";




export const WorkForcePage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.workForces);
  const users = data.data;

  useEffect(() => {
    dispatch(getWorkForces());
  }, [dispatch]);

  return (
    <div className="w-screen flex">

      <div className=" w-1/4 p-5">
        <WorkForceForm update={0} />
      </div>
      <div className=" w-3/4 p-5">
        <div className=" bg-slate-600 text-[24px] p-2 mr-4 rounded-t-xl font-bold text-white flex justify-center">Workforces List</div>
        {users.map((value) => {
          return (
            <div className=" w-full mb-1 pr-3">
              <WorkForceCard users={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
