import express from 'express';
import auth from '../middleware/auth.js';
import OFF from 'openfoodfacts-nodejs';
import fetch from 'node-fetch';


import {validateFood, validateFindFood} from "../validations/validations.js";


import Food from "../models/food.model.js";

var router = express.Router();

router.post("/add", auth, async (req, res) => {
  const { error } = validateFood(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const addedBy = req.user._id;
  const code = req.body.code;
  const brand = req.body.brand;
  const name = req.body.name;
  const calories = req.body.calories;
  const carbs = req.body.carbs;
  const fiber = req.body.fiber;
  const sugar = req.body.sugar;
  const protein = req.body.protein;
  const fat = req.body.fat;
  const saturatedFat = req.body.saturatedFat;
  const salt = req.body.salt;

  const newFood = new Food({
    code: code,
    brand: brand,
    name: name,
    kcal: calories,
    carbs: carbs,
    fiber: fiber,
    sugar: sugar,
    protein: protein,
    fat: fat,
    saturatedFat: saturatedFat,
    salt: salt,
    addedBy: addedBy,
  });
  try {
    const savedFood = await newFood.save();
    return res.json("Food added!");
  } catch (err) {
    return res.status(400).json("Error: " + err);
  }
});

router.post("/findFood", auth, async (req, res) => {
  const { error } = validateFindFood(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }


  let value = req.body.value;

  value = (value*1)

  if(Number.isNaN(value)){
    value = req.body.value;
  }
  
  //console.log(value + " and type: " + typeof(value));
  
  //Des is die API direkt für per name suchen
  //https://de.openfoodfacts.org/cgi/search.pl?search_terms=coca&search_simple=1&action=process&json=1&fields=code,brands,product_name_en,carbohydrates_100g,energy-kcal_100g,fat_100g,proteins_100g,salt_100g,saturated-fat_100g,sugars_100g,fiber_100g
  //API für per code suchen(Theorie)
  //https://world.openfoodfacts.org/api/v2/search?code=5449000131805

  const worldOFF = new OFF();
  const atOFF = worldOFF.country("at");


  try {
    if (typeof(value) === "number") {
      const findFood = await Food.find({ code: value });
      if (findFood.length > 0) {
        return res.json(findFood);
      } else {
        try {
          const findFood = await atOFF.getProduct(value);

          if(findFood.product){
            
            const foodToReturn = {
              code: findFood.code,
              brand: findFood.product.brands || "Brand not found",
              name: findFood.product.product_name_en || "Name not found",
              kcal: findFood.product.nutriments["energy-kcal_100g"]  || 0,
              carbs: findFood.product.nutriments.carbohydrates_100g || 0,
              fiber: findFood.product.nutriments.fiber_100g || 0,
              sugar: findFood.product.nutriments.sugars_100g || 0,
              protein: findFood.product.nutriments.proteins_100g || 0,
              fat: findFood.product.nutriments.fat_100g || 0,
              saturatedFat: findFood.product.nutriments["saturated-fat_100g"] || 0,
              salt: findFood.product.nutriments.salt_100g || 0,
            };
            return res.json([foodToReturn]);
          }else{
            res.status(400).json("Couldn't find Food!");
          }

        }catch(err){
          res.status(401).json("Error: " + err);
        }
        
      }
    } else if(typeof(value) === "string") {
      value = value.toLowerCase();
      value = value.charAt(0).toUpperCase() + value.slice(1);

      const findFood = await Food.find({ name: new RegExp('.*' + value + '.*')});

        let result = await fetch(`https://de.openfoodfacts.org/cgi/search.pl?search_terms=${value}&search_simple=1&action=process&json=1&fields=code,brands,product_name_en,carbohydrates_100g,energy-kcal_100g,fat_100g,proteins_100g,salt_100g,saturated-fat_100g,sugars_100g,fiber_100g`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
    
        const data = await result.json();
    
        if (result.status === 200) {
          data.products.forEach(product => {
            if(Object.keys(product).length === 11){
              let newFood = {
                brand: product.brands,
                carbs: product.carbohydrates_100g || 0,
                code: product.code,
                kcal: product["energy-kcal_100g"] || 0,
                fat: product.fat_100g || 0,
                fiber: product.fiber_100g || 0,
                name: product.product_name_en || "Name not found",
                protein: product.proteins_100g || 0,
                salt: product.salt_100g || 0,
                saturatedFat: product["saturated-fat_100g"] || 0,
                sugar: product.sugars_100g || 0,
              }
              findFood.push(newFood);
            }
          });
          return res.json(findFood);
        } else {
          console.log(data);
        }

        return res.json("Couldn't find Food!");
    }
  } catch (err) {
    res.status(401).json("Error: " + err);
  }
});

export default router;
