import express from 'express';
import auth from '../middleware/auth.js';


import {
  validateAddFood,
  validateDeleteFood,
  validateAddMeals,
  validateAddMeal,
  validateChangeFoodWeight,
} from "../validations/validations.js";


import Meals from "../models/meals.model.js";
import User from "../models/user.model.js";

var router = express.Router();

const addMeals = async (id, date) => {
  const userExtraMeals = await User.findOne({ _id: id });

  const meals = [
    {
      id: 0,
      name: "Breakfast",
      food: [],
    },
    {
      id: 1,
      name: "Lunch",
      food: [],
    },
    {
      id: 2,
      name: "Dinner",
      food: [],
    },
    {
      id: 3,
      name: "Snack",
      food: [],
    },
  ];

  userExtraMeals.extraMeals.forEach((extraMeal) => {
    meals.push({
      id: meals.length,
      name: extraMeal,
      food: [],
    });
  });

  const currentDate = new Date(date);
  currentDate.setHours(0, 0, 0, 0);

  const newMeals = new Meals({ date: currentDate, user: id, meals: meals });
  try {
    const savedMeals = await newMeals.save();
    return "Meals added!";
  } catch (err) {
    return "Error: " + err;
  }
};

router.post("/", auth, async (req, res) => {
  const user = req.user._id;
  const date = new Date(req.body.date);
  date.setHours(0, 0, 0, 0);

  try {
    const meals = await Meals.findOne({ date: date, user: user });
    if (!meals) {
      return res.status(400).json("meals not found!");
    }
    res.json(meals);
  } catch (err) {
    res.status(401).json("Error: " + err);
  }
});

