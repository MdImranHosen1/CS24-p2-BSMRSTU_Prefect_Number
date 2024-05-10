import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { postUser, updateUser } from "../../redux/slices/usersSlice";
import { useDispatch } from "react-redux";
import UpdateIcon from "@mui/icons-material/Update";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

export const Contractors3rdPartyForm = ({ update = 0, user = {} }) => {
  const [viewUserModel, setViewUserModel] = useState(false);
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState(update ? user?.companyName : "");
  const [contractId, setContractId] = useState(update ? user?.contractId : "");
  const [registrationId, setRegistrationId] = useState(update ? user?.registrationId : "");
  const [registrationDate, setRegistrationDate] = useState(update ? user?.registrationDate : "");
  const [tin, setTin] = useState(update ? user?.tin : "");
  const [contactNumber, setContactNumber] = useState(update ? user?.contactNumber : "");
  const [workforceSize, setWorkforceSize] = useState(update ? user?.workforceSize : "");
  const [paymentPerTonnage, setPaymentPerTonnage] = useState(update ? user?.paymentPerTonnage : "");
  const [wastePerDay, setWastePerDay] = useState(update ? user?.wastePerDay : "");
  const [contractDuration, setContractDuration] = useState(update ? user?.contractDuration : "");
  const [areaOfCollection, setAreaOfCollection] = useState(update ? user?.areaOfCollection : "");
  const [designatedSts, setDesignatedSts] = useState(update ? user?.designatedSts : "");

  const toggleAddUserView = () => {
    setViewUserModel(!viewUserModel);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      companyName,
      contractId,
      registrationId,
      registrationDate,
      tin,
      contactNumber,
      workforceSize,
      paymentPerTonnage,
      wastePerDay,
      contractDuration,
      areaOfCollection,
      designatedSts,
    };

    const userDataUp = {
      companyName,
      contractId,
      registrationId,
      registrationDate,
      tin,
      contactNumber,
      workforceSize,
      paymentPerTonnage,
      wastePerDay,
      contractDuration,
      areaOfCollection,
      designatedSts,
    };

    if (update === 0) {
      dispatch(postUser(userData));
      setCompanyName("");
      setContractId("");
      setRegistrationId("");
      setRegistrationDate("");
      setTin("");
      setContactNumber("");
      setWorkforceSize("");
      setPaymentPerTonnage("");
      setWastePerDay("");
      setContractDuration("");
      setAreaOfCollection("");
      setDesignatedSts("");
      toggleAddUserView();
      alert("User Create Successfully");
    } else if (update === 1) {
      dispatch(updateUser({ userId: user._id, userData: userDataUp }));
      toggleAddUserView();
      alert("User Update Successfully");
    }
    window.location.reload();
  };

  return (
    <div>
      <div className="">
        {update ? (
          <Button
            variant="contained"
            startIcon={<UpdateIcon />}
            className="w-72"
            onClick={toggleAddUserView}
          >
            Update 3rd party contractor
          </Button>
        ) : (
          <Button
            variant="contained"
            className="w-full"
            startIcon={<PersonAddAlt1OutlinedIcon />}
            onClick={toggleAddUserView}
          >
            Add 3rd party contractor
          </Button>
        )}
      </div>

      {viewUserModel && (
        <div className="z-20 fixed top-0 right-0 bottom-0 left-0 z-100 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div
            style={{
              maxHeight: "calc(100vh - 20px)",
              overflowY: "auto",
              width: "80%",
              maxWidth: "800px",
            }}
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {update ? "Update 3rd party contractor" : "Add 3rd party contractor"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                onClick={toggleAddUserView}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="companyName"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name of the company
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type company name"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="contractId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contract ID
                  </label>
                  <input
                    type="text"
                    name="contractId"
                    id="contractId"
                    value={contractId}
                    onChange={(e) => setContractId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type contract ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="registrationId"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Registration ID
                  </label>
                  <input
                    type="text"
                    name="registrationId"
                    id="registrationId"
                    value={registrationId}
                    onChange={(e) => setRegistrationId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type registration ID"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="registrationDate"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Registration Date
                  </label>
                  <input
                    type="date"
                    name="registrationDate"
                    id="registrationDate"
                    value={registrationDate}
                    onChange={(e) => setRegistrationDate(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="tin"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    TIN of the company
                  </label>
                  <input
                    type="text"
                    name="tin"
                    id="tin"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type TIN"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="contactNumber"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contact number
                  </label>
                  <input
                    type="text"
                    name="contactNumber"
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type contact number"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="workforceSize"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Workforce size
                  </label>
                  <input
                    type="number"
                    name="workforceSize"
                    id="workforceSize"
                    value={workforceSize}
                    onChange={(e) => setWorkforceSize(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type workforce size"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="paymentPerTonnage"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Payment per tonnage of waste
                  </label>
                  <input
                    type="number"
                    name="paymentPerTonnage"
                    id="paymentPerTonnage"
                    value={paymentPerTonnage}
                    onChange={(e) => setPaymentPerTonnage(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type payment per tonnage"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="wastePerDay"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    The required amount of waste per day
                  </label>
                  <input
                    type="number"
                    name="wastePerDay"
                    id="wastePerDay"
                    value={wastePerDay}
                    onChange={(e) => setWastePerDay(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type waste per day"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="contractDuration"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Contract duration
                  </label>
                  <input
                    type="text"
                    name="contractDuration"
                    id="contractDuration"
                    value={contractDuration}
                    onChange={(e) => setContractDuration(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type contract duration"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="areaOfCollection"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Area of collection
                  </label>
                  <input
                    type="text"
                    name="areaOfCollection"
                    id="areaOfCollection"
                    value={areaOfCollection}
                    onChange={(e) => setAreaOfCollection(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type area of collection"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="designatedSts"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Designated STS
                  </label>
                  <input
                    type="text"
                    name="designatedSts"
                    id="designatedSts"
                    value={designatedSts}
                    onChange={(e) => setDesignatedSts(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Type designated STS"
                    required
                  />
                </div>
              </div>
              <Button variant="contained" className="w-full" type="submit">
                {update ? "Update 3rd party contractor" : "Add new 3rd party contractor"}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
