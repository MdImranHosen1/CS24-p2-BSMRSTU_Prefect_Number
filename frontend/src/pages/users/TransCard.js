import React from "react";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";

export default function TransCard({ tranData }) {
    return (
        <>
            {tranData.map((data, index) => (
                <div key={index} className="flex items-center w-full bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-200 mb-4">
                    <div className="p-5">
                        <b>
                            <h4 className="mb-1">LF Number: {data.lfNum}</h4>
                            <h4 className="mb-1">Vehicle Registration Number: {data.vehRegNum}</h4>
                            <h4 className="mb-1">Weight of Waste: {data.weightWaste}</h4>
                            <h4 className="mb-1">Arrival Time: {data.arrivalTime}</h4>
                            <h4 className="mb-1">Departure Time: {data.departureTime}</h4>
                            <h4 className="mb-1">Travel Distance: {data.travelDistance}</h4>
                        </b>

                    </div>
                </div>
            ))}
        </>
    );
}
