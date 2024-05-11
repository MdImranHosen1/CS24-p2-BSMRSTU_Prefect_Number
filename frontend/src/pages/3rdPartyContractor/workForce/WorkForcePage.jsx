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

  const data = useSelector((state) => state.users);
  const users = data.data;
  
  useEffect(() => {
    dispatch(getWorkForces());
  }, [dispatch]);

  return (
    <div className="w-screen flex">
        
      <div className=" w-1/4 p-5">
        <WorkForceForm update={0}/>
      </div>
      <div className=" w-3/4 p-5">
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
