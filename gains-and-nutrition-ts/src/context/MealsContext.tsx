import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useUser } from "./UserContext";

type FoodType = {
  code: string;
  brand: string;
  name: string;
  kcal: number;
  carbs: number;
  sugar: number;
  fiber: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  salt: number;
  weight: number;
};

type MealType = {
  calories: number;
  carbs: number;
  sugar: number;
  fiber: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  salt: number;
  food: FoodType[];
  id: number;
  name: string;
};

type MealsType = {
  calories: number;
  carbs: number;
  sugar: number;
  fiber: number;
  protein: number;
  fat: number;
  saturatedFat: number;
  salt: number;
  _id: string;
  date: Date;
  user: string;
  meals: MealType[];
};

type MealsContentType = {
  meals: MealsType;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  addFood: (
    id: number,
    addedFood: FoodType,
    selectedLocation: string,
    date: Date
  ) => void;
  changeFoodWeight: (
    id: number,
    addedFood: Object,
    selectedLocation: string,
    date: Date,
    newWeight: number,
  ) => void;
  addMeal: (addedMealName: string) => void;
  getMeals: (date: Date) => void;
  findFood: (value: string | number) => Promise<Object[]>;
  addFoodToDatabase: (addedFoodToDatabase : any) => void;
  deleteFood: (id: number, deletedFood: FoodType) => void;
};

let initialState: MealsType = {
  calories: 0,
  carbs: 0,
  sugar: 0,
  fiber: 0,
  protein: 0,
  fat: 0,
  saturatedFat: 0,
  salt: 0,
  _id: "",
  date: new Date(),
  user: "",
  meals: [
    {
      calories: 0,
      carbs: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
      fat: 0,
      saturatedFat: 0,
      salt: 0,
      food: [],
      id: 0,
      name: "Breakfast",
    },
    {
      calories: 0,
      carbs: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
      fat: 0,
      saturatedFat: 0,
      salt: 0,
      food: [],
      id: 1,
      name: "Lunch",
    },
    {
      calories: 0,
      carbs: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
      fat: 0,
      saturatedFat: 0,
      salt: 0,
      food: [],
      id: 2,
      name: "Dinner",
    },
    {
      calories: 0,
      carbs: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
      fat: 0,
      saturatedFat: 0,
      salt: 0,
      food: [],
      id: 3,
      name: "Snack",
    },
  ],
};

const MealsContext = createContext<MealsContentType>({
  meals: initialState,
  date: new Date(),
  setDate: () => {},
  /*
  deleteFood: () => {},
  
  */
  addFood: () => {},
  addMeal: () => {},
  getMeals: () => {},
  findFood: () => {
    return new Promise<Object[]>(() => {});
  },
  changeFoodWeight: () => {},
  addFoodToDatabase: () => {},
  deleteFood: () => {},
});

