import React, { FormEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CloseIcon from "@mui/icons-material/Close";
import { useMeals } from "../context/MealsContext";

const AddFoodToDatabase = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addFoodToDatabase } = useMeals();

  useEffect(() => {
    if (location.state) {
      if (location.state.eanCodeFromCamera) {
        (document.getElementById("SearchInput") as HTMLInputElement).value =
          location.state.eanCodeFromCamera;
        console.log(location.state.eanCodeFromCamera);
      }

      return () => {};
    }
  }, [location]);

  const addFoodToDatabaseOnClick = (event: FormEvent) => {
    event.preventDefault();

    const titleValue = (event.target as HTMLFormElement).titleValue.value;
    const brand = (event.target as HTMLFormElement).brand.value;

    const code = parseInt((event.target as HTMLFormElement).code.value)
    const calories = parseInt((event.target as HTMLFormElement).calories.value);
    const protein = parseInt((event.target as HTMLFormElement).protein.value);
    const carbs = parseInt((event.target as HTMLFormElement).carbs.value);
    const sugar = parseInt((event.target as HTMLFormElement).sugar.value);
    const fiber = parseInt((event.target as HTMLFormElement).fiber.value);
    const fat = parseInt((event.target as HTMLFormElement).fat.value);
    const saturatedFat = parseInt(
      (event.target as HTMLFormElement).saturatedFat.value
    );
    const salt = parseInt((event.target as HTMLFormElement).salt.value);

    if (!titleValue || !brand ) {
      return alert("Please fill out all fields");
    } else if (
      isNaN(code) ||
      isNaN(calories) ||
      isNaN(protein) ||
      isNaN(carbs) ||
      isNaN(sugar) ||
      isNaN(fiber) ||
      isNaN(fat) ||
      isNaN(saturatedFat) ||
      isNaN(salt)
    ) {
      return alert("Please fill the Code- and all Nutriments Fields with numbers.")
    }

    const foodToAddToDatabase = {
      code: code,
      name: titleValue,
      brand: brand,
      calories: calories,
      protein: protein,
      carbs: carbs,
      sugar: sugar,
      fiber: fiber,
      fat: fat,
      saturatedFat: saturatedFat,
      salt: salt,
    };
    
    addFoodToDatabase(foodToAddToDatabase);

    (event.target as HTMLFormElement).reset();
  };

  return (
    <div className="AddFoodToDatabase">
      <form
        className="FoodDetails"
        onSubmit={(event) => {
          addFoodToDatabaseOnClick(event);
        }}
      >
        <CloseIcon
          sx={{ fontSize: 35 }}
          onClick={() => {
            navigate(-2);
          }}
          className="FoodDetailsHeader"
        ></CloseIcon>
        <div className="FoodDetailsName-FoodDetailsBrand">
          <label className="input-sizer">
            <input
              name="titleValue"
              placeholder="Title"
              className="AddFoodToDatabaseInputTitleBrand"
              maxLength={26}
              onInput={(event) => {
                (event.target as any).parentNode.dataset.value = (
                  event.target as any
                ).value;
              }}
            ></input>
          </label>
          <label className="input-sizer-brand">
            <input
              name="brand"
              placeholder="Brand"
              className="AddFoodToDatabaseInputTitleBrand"
              maxLength={15}
              onInput={(event) => {
                (event.target as any).parentNode.dataset.value = (
                  event.target as any
                ).value;
              }}
            ></input>
          </label>
        </div>
        <div className="AddFoodToDatabaseCode">
          <div>Code</div>
          <input maxLength={13} name="code" placeholder="01521247890122" className="AddFoodToDatabaseCodeInput"></input>
        </div>
        <div className="FoodDetailsNutriments">
          <div className="FoodDetailsNutriment">Nutriments</div>
          <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
            <div className="FoodDetailsNutrimentName">Calories</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={4}
                placeholder="0"
                name="calories"
                className="AddFoodToDatabaseInputCalories"
              ></input>{" "}
              kcal
            </div>
          </div>
          <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
            <div className="FoodDetailsNutrimentName">Protein</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="protein"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
          <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
            <div className="FoodDetailsNutrimentName">Carbs</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="carbs"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
          <div className="FoodDetailsSpecialNutrimentName-FoodDetailsSpecialNutrimentValue">
            <div className="FoodDetailsNutrimentName">- Sugar</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="sugar"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
          <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
            <div className="FoodDetailsNutrimentName">Fiber</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="fiber"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
          <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
            <div className="FoodDetailsNutrimentName">Fat</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="fat"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
          <div className="FoodDetailsSpecialNutrimentName-FoodDetailsSpecialNutrimentValue">
            <div className="FoodDetailsNutrimentName">- Saturated Fat</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="saturatedFat"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
          <div className="FoodDetailsNutrimentName-FoodDetailsNutrimentValue">
            <div className="FoodDetailsNutrimentName">Salt</div>
            <div className="FoodDetailsNutrimentValue">
              <input
                maxLength={3}
                placeholder="0"
                name="salt"
                className="AddFoodToDatabaseInput"
              ></input>{" "}
              g
            </div>
          </div>
        </div>
        <div className="FoodDetailsNavbar">
          <div className="WeightInput-WeightUnit">
            <input
              id="WeightInput"
              className="WeightInput"
              type="number"
              name="weight"
              defaultValue={100}
              disabled
            ></input>
            <div className="WeightUnit">Gram</div>
          </div>
          <button type="submit" className="FoodDetailsButton">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFoodToDatabase;
