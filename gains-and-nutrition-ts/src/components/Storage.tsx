import React, { MouseEvent, useEffect } from "react";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Storage = ({ location }: any) => {
  const { setSelectedLocationFunc, selectedLocation } = useUser();

  useEffect(() => {
    const collection = document.getElementsByClassName("Storage");
    for (var i = 0; i < collection.length; i++) {
      if ((collection[i] as HTMLElement).innerText === selectedLocation)
        collection[i].classList.add("selectedLocation");
    }
  }, []);

  const addClass = (e: MouseEvent) => {
    const collection = document.getElementsByClassName("Storage");

    for (var i = 0; i < collection.length; i++) {
      collection[i].classList.remove("selectedLocation");
    }

    (e.target as HTMLElement).classList.add("selectedLocation");

    setSelectedLocationFunc(location);
  };

  return (
    <div className="Storage" onClick={(e: MouseEvent) => addClass(e)}>
      <div className="StorageIcon-StorageName">
        <LocationOnIcon className="StorageIcon"></LocationOnIcon>
        <div className="StorageName">{location}</div>
      </div>
      <Link className="AddLocation" to={`/StorageDetails/${location}`}>
        <AddCircleOutlineOutlinedIcon
          sx={{ fontSize: 30 }}
        ></AddCircleOutlineOutlinedIcon>
      </Link>
    </div>
  );
};

export default Storage;