router.post("/addMeals", auth, async (req, res) => {
  const { error } = validateAddMeals(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const user = req.user._id;
  const date = req.body.date;

  res.json(await addMeals(user, date));
});

router.patch("/addMeal", auth, async (req, res) => {
  const { error } = validateAddMeal(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = req.user._id;
  const mealName = req.body.name;
  const date = new Date(req.body.date);
  date.setHours(0, 0, 0, 0);

  if (!mealName) {
    return res.status(400).json("mealName needed!");
  }

  let meals = await Meals.findOne({ user: user, date: date });

  if (!meals) {
    addMeals(user, date);
    meals = await Meals.findOne({ user: user, date: date });
  }

  const userBeforeChange = await User.findOne({ _id: user });

  const extraMeal = userBeforeChange.extraMeals.find(
    (extraMeal) => extraMeal === mealName
  );

  if (extraMeal) {
    return res.status(400).json("extraMeal already exists!");
  }

  if (userBeforeChange.extraMeals.length >= 4) {
    return res.status(400).json("You are adding too many extraMeals!");
  }

  const highestId = Math.max(...meals.meals.map((o) => o.id));
  const addId = highestId + 1;

  if (addId >= 8) {
    return res.status(400).json("You are adding too many meals!");
  }
  const addMeal = {
    name: mealName,
    id: addId,
  };

  try {
    const addedMeal = await Meals.updateMany(
      { user: user },
      { $push: { meals: addMeal } }
    );
    const addedExtraMeal = await User.updateOne(
      { _id: user },
      { $push: { extraMeals: mealName } }
    );
    res.json("Meal added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.patch("/deleteMeal", auth, async (req, res) => {
  const user = req.user._id;
  const extraMealName = req.body.name;

  if (!extraMealName) {
    return res.status(400).json("Mealname needed!");
  }

  try {
    const recalculatedStatValues = await Meals.updateMany({
      user: user,
      "meals.name": extraMealName
    },
    [
      {
        $addFields: {
          reducedValues: {
            $reduce: {
              input: "$meals",
              initialValue: {
                calories: 0,
                fat: 0,
                saturatedFat: 0,
                carbs: 0,
                sugar: 0,
                fiber: 0,
                protein: 0,
                salt: 0,
                
              },
              in: {
                calories: {
                  $add: [
                    "$$value.calories",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.calories",
                        0
                      ]
                    }
                  ]
                },
                fat: {
                  $add: [
                    "$$value.fat",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.fat",
                        0
                      ]
                    }
                  ]
                },
                carbs: {
                  $add: [
                    "$$value.carbs",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.carbs",
                        0
                      ]
                    }
                  ]
                },
                protein: {
                  $add: [
                    "$$value.protein",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.protein",
                        0
                      ]
                    }
                  ]
                },
                sugar: {
                  $add: [
                    "$$value.sugar",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.sugar",
                        0
                      ]
                    }
                  ]
                },
                fiber: {
                  $add: [
                    "$$value.fiber",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.fiber",
                        0
                      ]
                    }
                  ]
                },
                saturatedFat: {
                  $add: [
                    "$$value.saturatedFat",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.saturatedFat",
                        0
                      ]
                    }
                  ]
                },
                salt: {
                  $add: [
                    "$$value.salt",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$$this.name",
                            extraMealName
                          ]
                        },
                        "$$this.salt",
                        0
                      ]
                    }
                  ]
                }
              }
            }
          }
        }
      },
      {
        $set: {
          "calories": {
            $subtract: [
              "$calories",
              "$reducedValues.calories"
            ]
          },
          "fat": {
            $subtract: [
              "$fat",
              "$reducedValues.fat"
            ]
          },
          "carbs": {
            $subtract: [
              "$carbs",
              "$reducedValues.carbs"
            ]
          },
          "protein": {
            $subtract: [
              "$protein",
              "$reducedValues.protein"
            ]
          },
          "sugar": {
            $subtract: [
              "$sugar",
              "$reducedValues.sugar"
            ]
          },
          "fiber": {
            $subtract: [
              "$fiber",
              "$reducedValues.fiber"
            ]
          },
          "saturatedFat": {
            $subtract: [
              "$saturatedFat",
              "$reducedValues.saturatedFat"
            ]
          },
          "salt": {
            $subtract: [
              "$salt",
              "$reducedValues.salt"
            ]
          },
          
        },
        
      },
      {
        $unset: [
          "reducedValues"
        ]
      },
      
    ]);

    const deletedExtraMeal = await User.updateOne(
      { _id: user },
      { $pull: { extraMeals: extraMealName } }
    );

    const deletedAllExtraMeals = await Meals.updateMany(
      { user: user },
      { $pull: { meals: { name: extraMealName } } }
    );

    console.log(deletedExtraMeal.nModified);
    console.log(deletedAllExtraMeals.nModified);
    console.log(recalculatedStatValues.nModified);
    if (
      deletedExtraMeal.nModified === 1 &&
      deletedAllExtraMeals.nModified >= 1 &&
      recalculatedStatValues.nModified >= 1
    ) {
      res.json("ExtraMeal deleted!");
    } else if (deletedExtraMeal.nModified === 0){
      res.status(400).json("Couldn't delete the extraMeal out of extraMeals!");
    } else if (deletedAllExtraMeals.nModified === 0){
      res.status(400).json("Couldn't delete the extraMeal out of meals!");
    } else if (recalculatedStatValues.nModified === 0){
      res.status(400).json("Couldn't correct the stats!");
    }

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.patch("/addFood", auth, async (req, res) => {
  const { error } = validateAddFood(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = req.user._id;
  const addFood = req.body.addFood;
  const mealId = req.body.mealId;
  const selectedLocation = req.body.selectedLocation;
  const currentDate = new Date(req.body.date);
  currentDate.setHours(0, 0, 0, 0);

  const code = req.body.addFood.code;
  const kcal = req.body.addFood.kcal;
  const carbs = req.body.addFood.carbs;
  const sugar = req.body.addFood.sugar;
  const fiber = req.body.addFood.fiber;
  const protein = req.body.addFood.protein;
  const fat = req.body.addFood.fat;
  const saturatedFat = req.body.addFood.saturatedFat;
  const salt = req.body.addFood.salt;
  const weight = req.body.addFood.weight;

  const foodBeforeAdd = await Meals.findOne({ user: user, date: currentDate });

  if (!foodBeforeAdd) {
    console.log("No Meals found!");
    await addMeals(user, req.body.date);
  }

  const newFoodBeforeAdd = await Meals.findOne({ user: user, date: currentDate });
  const meals = newFoodBeforeAdd.meals.find((meal) => meal.id === mealId);

  if (meals === undefined) {
    return res.status(400).json("No meal found!");
  }

  const food = meals.food.find((food) => food.code === addFood.code);


  try {
    let addedFood;

    if(!food){
      addedFood = await Meals.updateOne(
        { user: user, date: currentDate },
        {
          $push: { [`meals.${mealId}.food`]: addFood },
          $inc: {
            calories: kcal,
            carbs: carbs,
            protein: protein,
            fat: fat,
            sugar: sugar,
            fiber: fiber,
            saturatedFat: saturatedFat,
            salt: salt,
            [`meals.${mealId}.calories`]: kcal,
            [`meals.${mealId}.carbs`]: carbs,
            [`meals.${mealId}.protein`]: protein,
            [`meals.${mealId}.fat`]: fat,
            [`meals.${mealId}.sugar`]: sugar,
            [`meals.${mealId}.fiber`]: fiber,
            [`meals.${mealId}.saturatedFat`]: saturatedFat,
            [`meals.${mealId}.salt`]: salt,
          },
        }
      );
    }else{
      addedFood = await Meals.updateOne(
        { user: user, date: currentDate, [`meals.${mealId}.food.code`]: code},
        {
          $inc: {
            calories: kcal,
            carbs: carbs,
            protein: protein,
            fat: fat,
            sugar: sugar,
            fiber: fiber,
            saturatedFat: saturatedFat,
            salt: salt,
            [`meals.${mealId}.calories`]: kcal,
            [`meals.${mealId}.carbs`]: carbs,
            [`meals.${mealId}.protein`]: protein,
            [`meals.${mealId}.fat`]: fat,
            [`meals.${mealId}.sugar`]: sugar,
            [`meals.${mealId}.fiber`]: fiber,
            [`meals.${mealId}.saturatedFat`]: saturatedFat,
            [`meals.${mealId}.salt`]: salt,
            [`meals.${mealId}.food.$.kcal`]: kcal,
            [`meals.${mealId}.food.$.carbs`]: carbs,
            [`meals.${mealId}.food.$.protein`]: protein,
            [`meals.${mealId}.food.$.fiber`]: fiber,
            [`meals.${mealId}.food.$.sugar`]: sugar,
            [`meals.${mealId}.food.$.fat`]: fat,
            [`meals.${mealId}.food.$.saturatedFat`]: saturatedFat,
            [`meals.${mealId}.food.$.salt`]: salt,
            [`meals.${mealId}.food.$.weight`]: weight,
          },
        }
      );
    }

    const changedStoredFood = await User.updateOne(
      {_id: user, storage: {$elemMatch: {location: selectedLocation}}},
      [{$set: {
          storage: {
            $map: {
              input: "$storage",
              as: "st",
              in: {$cond: [
                  {$eq: ["$$st.location", selectedLocation]},
                  {location: "$$st.location",
                    storedFood: {$map: {
                        input: "$$st.storedFood",
                        in: {$cond: [
                            {$eq: ["$$this.code", addFood.code]},
                            {$mergeObjects: [
                              "$$this", 
                              {weight: {$max: [-10000, {$subtract: ["$$this.weight", addFood.weight]}]}}
                            ]},
                            "$$this"
                        ]}
                      }
                    }
                  },
                  "$$st"
              ]}
            }
          }
      }}]
    );

    if(addedFood.nModified === 1 && changedStoredFood.nModified === 1){
      res.json("Food added!");
    }else if(changedStoredFood.nModified != 1){
      res.json("Food added without adjusting!");
    }else{
      res.status(400).json("Error while adding Food!");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

//Schaun dass nd alles alle zahln nd so lang werdn is glaub ich auch in add ein problem
router.patch("/changeFoodWeight", auth, async (req, res) => {
  const { error } = validateChangeFoodWeight(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = req.user._id;
  const code = req.body.code;
  const mealId = parseInt(req.body.mealId);
  const selectedLocation = req.body.selectedLocation;
  const newWeight = req.body.newWeight;
  const currentDate = new Date(req.body.date);
  currentDate.setHours(0, 0, 0, 0);

  const foodBeforeChange = await Meals.findOne({ user: user, date: currentDate });

  if (!foodBeforeChange) {
    return res.status(400).json("No meals found!");
  }

  const meal = foodBeforeChange.meals.find((meal) => meal.id === mealId);
  
  if (meal === undefined) {
    return res.status(400).json("No meal found!");
  }

  const food = meal.food.find((food) => food.code === code);
  
  if(!food){
    return res.json("No Food to change!");
  }


  const ratio = newWeight/food.weight;

  if(ratio === 1){
    return res.json("Food didn't need a change!");
  }


  const kcalDiff = Math.round((food.kcal*ratio)-food.kcal);
  const proteinDiff = (food.protein*ratio)-food.protein;
  const carbsDiff = (food.carbs*ratio)-food.carbs;
  const sugarDiff = (food.sugar*ratio)-food.sugar;
  const fiberDiff = (food.fiber*ratio)-food.fiber;
  const fatDiff = (food.fat*ratio)-food.fat;
  const saturatedFatDiff = (food.saturatedFat*ratio)-food.saturatedFat;
  const saltDiff = (food.salt*ratio)-food.salt;

  const weightDiff = newWeight-food.weight;

  
  try {

    let changedFood;

    if(newWeight === 0){
      changedFood = await Meals.updateOne(
        { user: user, date: currentDate, [`meals.${mealId}.food.code`]: code,},
        {
          $inc: {
            calories: kcalDiff,
            carbs: carbsDiff,
            sugar: sugarDiff,
            fiber: fiberDiff,
            protein: proteinDiff,
            fat: fatDiff,
            saturatedFat: saturatedFatDiff,
            salt: saltDiff,
            [`meals.${mealId}.calories`]: kcalDiff,
            [`meals.${mealId}.carbs`]: carbsDiff,
            [`meals.${mealId}.protein`]: proteinDiff,
            [`meals.${mealId}.fat`]: fatDiff,
            [`meals.${mealId}.sugar`]: sugarDiff,
            [`meals.${mealId}.fiber`]: fiberDiff,
            [`meals.${mealId}.saturatedFat`]: saturatedFatDiff,
            [`meals.${mealId}.salt`]: saltDiff,
          },
          $pull: {[`meals.${mealId}.food`]: {code: code}}
        }
      );
    }else{
      changedFood = await Meals.updateOne(
        { user: user, date: currentDate, [`meals.${mealId}.food.code`]: code,},
        {
          $inc: {
            calories: kcalDiff,
            carbs: carbsDiff,
            sugar: sugarDiff,
            fiber: fiberDiff,
            protein: proteinDiff,
            fat: fatDiff,
            saturatedFat: saturatedFatDiff,
            salt: saltDiff,
            [`meals.${mealId}.calories`]: kcalDiff,
            [`meals.${mealId}.carbs`]: carbsDiff,
            [`meals.${mealId}.protein`]: proteinDiff,
            [`meals.${mealId}.fat`]: fatDiff,
            [`meals.${mealId}.sugar`]: sugarDiff,
            [`meals.${mealId}.fiber`]: fiberDiff,
            [`meals.${mealId}.saturatedFat`]: saturatedFatDiff,
            [`meals.${mealId}.salt`]: saltDiff,
            [`meals.${mealId}.food.$.kcal`]: kcalDiff,
            [`meals.${mealId}.food.$.carbs`]: carbsDiff,
            [`meals.${mealId}.food.$.protein`]: proteinDiff,
            [`meals.${mealId}.food.$.fiber`]: fiberDiff,
            [`meals.${mealId}.food.$.sugar`]: sugarDiff,
            [`meals.${mealId}.food.$.fat`]: fatDiff,
            [`meals.${mealId}.food.$.saturatedFat`]: saturatedFatDiff,
            [`meals.${mealId}.food.$.salt`]: saltDiff,
            [`meals.${mealId}.food.$.weight`]: weightDiff,
          },
        }
      );
    }

    const changedStoredFood = await User.updateOne(
      {_id: user, storage: {$elemMatch: {location: selectedLocation}}},
      [{$set: {
          storage: {
            $map: {
              input: "$storage",
              as: "st",
              in: {$cond: [
                  {$eq: ["$$st.location", selectedLocation]},
                  {location: "$$st.location",
                    storedFood: {$map: {
                        input: "$$st.storedFood",
                        in: {$cond: [
                            {$eq: ["$$this.code", code]},
                            {$mergeObjects: [
                              "$$this", 
                              {weight: {$max: [-10000, {$subtract: ["$$this.weight", weightDiff]}]}}
                            ]},
                            "$$this"
                        ]}
                      }
                    }
                  },
                  "$$st"
              ]}
            }
          }
      }}]
    );

    if(changedFood.nModified === 1 && changedStoredFood.nModified === 1){
      res.json("Food changed!");
    }else if(changedStoredFood.nModified != 1){
      res.json("Food changed without adjusting!");
    }else{
      res.status(400).json("Error while changed Food!");
    }
    

  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.patch("/deleteFood", auth, async (req, res) => {
  const { error } = validateDeleteFood(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = req.user._id;
  const mealId = req.body.mealId;
  const foodCode = req.body.code;
  const selectedLocation = req.body.selectedLocation;
  const currentDate = new Date(req.body.date);
  currentDate.setHours(0, 0, 0, 0);

  try {
    const foodBeforeDelete = await Meals.findOne({
      user: user,
      date: currentDate,
    });

    if(!foodBeforeDelete){
      return res.status(400).json("No meals found!");
    }

    const meals = foodBeforeDelete.meals.find((meal) => meal.id === mealId);

    if (meals === undefined) {
      return res.status(400).json("No meal found!");
    }

    const food = foodBeforeDelete.meals[mealId].food.find(
      (food) => food.code === foodCode
    );

    if (food === undefined) {
      return res.status(400).json("No food found!");
    }

    const kcal = food.kcal;
    const carbs = food.carbs;
    const protein = food.protein;
    const fat = food.fat;
    const sugar = food.sugar;
    const fiber = food.fiber;
    const salt = food.salt;
    const saturatedFat = food.saturatedFat;
    const weight = food.weight;

    const deletedFood = await Meals.updateOne(
      {
        user: user,
        date: currentDate,
        [`meals.${mealId}.food.code`]: foodCode,
      },
      {
        $unset: {
          [`meals.${mealId}.food.$`]: { code: foodCode},
        },
      }
    );
    const pulledFood = await Meals.updateOne(
      { user: user, date: currentDate },
      {
        $pull: { [`meals.${mealId}.food`]: null },
        $inc: {
          calories: -kcal,
          carbs: -carbs,
          protein: -protein,
          fat: -fat,
          sugar: -sugar,
          fiber: -fiber,
          salt: -salt,
          saturatedFat: -saturatedFat,
          [`meals.${mealId}.calories`]: -kcal,
          [`meals.${mealId}.carbs`]: -carbs,
          [`meals.${mealId}.protein`]: -protein,
          [`meals.${mealId}.fat`]: -fat,
          [`meals.${mealId}.fiber`]: -fiber,
          [`meals.${mealId}.sugar`]: -sugar,
          [`meals.${mealId}.saturatedFat`]: -saturatedFat,
          [`meals.${mealId}.salt`]: -salt,
        },
      }
    );

    const storedFood = await User.updateOne(
      {_id: user, "storage.location": selectedLocation},
      { $inc: {"storage.$.storedFood.$[food].weight": weight}},
      { arrayFilters: [ { "food.code": foodCode } ]},
    );

    if (deletedFood.nModified === 1 && pulledFood.nModified === 1 && storedFood.nModified === 1) {
      res.json("Food: " + foodCode + " deleted!");
    } else if(deletedFood.nModified === 1 && pulledFood.nModified === 1 && storedFood.nModified != 1){
      res.json("Food: " + foodCode + " deleted without adjusting!");
    } else {
      res.status(400).json("Error while deleting Food!");
    }
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

export default router;
