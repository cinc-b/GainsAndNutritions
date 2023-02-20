import React, { createContext, useContext, useEffect, useState } from "react";
import { StoredFoodType } from "../utils/CustomTypes";
import { useAuth } from "./AuthContext";

type UserType = {
  extraMeals: Object[];
  _id: string;
  email: string;
  password: string;
  gender: string;
  firstName: string;
  age: number;
  weight: number;
  height: number;
  goal: string;
  calorieGoal: number;
  storage: Object[];
  carbs: number;
  fat: number;
  protein: number;
  targetWeight: number;
};

type UserContentType = {
  user: UserType;
  selectedLocation: string;
  getUser: () => void;
  addExtraMeal: (extraMealName: string) => void;
  setSelectedLocationFunc: (location: string) => void;
  addFoodToStorage: (
    location: string,
    code: string,
    name: string,
    brand: string,
    weight: number
  ) => void;
  changeStoredFoodWeight: (
    location: string,
    code: string,
    weight: number
  ) => void;
  setUser: React.Dispatch<React.SetStateAction<UserType>>;
  changeCalories: (newCalories: number) => void;
  changeCarbs: (newCarbs: number) => void;
  changeProtein: (newProtein: number) => void;
  changeFat: (newFat: number) => void;
  addStorage: (location: string) => void;
};

let initialState: UserType = {
  extraMeals: [],
  _id: "",
  email: "",
  password: "",
  gender: "",
  firstName: "",
  age: 0,
  weight: 0,
  height: 0,
  goal: "",
  calorieGoal: 0,
  storage: [],
  carbs: 0,
  protein: 0,
  fat: 0,
  targetWeight: 0,
};

const UserContext = createContext<UserContentType>({
  user: initialState,
  selectedLocation: "",
  getUser: () => {},
  addExtraMeal: () => {},
  setSelectedLocationFunc: () => {},
  addFoodToStorage: () => {},
  changeStoredFoodWeight: () => {},
  setUser: () => {},
  changeCalories: () => {},
  changeCarbs: () => {},
  changeProtein: () => {},
  changeFat: () => {},
  addStorage: () => {}
});

const UserProvider = ({ children }: any) => {
  const {setAuth, auth} = useAuth();

  const [user, setUser] = useState<UserType>(initialState);
  const [selectedLocation, setSelectedLocation] = useState(
    localStorage.getItem("location") || "Home"
  );

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    let res = await fetch("/users/", {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser(data);
    } else {
      console.log(data);
      setAuth(null);
    }
  };

  const addExtraMeal = async (extraMealName: string) => {
    let res = await fetch("/users/addExtraMeals", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        extraMealName: extraMealName,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser({ ...user, extraMeals: [extraMealName] });
    } else {
      console.log(data);
    }
  };

  const addFoodToStorage = async (
    location: string,
    code: string,
    name: string,
    brand: string,
    weight: number
  ) => {
    let res = await fetch("/users/addFoodToStorage", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location,
        addFood: {
          code: code,
          name: name,
          brand: brand,
          weight: weight,
        },
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser((prevUser) => {
        const updatedStorage = prevUser.storage;
        let storedFoodExists = false;

        updatedStorage.forEach((storage: any) => {
          if (storage.location === location) {
            storage.storedFood.forEach((storedFood : StoredFoodType) => {
              if(storedFood.code === code){
                storedFood.weight += weight;
                storedFoodExists = true;
              }
            });
            
            if(!storedFoodExists){
              storage.storedFood.push({
                code: code,
                name: name,
                brand: brand,
                weight: weight,
              });
            }
          }
        });

        return { ...prevUser, updatedStorage };
      });
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const setSelectedLocationFunc = (location: string) => {
    if(location !== undefined){
      setSelectedLocation(location);
      localStorage.setItem("location", location);
    }
  };

  const changeStoredFoodWeight = async (
    location: string,
    code: string,
    weight: number
  ) => {
    let res = await fetch("/users/changeFoodFromStorage", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location,
        code: code,
        weight: weight,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser((prevUser) => {
        const updatedStorage = prevUser.storage;

        updatedStorage.forEach((storage: any) => {
          if (storage.location === location) {
            storage.storedFood.forEach((storedFood: any) => {
              if (storedFood.code === code) {
                storedFood.weight = weight;
              }
            });
          }
        });

        return { ...prevUser, updatedStorage };
      });

      console.log(data);
    } else {
      console.log(data);
    }
  };

  const changeCalories = async (newCalories: number) => {
    let res = await fetch("/users/changeCalories", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCalorieGoal: newCalories,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      let protein = Math.round(user.weight*2.3);
      let fat = Math.round(user.weight*1.1);
      let carbs = Math.round(((newCalories - (protein*4 + fat*9))/4));
      setUser({...user, calorieGoal: newCalories, carbs: carbs, protein: protein, fat: fat});
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const changeCarbs = async (newCarbs: number) => {
    let res = await fetch("/users/changeCarbs", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newCarbs: newCarbs,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      let carbCaloriesDiff = Math.round((newCarbs*4) - (user.carbs*4));
      setUser({...user, calorieGoal: (user.calorieGoal + carbCaloriesDiff), carbs: newCarbs});
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const changeProtein = async (newProtein: number) => {
    let res = await fetch("/users/changeProtein", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newProtein: newProtein,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      let proteinCaloriesDiff = Math.round((newProtein*4) - (user.protein*4));
      console.log(proteinCaloriesDiff);
      setUser({...user, calorieGoal: (user.calorieGoal + proteinCaloriesDiff), protein: newProtein});
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const changeFat = async (newFat: number) => {
    let res = await fetch("/users/changeFat", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newFat: newFat,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      let fatCaloriesDiff = Math.round((newFat*9) - (user.fat*9));
      console.log(fatCaloriesDiff);
      setUser({...user, calorieGoal: (user.calorieGoal + fatCaloriesDiff), fat: newFat});
      console.log(data);
    } else {
      console.log(data);
    }
  };

  const addStorage = async (
    location: string,
  ) => {
    let res = await fetch("/users/addStorage", {
      method: "PATCH",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      setUser(prevUser => {
        return {
            ...prevUser,
            storage: [...prevUser.storage, {location: location, storedFood: []}]
        }
      });
      console.log(data);
    } else {
      console.log(data);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        selectedLocation,
        getUser,
        addExtraMeal,
        setSelectedLocationFunc,
        addFoodToStorage,
        changeStoredFoodWeight,
        setUser,
        changeCalories,
        changeCarbs,
        changeProtein,
        changeFat,
        addStorage
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
