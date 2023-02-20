import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";
import { useMeals } from "../context/MealsContext";

import CloseIcon from "@mui/icons-material/Close";

const FoodDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedLocation, addFoodToStorage } = useUser();
  const { date, addFood, changeFoodWeight} = useMeals();
  


  const loc = location.state?.location;

  let mealId = loc[loc.length - 1];

  const [weight, setWeight] = useState(location.state?.food.weight ?? 100);

    const [food, setFood] = useState(
    location.state?.location.match(/MealDetails.*/) ? 
      {
        code: location.state?.food.code,
        brand: location.state?.food.brand,
        name: location.state?.food.name,
        kcal: Math.round((location.state?.food.kcal * (100 / weight))),
        protein: Math.round((location.state?.food.protein * (100 / weight)) * 10) / 10,
        carbs: Math.round((location.state?.food.carbs * (100 / weight)) * 10) / 10,
        sugar: Math.round((location.state?.food.sugar * (100 / weight)) * 10) / 10,
        fiber: Math.round((location.state?.food.fiber * (100 / weight)) * 10) / 10,
        fat: Math.round((location.state?.food.fat * (100 / weight)) * 10) / 10,
        saturatedFat: Math.round((location.state?.food.saturatedFat * (100 / weight)) * 10) / 10,
        salt: Math.round((location.state?.food.salt * (100 / weight)) * 10) / 10,
        weight: location.state?.food.weight
      }
    : location.state?.food
    );


  if (location.state === null) {
    return <Navigate to="/" />;
  }

  const save = (event : FormEvent) => {
    event.preventDefault()
    const foodDiff = {
      code: food.code,
      kcalDiff: Math.round((food.kcal * (weight / 100)) - (food.kcal * (food.weight / 100))),
      proteinDiff: Math.round(((food.protein * (weight / 100)) - (food.protein * (food.weight / 100))) * 10) / 10,
      carbsDiff: Math.round(((food.carbs * (weight / 100)) - (food.carbs * (food.weight / 100)))* 10) / 10,
      sugarDiff: Math.round(((food.sugar * (weight / 100)) - (food.sugar * (food.weight / 100)))* 10) / 10,
      fiberDiff: Math.round(((food.fiber * (weight / 100)) - (food.fiber * (food.weight / 100)))* 10) / 10,
      fatDiff: Math.round(((food.fat * (weight / 100)) - (food.fat * (food.weight / 100)))* 10) / 10,
      saturatedFatDiff: Math.round(((food.saturatedFat * (weight / 100)) - (food.saturatedFat * (food.weight / 100)))* 10) / 10,
      saltDiff: Math.round(((food.salt * (weight / 100)) - (food.salt * (food.weight / 100)))* 10) / 10,
      weightDiff: weight - food.weight,
    }

    setFood({...food, 
      weight: (food.weight + foodDiff.weightDiff),
    })

    changeFoodWeight( mealId, foodDiff, selectedLocation, date, weight);
  };

  const add = (event: FormEvent) => {
    event.preventDefault()
    let addedFood = {
      code: food.code,
      name: food.name,
      brand: food.brand,
      kcal: Math.round(food.kcal * (weight / 100)),
      protein: Math.round(food.protein * (weight / 100) * 10) / 10,
      carbs: Math.round(food.carbs * (weight / 100) * 10) / 10,
      sugar: Math.round(food.sugar * (weight / 100) * 10) / 10,
      fiber: Math.round(food.fiber * (weight / 100) * 10) / 10,
      fat: Math.round(food.fat * (weight / 100) * 10) / 10,
      saturatedFat: Math.round(food.saturatedFat * (weight / 100) * 10) / 10,
      salt: Math.round(food.salt * (weight / 100) * 10) / 10,
      weight: weight,
    };
    console.log(addedFood);

    addFood(parseInt(mealId), addedFood, selectedLocation, date);
  };

  const store = (event : FormEvent) => {
    event.preventDefault() 
    addFoodToStorage(loc.substring(9), food.code, food.name, food.brand, weight);
  }

  return (
    <div className="FoodDetails">
      <CloseIcon
        sx={{ fontSize: 35 }}
        onClick={() => {
          navigate(-1);
        }}
        className="FoodDetailsHeader"
      ></CloseIcon>
      <div className="FoodDetailsName-FoodDetailsBrand">
        <div className="FoodDetailsName">{food.name}</div>
        <div className="FoodDetailsBrand">{food.brand}</div>
      </div>
      <div className="FoodDetailsMainNutriments">
        <div className="FoodDetailsMainNutriment">
          <div className="FoodDetailsMainValue">
            {Math.round((food.kcal * weight) / 100)}
          </div>
          <div className="FoodDetailsMainNutrimentName">Calories</div>
        </div>
        <div className="FoodDetailsMainNutriment">
          <div className="FoodDetailsMainValue">
            {Math.round((food.carbs * weight) / 100)}
          </div>
          <div className="FoodDetailsMainNutrimentName">Carbs</div>
        </div>
        <div className="FoodDetailsMainNutriment">
          <div className="FoodDetailsMainValue">
            {Math.round((food.protein * weight) / 100)}
          </div>
          <div className="FoodDetailsMainNutrimentName">Protein</div>
        </div>
        <div className="FoodDetailsMainNutriment">
          <div className="FoodDetailsMainValue">
            {Math.round((food.fat * weight) / 100)}
          </div>
          <div className="FoodDetailsMainNutrimentName">Fat</div>
        </div>
      </div>
      <div className="FoodDetailsNutriments">
        <div className="FoodDetailsNutriment">Nutriments</div>
        <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
          <div className="FoodDetailsNutrimentName">Calories</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round((food.kcal * weight) / 100)} kcal
          </div>
        </div>
        <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
          <div className="FoodDetailsNutrimentName">Protein</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.protein * weight) / 100) * 10) / 10} g
          </div>
        </div>
        <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
          <div className="FoodDetailsNutrimentName">Carbs</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.carbs * weight) / 100) * 10) / 10} g
          </div>
        </div>
        <div className="FoodDetailsSpecialNutrimentName-FoodDetailsSpecialNutrimentValue">
          <div className="FoodDetailsNutrimentName">- Sugar</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.sugar * weight) / 100) * 10) / 10} g
          </div>
        </div>
        <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
          <div className="FoodDetailsNutrimentName">Fiber</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.fiber * weight) / 100) * 10) / 10} g
          </div>
        </div>
        <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
          <div className="FoodDetailsNutrimentName">Fat</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.fat * weight) / 100) * 10) / 10} g
          </div>
        </div>
        <div className="FoodDetailsSpecialNutrimentName-FoodDetailsSpecialNutrimentValue">
          <div className="FoodDetailsNutrimentName">- Saturated Fat</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.saturatedFat * weight) / 100) * 10) / 10} g
          </div>
        </div>
        <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
          <div className="FoodDetailsNutrimentName">Salt</div>
          <div className="FoodDetailsNutrimentValue">
            {Math.round(((food.salt * weight) / 100) * 10) / 10} g
          </div>
        </div>
      </div>
      <form className="FoodDetailsNavbar" onSubmit={(event) => {loc.match(/MealDetails.*/) ? save(event) : parseInt(loc.substring(9)) ? add(event) : (loc.substring(9) === "0") ? add(event) : store(event) }}>
        <div className="WeightInput-WeightUnit">
          <input
            id="WeightInput"
            className="WeightInput"
            type="number"
            placeholder="100"
            name="inputWeight"
            defaultValue={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
          ></input>
          <div className="WeightUnit">Gram</div>
        </div>
        <button
          //onClick={loc.match(/MealDetails.*/) ? save : parseInt(loc.substring(9)) ? add : (loc.substring(9) === "0") ? add : store
          type="submit"
          className="FoodDetailsButton"
        >
          {loc.match(/MealDetails.*/) ? "Save" : parseInt(loc.substring(9)) ? "Add" : (loc.substring(9) === "0") ? "Add" : "Store"}
        </button>
      </form>
    </div>
  );
};

export default FoodDetails;
