import React, { useEffect, useState } from "react";
import { VehicleCard } from "./VehicleCard";
import { useDispatch, useSelector } from "react-redux";
import { VehiclesForm } from "./VehiclesForm";
import { getVehicles } from "../../redux/slices/vehiclesSlice";

export const VehiclesAllPage = () => {

  const dispatch = useDispatch();
  const data = useSelector((state) => state.vehicles);
  const vehicles = data.data;


  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const [sortBy, setSortBy] = useState('');
  const [isAscending, setIsAscending] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState('regNum');

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  useEffect(() => {
    setFilteredVehicles(vehicles)
  }, [vehicles]);

  useEffect(() => {
    const filtered = vehicles.filter((vehicle) =>
      vehicle[searchField].toString().toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [searchQuery, searchField, vehicles]);

  const handleSort = (key) => {
    setSortBy(key);
    setIsAscending(!isAscending);

    const sortedVehicles = [...filteredVehicles].sort((a, b) => {
      const valueA = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
      const valueB = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];
      if (valueA < valueB) {
        return isAscending ? -1 : 1;
      }
      if (valueA > valueB) {
        return isAscending ? 1 : -1;
      }
      return 0;
    });

    // Update the state with the sorted vehicles
    setFilteredVehicles(sortedVehicles);
  };


  const [isDropdownOpenSearch, setIsDropdownOpenSearch] = useState(false);
  const [isDropdownOpenSort, setIsDropdownOpenSort] = useState(false);

  const handleDropdownToggleSearch = () => {
    setIsDropdownOpenSearch(!isDropdownOpenSearch);
    setIsDropdownOpenSort(false);
  };
  const handleDropdownToggleSort = () => {
    setIsDropdownOpenSort(!isDropdownOpenSort);
    setIsDropdownOpenSearch(false);
  };

  const dropdownOptions = [
    { value: "capacity", label: "Capacity" },
    { value: "costLoaded", label: "Cost Loaded" },
    { value: "regNum", label: "Registration Num" },
    { value: "stsID", label: "STS ID" },
    { value: "type", label: "Type" },
  ];

  const handleDropdownSelectSearch = (key) => {
    setSearchField(key);
    handleDropdownToggleSearch(false);
    handleDropdownToggleSort(false);
  };

  const handleDropdownSelectSort = (key) => {


    handleSort(key);
    handleDropdownToggleSearch(false);
    handleDropdownToggleSort(false);
  };

  return (
    <div className="flex w-full">
      <div className=" w-1/4 p-5">
        <VehiclesForm></VehiclesForm>
        {/* Search vehicle */}
        <div className="mt-14">
          <form className="max-w-lg mx-auto">
            <div className="flex">
              <label
                htmlFor="search-dropdown"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search by:
              </label>
              <button
                onClick={handleDropdownToggleSearch}
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
                type="button"
              >
                {dropdownOptions.find(option => option.value === searchField)?.label || "Registration Num"}
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul
                id="dropdown"
                className={`z-10 ${isDropdownOpenSearch ? "absolute" : "hidden"
                  } bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
              >
                {dropdownOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleDropdownSelectSearch(option.value)}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 focus:border-blue-500"
                  placeholder={`Search by ${dropdownOptions.find(option => option.value === searchField)?.label || "Registration Num"}...`}
                  required
                />
              </div>
            </div>
          </form>
        </div>
        {/* Sort vehicles */}
        <div className=" flex flex-grow mt-3">
          <button
            onClick={handleDropdownToggleSort}
            className="flex flex-grow text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
            type="button"
          >
            Sort by {dropdownOptions.find(option => option.value === sortBy)?.label || "Registration Num"}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <ul
            id="dropdown"
            className={`z-10 ${isDropdownOpenSort ? "absolute" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 flex flex-col flex-grow`}
          >
            {dropdownOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleDropdownSelectSort(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" w-3/4">
        <div class="mt-5 mb-10 text-3xl font-bold tracking-tight ">
          Waste Management Vehicles in Dhaka North City Corporation
        </div>
        {filteredVehicles.map((vehicle) => {
          return (
            <div className=" p-2">
              <VehicleCard vehicles={vehicle} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
