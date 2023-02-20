import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SVG from "../images/plusSVG.svg";
import { useMeals } from "../context/MealsContext";

import Food from "../components/Food";

import { Link } from "react-router-dom";

const MealDetails = () => {
  const navigate = useNavigate();

  let { id } = useParams();
  const { meals} = useMeals();

  const style = { "--percentage": "75%" } as React.CSSProperties;

  return (
    <div className="MealDetails">
      <header className="BarcodeScannerHeader">
        <ArrowBackIcon
          onClick={() => {
            navigate("/");
          }}
          sx={{ fontSize: 35 }}
        ></ArrowBackIcon>
        <div className="HeaderText">{meals.meals[Number(id)].name}</div>
      </header>
      <div className="MealDetailsContent">
        <div className="MealDetailsCalorieCounter">
          <div className="MealCaloriesVisual">
            <div className="HalfArc" style={style}>
              <span className="label">{meals.meals[Number(id)].calories} ate</span>
            </div>
          </div>
          <div className="MealNutritions">
            <div className="MealNutrition">
              <div className="MealNutritionGrams">{Math.round((meals.meals[Number(id)].carbs) * 10 ) / 10 }g</div>
              <div className="MealNutritionText">Carbs</div>
            </div>
            <div className="MealNutrition">
              <div className="MealNutritionGrams">{Math.round((meals.meals[Number(id)].protein) * 10 ) / 10 }g</div>
              <div className="MealNutritionText">Protein</div>
            </div>
            <div className="MealNutrition">
              <div className="MealNutritionGrams">{Math.round((meals.meals[Number(id)].fat) * 10 ) / 10 }g</div>
              <div className="MealNutritionText">Fat</div>
            </div>
          </div>
        </div>
        <hr className="SolidMealDetails"></hr>
        {meals.meals[Number(id)] != null
          ? meals.meals[Number(id)].food.map((food: any, index: number) => <Food key={index} food={food}/>)
          : "Not loading"}
      </div>
      <Link className="Link" to={`/AddFood/${id!}`}>
        <div className="MealDetailsAddFoodButton">
          <img className="SVG" id="SVG" src={SVG} alt="+" />
        </div>
      </Link>
    </div>
  );
};

export default MealDetails;
