import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBills } from "./../../redux/slices/billSlice";
import { getTransactions } from "./../../redux/slices/transactionsSlice";

export const Dashboard = () => {
  const dispatch = useDispatch();

  const bData = useSelector((state) => state.bills);
  const tData = useSelector((state) => state.transactions);

  const billsData = bData.data;
  const transData = tData.data;

  useEffect(() => {
    dispatch(getBills());
    dispatch(getTransactions());
  }, [dispatch]);

  const calculateTotalWeight = (data) => {
    return data.reduce((total, item) => total + item.weightWaste, 0);
  };

  const calculateTotalDistance = (data) => {
    return data.reduce((total, item) => total + item.travelDistance, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Bills Data</h2>
        {billsData.map((bill) => (
          <div key={bill._id} className="bg-gray-100 p-4 rounded-md mb-4">
            <p>
              <span className="font-bold">Arrival Time:</span>{" "}
              {bill.arrivalTime ? bill.arrivalTime : "N/A"}
            </p>
            <p>
              <span className="font-bold">Departure Time:</span>{" "}
              {bill.departureTime ? bill.departureTime : "N/A"}
            </p>
            <p>
              <span className="font-bold">Total Fuel Cost:</span>{" "}
              {bill.totalFuelCost}
            </p>
            {/* Add more bill data as needed */}
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Transactions Data</h2>
        {transData.map((transaction) => (
          <div
            key={transaction._id}
            className="bg-gray-100 p-4 rounded-md mb-4"
          >
            <p>
              <span className="font-bold">Arrival Time:</span>{" "}
              {transaction.arrivalTime ? transaction.arrivalTime : "N/A"}
            </p>
            <p>
              <span className="font-bold">Departure Time:</span>{" "}
              {transaction.departureTime ? transaction.departureTime : "N/A"}
            </p>
            <p>
              <span className="font-bold">LF Number:</span> {transaction.lfNum}
            </p>
            {/* Add more transaction data as needed */}
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <p>
          <span className="font-bold">Total Weight of Waste:</span>{" "}
          {calculateTotalWeight(billsData)} kg
        </p>
        <p>
          <span className="font-bold">Total Travel Distance:</span>{" "}
          {calculateTotalDistance(transData)} km
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
