import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMeals } from "../context/MealsContext";
import SVG from "../images/xSVG.svg";

const Food = ({ food }: any) => {
  const location = useLocation();

  const {deleteFood} = useMeals();  

  return (
    <Link className="FoodContent Link" to={`/FoodDetails/`}  state= {{ food: food , location: location.pathname}} >
      <div className="Food">
        <div className="FoodDetail">
          <div className="FoodNameFoodDelete">
            <div className="FoodName">{food.name}</div>
            <img className="FoodDelete SVG" onClick={(e : any) => {e.preventDefault(); deleteFood(parseInt(location.pathname[location.pathname.length - 1]), food)}} src={SVG}></img>
          </div>
          <div className="FoodGram-FoodKcal">
            <div className="FoodBrand-FoodGram">
              <div className="FoodBrand">{food.brand + ","}&nbsp;</div>
              <div className="FoodGram">
                {food.weight ? food.weight + " g" : 100 + " g"}{" "}
              </div>
            </div>
            <div className="FoodKcal">{food.kcal} kcal</div>
          </div>
        </div>
        <div className="FoodNutritions">
          <div className="FoodNutrition">
            <div className="FoodNutritionGrams">{Math.round(food.carbs*10)/10} g</div>
            <div className="FoodNutritionText">Carbs</div>
          </div>
          <div className="FoodNutrition">
            <div className="FoodNutritionGrams">{Math.round(food.protein*10)/10} g</div>
            <div className="FoodNutritionText">Protein</div>
          </div>
          <div className="FoodNutrition">
            <div className="FoodNutritionGrams">{Math.round(food.fat*10)/10} g</div>
            <div className="FoodNutritionText">Fat</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Food;
