import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../redux/slices/usersSlice";
import { useEffect } from "react";
import { ContractorManagerForm } from "./ContractorManagerForm";
import ContractorManagerCard from "./ContractorManagerCard";


export const ContractorManagerPage = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.users);
  // const users = data.data;
  const users = [
    {
      fullName: 'John Doe',
      userId: '001',
      email: 'john.doe@example.com',
      dateOfAccountCreation: 'January 1, 2022',
      contactNumber: '123-456-7890',
      assignedContractorCompany: 'ABC Contracting Inc.',
      accessLevel: 'Standard User',
      username: 'johndoe'
    },
    {
      fullName: 'Jane Smith',
      userId: '002',
      email: 'jane.smith@example.com',
      dateOfAccountCreation: 'January 2, 2022',
      contactNumber: '234-567-8901',
      assignedContractorCompany: 'XYZ Contractors Ltd.',
      accessLevel: 'Administrator',
      username: 'janesmith'
    },
    {
      fullName: 'Bob Johnson',
      userId: '003',
      email: 'bob.johnson@example.com',
      dateOfAccountCreation: 'January 3, 2022',
      contactNumber: '345-678-9012',
      assignedContractorCompany: '123 Builders Inc.',
      accessLevel: 'Standard User',
      username: 'bobjohnson'
    },
    {
      fullName: 'Alice Williams',
      userId: '004',
      email: 'alice.williams@example.com',
      dateOfAccountCreation: 'January 4, 2022',
      contactNumber: '456-789-0123',
      assignedContractorCompany: 'ABC Contracting Inc.',
      accessLevel: 'Standard User',
      username: 'alicewilliams'
    },
    {
      fullName: 'Charlie Brown',
      userId: '005',
      email: 'charlie.brown@example.com',
      dateOfAccountCreation: 'January 5, 2022',
      contactNumber: '567-890-1234',
      assignedContractorCompany: 'XYZ Contractors Ltd.',
      accessLevel: 'Standard User',
      username: 'charliebrown'
    }
  ];
  

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="w-screen flex">
      <div className=" w-1/4 p-5">
        <ContractorManagerForm update={0}/>
        
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
