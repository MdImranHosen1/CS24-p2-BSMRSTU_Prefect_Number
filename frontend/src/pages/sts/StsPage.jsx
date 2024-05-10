import * as React from "react";
import StsCard from "./StsCard";
import { StsForm } from "./StsForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSts } from "../../redux/slices/stsSlice";
import { useEffect } from "react";

export const StsPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.sts);
  const sts = data.data;
  
  useEffect(() => {
    dispatch(getSts());
  }, [dispatch]);

  return (
    <div className="w-screen flex">
      <div className=" w-1/4 p-5">
        <StsForm />
      </div>
      <div className=" w-3/4 p-5">
        {sts.map((value) => {
          return (
            <div className=" w-full mb-1 pr-3">
              <StsCard sts={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
