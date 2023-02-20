import React from "react";
import { Link, useParams } from "react-router-dom";

import { StoredFoodType } from "../utils/CustomTypes";

import SVG from "../images/plusSVG.svg";
import { useUser } from "../context/UserContext";

const StoredFood = ({ name, brand, code, weight }: StoredFoodType) => {
  let { location } = useParams();
  const { changeStoredFoodWeight } = useUser();


  const validate = (e : KeyboardEvent) => {
    if(isNaN(parseInt(e.key)) && e.key !== "Backspace" && e.key !== "ArrowRight" && e.key !== "ArrowLeft"&& e.key !== "-"){
        e.preventDefault();
    }
    return true;
  }

  return (
    <div className="StoredFood">
      <div className="StoredFoodName-StoredFoodBrand-StoredFoodWeight">
        <div className="StoredFoodName-StoredFoodBrand">
          <div className="StoredFoodName">{name}</div>
          <div className="StoredFoodBrand">{brand}</div>
        </div>
        <div className="StoredFoodWeight">
          <input type="text" onBlur={(event) => changeStoredFoodWeight(location!, code, parseInt(event.target.value))} onKeyDown={(event) => validate(event as any)} className="StoredFoodWeightInput" defaultValue={weight} maxLength={5}></input> g
        </div>
      </div>
    </div>
  );
};

export default StoredFood;
