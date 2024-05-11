import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/slices/usersSlice";
import { useEffect } from "react";
import Contractors3rdPartyCard from "./Contractors3rdPartyCard";
import { Contractors3rdPartyForm } from "./Contractors3rdPartyForm";
import { getContractors3rdParty } from "../../redux/slices/Contractors3rdPartySlice";



export const Contractors3rdPartyPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.contractors3rdParty);
  const users = data.data;
  
  useEffect(() => {
    dispatch(getContractors3rdParty());
  }, [dispatch]);



  return (
    <div className="w-screen flex">
      <div className=" w-1/4 p-5">
        <Contractors3rdPartyForm update={0}/>
      </div>
      <div className=" w-3/4 p-5">
        {users.map((value) => {
          return (
            <div className=" w-full mb-1 pr-3">
              <Contractors3rdPartyCard users={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
