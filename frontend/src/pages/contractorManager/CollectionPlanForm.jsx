import React, { useState } from "react";
import { Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useDispatch } from "react-redux";

export const CollectionPlanForm = () => {
    const [viewForm, setViewForm] = useState(false);
    const dispatch = useDispatch();
    const [areaOfCollection, setAreaOfCollection] = useState("");
    const [collectionStartTime, setCollectionStartTime] = useState("");
    const [durationForCollection, setDurationForCollection] = useState("");
    const [numberOfLaborers, setNumberOfLaborers] = useState("");
    const [numberOfVans, setNumberOfVans] = useState("");
    const [expectedWeightOfWaste, setExpectedWeightOfWaste] = useState("");

    const toggleViewForm = () => {
        setViewForm(!viewForm);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            areaOfCollection,
            collectionStartTime,
            durationForCollection,
            numberOfLaborers,
            numberOfVans,
            expectedWeightOfWaste
        };

        // Dispatch your action or handle form submission here

        toggleViewForm();
        alert("Form submitted successfully");
    };

    return (
        <div>
            <div className=" ">
                <Button
                    variant="contained"
                    onClick={toggleViewForm}
                >
                    Create Collection Plan
                </Button>
            </div>

            {viewForm && (
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
                                Collection Plan
                            </h3>
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8"
                                onClick={toggleViewForm}
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
                                        htmlFor="areaOfCollection"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Area of Collection
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
                                        htmlFor="collectionStartTime"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Collection Start Time
                                    </label>
                                    <input
                                        type="time"
                                        name="collectionStartTime"
                                        id="collectionStartTime"
                                        value={collectionStartTime}
                                        onChange={(e) => setCollectionStartTime(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="durationForCollection"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Duration for Collection
                                    </label>
                                    <input
                                        type="text"
                                        name="durationForCollection"
                                        id="durationForCollection"
                                        value={durationForCollection}
                                        onChange={(e) => setDurationForCollection(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type duration for collection"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="numberOfLaborers"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Number of Laborers
                                    </label>
                                    <input
                                        type="number"
                                        name="numberOfLaborers"
                                        id="numberOfLaborers"
                                        value={numberOfLaborers}
                                        onChange={(e) => setNumberOfLaborers(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="numberOfVans"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Number of Vans
                                    </label>
                                    <input
                                        type="number"
                                        name="numberOfVans"
                                        id="numberOfVans"
                                        value={numberOfVans}
                                        onChange={(e) => setNumberOfVans(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="expectedWeightOfWaste"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Expected Weight of Daily Solid Waste
                                    </label>
                                    <input
                                        type="text"
                                        name="expectedWeightOfWaste"
                                        id="expectedWeightOfWaste"
                                        value={expectedWeightOfWaste}
                                        onChange={(e) => setExpectedWeightOfWaste(e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                        placeholder="Type expected weight of waste"
                                        required
                                    />
                                </div>
                            </div>
                            <Button variant="contained" className="w-full" type="submit">
                                Submit
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
