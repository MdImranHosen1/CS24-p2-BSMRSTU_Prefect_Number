import React from "react";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";

export default function WasteMonitorCard({ Data }) {
    return (
        <>
            {Data.map((data, index) => (
                <div key={index} className="flex items-center w-full bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-200 mb-4">
                    <div className="p-5">
                        <b>
                            <h4 className="mb-1">Waste Amount: {data.amountOfWaste}</h4>
                            <h4 className="mb-1">Contractor Id: {data.contractorId}</h4>
                            <h4 className="mb-1">Waste Type: {data.wasteType}</h4>
                            <h4 className="mb-1">Designated STS: {data.designatedSts}</h4>
                            <h4 className="mb-1">Vehicle Type: {data.vehicleType}</h4>
                           
                        </b>
                    </div>
                </div>
            ))}
        </>
    );
}
