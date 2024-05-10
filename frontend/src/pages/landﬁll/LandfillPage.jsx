import * as React from "react";
import LandfillCard from "./LandfillCard";
import { LandfillForm } from "./LandfillForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLandfills } from "../../redux/slices/landfullSlice";


export const LandfillPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.landfill);
  const landfill = data.data;
  console.log(landfill);
  useEffect(() => {
    dispatch(getLandfills());
  }, [dispatch]);

  return (
    <div className="w-screen flex">
      <div className=" w-1/4 p-5">
        <LandfillForm />
      </div>
      <div className=" w-3/4 p-5">
        {landfill.map((value) => {
          return (
            <div className=" w-full mb-1 pr-3">
              <LandfillCard landfill={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
