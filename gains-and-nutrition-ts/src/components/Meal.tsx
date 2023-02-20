import React from "react";
import EggOutlinedIcon from "@mui/icons-material/EggOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import { Link } from "react-router-dom";

const Meal = ({meal} : any) => {

  return (
    <Link className="Meal Link" to={`/MealDetails/${meal.id}`}>
      <div className="MealIconMealName">
        <EggOutlinedIcon className="MealIcon"></EggOutlinedIcon>
        <div className="MealName">{meal.name}</div>
      </div>
      <div className="AteKcalAddIcon">
        <div className="AteKcal">{meal.calories} kcal</div>
        <AddCircleOutlineOutlinedIcon className="AddIcon"></AddCircleOutlineOutlinedIcon>
      </div>
    </Link>
  );
};

export default Meal;
