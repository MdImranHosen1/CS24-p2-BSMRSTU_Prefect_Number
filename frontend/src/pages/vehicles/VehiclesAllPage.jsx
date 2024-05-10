import React, { useEffect } from "react";
import { VehicleCard } from "./VehicleCard";
import { useDispatch, useSelector } from "react-redux";
import { VehiclesForm } from "./VehiclesForm";
import { getVehicles } from "../../redux/slices/vehiclesSlice";


export const VehiclesAllPage = () => {
  const data = useSelector((state) => state.vehicles);
  const vehicles = data.data;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  return (
    <div className="flex w-full">
      <div className=" w-1/4 p-5">
        <VehiclesForm></VehiclesForm>
      </div>
      <div className=" w-3/4">
        <div class="mt-5 mb-10 text-3xl font-bold tracking-tight ">
          Waste Management Vehicles in Dhaka North City Corporation
        </div>
        {vehicles.map((value) => {
          return (
            <div className=" p-2">
              <VehicleCard vehicles={value} />
            </div>
          );
        })}
        
      </div>
    </div>
  );
};
