import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/slices/usersSlice";
import { useEffect } from "react";

import { WorkForceForm } from "./WorkForceForm";
import WorkForceCard from "./WorkForceCard";




export const WorkForcePage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.users);
  //const users = data.data;
  const users = [
    {
      employeeId: 'E001',
      fullName: 'John Doe',
      dateOfBirth: 'January 1, 1980',
      dateOfHire: 'January 1, 2020',
      jobTitle: 'Collection Driver',
      paymentRatePerHour: 20.00,
      contactInformation: {
        email: 'johndoe@example.com',
        phoneNumber: '123-456-7890',
        address: '123 Main St, Anytown, USA'
      },
      assignedCollectionRoute: 'Route A'
    },
    {
      employeeId: 'E002',
      fullName: 'Jane Smith',
      dateOfBirth: 'February 2, 1990',
      dateOfHire: 'February 2, 2021',
      jobTitle: 'Collection Helper',
      paymentRatePerHour: 18.00,
      contactInformation: {
        email: 'janesmith@example.com',
        phoneNumber: '234-567-8901',
        address: '456 Oak St, Anytown, USA'
      },
      assignedCollectionRoute: 'Route B'
    },
    {
      employeeId: 'E003',
      fullName: 'Bob Johnson',
      dateOfBirth: 'March 3, 1995',
      dateOfHire: 'March 3, 2022',
      jobTitle: 'Collection Supervisor',
      paymentRatePerHour: 25.00,
      contactInformation: {
        email: 'bobjohnson@example.com',
        phoneNumber: '345-678-9012',
        address: '789 Pine St, Anytown, USA'
      },
      assignedCollectionRoute: 'Route C'
    }
  ];

  useEffect(() => {
    dispatch(getUsers());
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
