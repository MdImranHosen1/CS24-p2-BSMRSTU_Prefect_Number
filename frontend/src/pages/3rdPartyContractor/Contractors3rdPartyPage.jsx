import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/slices/usersSlice";
import { useEffect } from "react";
import Contractors3rdPartyCard from "./Contractors3rdPartyCard";
import { Contractors3rdPartyForm } from "./Contractors3rdPartyForm";


export const Contractors3rdPartyPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.users);
  //const users = data.data;
  const users = [
    {
      companyName: 'ABC Contracting Inc.',
      contractId: 'C001',
      registrationId: 'R001',
      registrationDate: 'January 1, 2022',
      tin: '123-456-7890',
      contactNumber: '123-456-7890',
      workforceSize: 100,
      paymentPerTonnage: 50.00,
      requiredWastePerDay: 100.00,
      contractDuration: '1 year',
      areaOfCollection: 'City A',
      designatedSts: 'STS A'
    },
    {
      companyName: 'XYZ Contractors Ltd.',
      contractId: 'C002',
      registrationId: 'R002',
      registrationDate: 'January 2, 2022',
      tin: '234-567-8901',
      contactNumber: '234-567-8901',
      workforceSize: 150,
      paymentPerTonnage: 55.00,
      requiredWastePerDay: 150.00,
      contractDuration: '2 years',
      areaOfCollection: 'City B',
      designatedSts: 'STS B'
    },
    {
      companyName: '123 Builders Inc.',
      contractId: 'C003',
      registrationId: 'R003',
      registrationDate: 'January 3, 2022',
      tin: '345-678-9012',
      contactNumber: '345-678-9012',
      workforceSize: 200,
      paymentPerTonnage: 60.00,
      requiredWastePerDay: 200.00,
      contractDuration: '3 years',
      areaOfCollection: 'City C',
      designatedSts: 'STS C'
    }
  ];

  useEffect(() => {
    dispatch(getUsers());
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
