import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import SVG from "../images/plusSVG.svg";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useUser } from "../context/UserContext";
import StoredFood from "../components/StoredFood";
import { StoredFoodType } from "../utils/CustomTypes";

const StorageDetails = () => {
  const navigate = useNavigate();
  let { location } = useParams();

  const { user } = useUser();

  return (
    <div className="StorageDetails">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate("/Storages");
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="HeaderText">Storage - {location}</div>
      </header>
      <div className="StorageDetailsColumn">
        {user.storage.map((storage: any) =>
          storage.location === location
            ? storage.storedFood.map((storedFood: StoredFoodType) => (
                <StoredFood key={storedFood.code} {...storedFood}></StoredFood>
              ))
            : null
        )}
      </div>
      <Link className="Link" to={`/AddFood/${location}`}>
        <div className="MealDetailsAddFoodButton">
          <img className="SVG" src={SVG} alt="+21" />
        </div>
      </Link>
    </div>
  );
};

export default StorageDetails;