const MealsProvider = ({ children }: any) => {
  const { addExtraMeal, user, setUser } = useUser();

  const [date, setDate] = useState(new Date());
  const [meals, setMeals] = useState<MealsType>(initialState);

  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      getMeals(date);
    }
    return () => {
      isSubscribed = false;
    };
  }, [date]);

  const getMeals = async (date: Date) => {
    let res = await fetch("/meals/", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setMeals(data);
    } else {
      setMeals(initialState);
      console.log(data);
    }
  };

  const addFood = async (
    id: number,
    addedFood: FoodType,
    selectedLocation: string,
    date: Date
  ) => {
    
    let res = await fetch("/meals/addFood", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealId: id,
        addFood: addedFood,
        selectedLocation: selectedLocation,
        date: date,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("func")
      setMeals((prevMeals) => {
        console.log("state");
        const updatedMeals = { ...prevMeals };
        let foodExists = false;

        updatedMeals.calories += addedFood.kcal;
        updatedMeals.carbs += addedFood.carbs;
        updatedMeals.sugar += addedFood.sugar;
        updatedMeals.fiber += addedFood.fiber;
        updatedMeals.protein += addedFood.protein;
        updatedMeals.fat += addedFood.fat;
        updatedMeals.saturatedFat += addedFood.saturatedFat;
        updatedMeals.salt += addedFood.salt;
  
        updatedMeals.meals[id].calories += addedFood.kcal;
        updatedMeals.meals[id].carbs += addedFood.carbs;
        updatedMeals.meals[id].sugar += addedFood.sugar;
        updatedMeals.meals[id].fiber += addedFood.fiber;
        updatedMeals.meals[id].protein += addedFood.protein;
        updatedMeals.meals[id].fat += addedFood.fat;
        updatedMeals.meals[id].saturatedFat += addedFood.saturatedFat;
        updatedMeals.meals[id].salt += addedFood.salt;
  
        updatedMeals.meals[id].food.forEach((food : FoodType) => {
          if(food.code === addedFood.code){
            food.kcal += addedFood.kcal;
            food.carbs += addedFood.carbs;
            food.sugar += addedFood.sugar;
            food.fiber += addedFood.fiber;
            food.protein += addedFood.protein;
            food.fat += addedFood.fat;
            food.saturatedFat += addedFood.saturatedFat;
            food.salt += addedFood.salt;
            food.weight += addedFood.weight;
            foodExists = true;
          }
        })

        if(!foodExists){
          updatedMeals.meals[id].food.push(addedFood);
        }
  
        return updatedMeals;
      });

      setUser(prevUser => {
        const updatedStorage = prevUser.storage;
  
        updatedStorage.map((storage : any) => {
          if(storage.location === selectedLocation){
            storage.storedFood.map((storedFood : any) => {
              if(storedFood.code === addedFood.code){
                storedFood.weight -= addedFood.weight;
              }
            })
          }
        })
  
        return {...prevUser, updatedStorage};
      })
      console.log(data);
    } else {
      console.log(data);
    }
    
  };

  const changeFoodWeight = async (
    id: number,
    foodDiff: any,
    selectedLocation: string,
    date: Date,
    newWeight: number
  ) => {
    let res = await fetch("/meals/changeFoodWeight", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealId: id,
        selectedLocation: selectedLocation,
        date: date,
        newWeight: newWeight,
        code: foodDiff.code,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("func");
      setMeals((prevMeals) => {
        console.log("state");
        const updatedMeals = prevMeals;
        updatedMeals.calories += foodDiff.kcalDiff;
        updatedMeals.carbs += foodDiff.carbsDiff;
        updatedMeals.sugar += foodDiff.sugarDiff;
        updatedMeals.fiber += foodDiff.fiberDiff;
        updatedMeals.protein += foodDiff.proteinDiff;
        updatedMeals.fat += foodDiff.fatDiff;
        updatedMeals.saturatedFat += foodDiff.saturatedFatDiff;
        updatedMeals.salt += foodDiff.saltDiff;
  
        updatedMeals.meals[id].calories += foodDiff.kcalDiff;
        updatedMeals.meals[id].carbs += foodDiff.carbsDiff;
        updatedMeals.meals[id].sugar += foodDiff.sugarDiff;
        updatedMeals.meals[id].fiber += foodDiff.fiberDiff;
        updatedMeals.meals[id].protein += foodDiff.proteinDiff;
        updatedMeals.meals[id].fat += foodDiff.fatDiff;
        updatedMeals.meals[id].saturatedFat += foodDiff.saturatedFatDiff;
        updatedMeals.meals[id].salt += foodDiff.saltDiff;
  
        updatedMeals.meals[id].food.forEach((food) => {
          if (food.code === foodDiff.code) {
            food.kcal += foodDiff.kcalDiff;
            food.carbs += foodDiff.carbsDiff;
            food.sugar += foodDiff.sugarDiff;
            food.fiber += foodDiff.fiberDiff;
            food.protein += foodDiff.proteinDiff;
            food.fat += foodDiff.fatDiff;
            food.saturatedFat += foodDiff.saturatedFatDiff;
            food.salt += foodDiff.saltDiff;
            food.weight += foodDiff.weightDiff;
          }
        });
  
        return {...prevMeals,updatedMeals};
      });

      setUser(prevUser => {
        const updatedStorage = prevUser.storage;
  
        updatedStorage.map((storage : any) => {
          if(storage.location === selectedLocation){
            storage.storedFood.map((storedFood : any) => {
              if(storedFood.code === foodDiff.code){
                storedFood.weight -= foodDiff.weightDiff;
              }
            })
          }
        })
  
        return {...prevUser, updatedStorage};
      })
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const findFood = async (value: string | number) => {
    let res = await fetch("/food/findFood", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: value,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log(data);
      return data;
    } else {
      console.log(data);
    }
  };

  const deleteFood = (id: number, deletedFood: FoodType) => {
    console.log("func");
    setMeals((prevMeals) => {

      const updatedMeals = { ...prevMeals };
      console.log("state");

      updatedMeals.calories -= deletedFood.kcal;
      updatedMeals.carbs -= deletedFood.carbs;
      updatedMeals.sugar -= deletedFood.sugar;
      updatedMeals.fiber -= deletedFood.fiber;
      updatedMeals.protein -= deletedFood.protein;
      updatedMeals.fat -= deletedFood.fat;
      updatedMeals.saturatedFat -= deletedFood.saturatedFat;
      updatedMeals.salt -= deletedFood.salt;

      updatedMeals.meals[id].calories -= deletedFood.kcal;
      updatedMeals.meals[id].carbs -= deletedFood.carbs;
      updatedMeals.meals[id].sugar -= deletedFood.sugar;
      updatedMeals.meals[id].fiber -= deletedFood.fiber;
      updatedMeals.meals[id].protein -= deletedFood.protein;
      updatedMeals.meals[id].fat -= deletedFood.fat;
      updatedMeals.meals[id].saturatedFat -= deletedFood.saturatedFat;
      updatedMeals.meals[id].salt -= deletedFood.salt;

      for(let i = 0; i < updatedMeals.meals[id].food.length; i++){
        if(updatedMeals.meals[id].food[i].code === deletedFood.code){
          updatedMeals.meals[id].food.splice(i, 1);
        }
      }

      return updatedMeals;
    });
  };

  const addMeal = async (addedMealName: string) => {

    let res = await fetch("/meals/addMeal", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addedMealName,
        date: date,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      let index = meals.meals.length;
      let newMeal: MealType = {
        id: index,
        name: addedMealName,
        food: [],
        calories: 0,
        carbs: 0,
        sugar: 0,
        fiber: 0,
        protein: 0,
        fat: 0,
        saturatedFat: 0,
        salt: 0,
      };

      setMeals({ ...meals, meals: [...meals.meals, newMeal] });
      initialState.meals.push(newMeal);
      console.log(data);
    } else {
      console.log(data);
    }

    //addExtraMeal(addedMealName);
  };

  const addFoodToDatabase = async (addedFoodToDatabase : any) => {
    let res = await fetch("/food/add", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: addedFoodToDatabase.code.toString(),
        name: addedFoodToDatabase.name,
        brand: addedFoodToDatabase.brand,
        calories: addedFoodToDatabase.calories,
        protein: addedFoodToDatabase.protein,
        carbs: addedFoodToDatabase.carbs,
        sugar: addedFoodToDatabase.sugar,
        fiber: addedFoodToDatabase.fiber,
        fat: addedFoodToDatabase.fat,
        saturatedFat: addedFoodToDatabase.saturatedFat,
        salt: addedFoodToDatabase.salt
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log(data);
    } else {
      console.log(data);
    }
  }

  return (
    <MealsContext.Provider
      value={{
        meals,
        getMeals,
        addFood,
        addMeal,
        findFood,
        date,
        setDate,
        changeFoodWeight,
        addFoodToDatabase,
        deleteFood
      }}
    >
      {children}
    </MealsContext.Provider>
  );
  };

const useMeals = () => useContext(MealsContext);

export { MealsProvider, useMeals };
