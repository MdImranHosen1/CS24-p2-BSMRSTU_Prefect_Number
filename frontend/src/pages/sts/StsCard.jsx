import * as React from "react";
import { Link } from "react-router-dom";
import img from "./../../assets/user.png";
import ReadMoreOutlinedIcon from "@mui/icons-material/ReadMoreOutlined";
import { Button } from "@mui/material";
import MyMap from "../../components/MyMap";

export default function StsCard({ sts }) {
  console.log("sts", sts);
  return (
    <div class="  flex  items-center w-full  bg-white border border-gray-100 rounded-lg shadow   hover:bg-gray-200">
      {/* <img src={img} alt="Photo" /> */}
      <div className=" rounded-md object-cover rounded-t-lg h-full w-1/3 p-2">
        <MyMap coordinate={sts.coordinate} />
      </div>

      <div class="flex justify-between w-full">
        <div class="p-5">
          <b>
            <h1 class="mb-1">Name: {sts.stsName}</h1>
            <h4 class="mb-1">Ward Number: {sts.wardNum}</h4>
            <h4 class="mb-1">Capacity: {sts.capacity}</h4>
            <h4 class="mb-1">Coordinate: {sts.coordinate}</h4>
            <h4 class="mb-1">Managers:</h4>
            <ul>
              {sts.managers.map((manager, index) => (
                <li key={index}>{manager}</li>
              ))}
            </ul>
          </b>

          <a href={`/sts/${sts._id}`}>
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
