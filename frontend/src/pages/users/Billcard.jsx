import * as React from "react";
import { Link } from "react-router-dom";
import img from "./../../assets/user.png";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";
import MyMap from "../../components/MyMap";

export default function Billcard({ event }) {
    return (
        <div class="flex items-center w-full bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-200">
            <div className="rounded-md object-cover rounded-t-lg h-full w-1/3 p-2">
                {/* You can add a map or any other visual representation here */}
                {/* <MyMap coordinate={event.coordinate} /> */}
            </div>

            <div class="flex justify-between w-full">
                <div class="p-5">
                    <b>
                        <h1 class="mb-1">STS Number: {event.stsNum}</h1>
                        <h4 class="mb-1">Landfill Number: {event.lfNum}</h4>
                        <h4 class="mb-1">Vehicle Registration Number: {event.vehRegNum}</h4>
                        <h4 class="mb-1">Weight of Waste: {event.weightWaste}</h4>
                        <h4 class="mb-1">Arrival Time: {event.arrivalTime}</h4>
                        <h4 class="mb-1">Departure Time: {event.departureTime}</h4>
                        <h4 class="mb-1">Travel Distance: {event.travelDistance}</h4>
                    </b>

                    <a href={`/event/${event._id}`}>
                        <Button
                            variant="contained"
                            className="w-24"
                            endIcon={<ReadMoreOutlinedIcon />}
                        >
                            More
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
