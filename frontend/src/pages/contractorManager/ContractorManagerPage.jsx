import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ContractorManagerForm } from "./ContractorManagerForm";
import ContractorManagerCard from "./ContractorManagerCard";
import { getContractorsManager } from "../../redux/slices/ContractorManagerSlice";
import { WorkForcePage } from "../3rdPartyContractor/workForce/WorkForcePage";


export const ContractorManagerPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.contractorsManager);
  const users = data.data;



  useEffect(() => {
    dispatch(getContractorsManager());
  }, [dispatch]);

  return (
    <div className="w-screen flex">
      <div className=" w-1/4 p-5">
        <ContractorManagerForm update={0} />

      </div>
      <div className=" w-3/4 p-5">
        {users.map((value) => {
          return (
            <div className=" w-full mb-1 pr-3">
              <ContractorManagerCard users={value} />
            </div>
          );
        })}
      </div>
      
    </div>
  );
};
