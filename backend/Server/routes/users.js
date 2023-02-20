import express from 'express';
import auth from '../middleware/auth.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/

import {validateRegister, validateLogin, validateAddExtraMeal, validateAddStorage, 
       validateAddFoodToStorage, validateChangeFoodFromStorage, validateDeleteFoodFromStorage, 
       validateChangeCalories, validateChangeCarbs, validateChangeProtein, validateChangeFat} from '../validations/validations.js';

import User from "../models/user.model.js";
import Meals from "../models/meals.model.js";
//const { json } = require('body-parser');

var router = express.Router();

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        if(!user){
            return res.send("User not found!");
        }
        res.json(user);
    }catch(err){
        res.status(401).json('Error: ' + err);
    }
})

router.delete('/', auth, async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.user._id);
        if(!user){
            return res.send("User not found!");
        }
        res.json(user.email + " got deleted!");
    }catch(err){
        res.status(401).json('Error: ' + err);
    }
})

router.post('/register', async (req, res) => {
    const { error } = validateRegister(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const email = req.body.email;
    const password = req.body.password;
    const gender = req.body.gender;
    const firstName = req.body.firstName;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    const targetWeight = req.body.targetWeight;
    const goal = req.body.goal;
    let calorieGoal;

    let active =  1.5502;
    let veryactive = 1.725;

    let carbs;
    let protein;
    let fat;


    if(gender === "male"){
        let bmr = (13.397*weight) + (4.799*height) - (5.677*age) + 88.362;
        calorieGoal = bmr * active;
    }
    if(gender === "female"){
        let bmr =  (9.247*weight) + (3.098*height) - (4.330*age) + 447.593;
        calorieGoal = bmr * active;
        
    }

    if(goal === "lose"){
        calorieGoal = calorieGoal - 500;
    }
    if(goal === "stay"){
        calorieGoal = calorieGoal;
    }
    if(goal === "gain"){
        calorieGoal = calorieGoal + 500;
    }

    calorieGoal = Math.round(calorieGoal);

    fat = Math.round(weight * 1.1);

    protein = Math.round(weight * 2.3);

    carbs = Math.round(((calorieGoal - ((fat*9)+(protein*4))))/4);


    const newUser = new User({email: email, password: password, gender : gender, firstName: firstName, 
                              age : age, weight: weight, height: height, targetWeight : targetWeight, 
                              goal: goal, calorieGoal: calorieGoal, carbs : carbs, protein: protein, fat: fat
                            });
    try{
        const savedUser = await newUser.save();

        const token = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET);

        res.header('auth-token', token).json(token);
    }catch(err){
        res.status(400).json('Error: ' + err);
    }
})

router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body);
    if(error){
        return res.status(400).json(error.details[0].message);
    }

    const user = await User.findOne({email: req.body.email})
    if(!user){
        return res.status(400).json("Email is not found!");
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(400).json("Invalid Password!");
    }

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json(token);
})

router.patch('/addExtraMeals', auth, async (req, res) => {
    const { error } = validateAddExtraMeal(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const extraMealName = req.body.extraMealName;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    const mealsBeforeChange = await Meals.findOne(
        {user: user},
    );

    const extraMeal = userBeforeChange.extraMeals.find(extraMeal => {extraMeal === extraMealName});

    let extraMealId;

    if(!mealsBeforeChange){
        extraMealId = 4;
    }else{
        extraMealId = mealsBeforeChange.meals.length;
    }
     

    if(extraMeal){
        return res.status(400).json("extraMeal already exists!");
    }

    if(userBeforeChange.extraMeals.length >= 4){
        return res.status(400).json("You are adding too many extraMeals!");
    }

    try{
        const addedExtraMeal = await User.updateOne(
            {_id: user},
            {$push: { extraMeals: extraMealName }}
        );
        const addedAllExtraMeals = await Meals.updateMany(
            {user: user},
            {$push: { meals: {name: extraMealName, id: extraMealId}}}
        );
        res.json("ExtraMeal added!");
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

router.patch('/deleteExtraMeals', auth, async (req, res) => {
    const { error } = validateAddExtraMeal(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const extraMealName = req.body.extraMealName;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );
    

    try{
        const deletedExtraMeal = await User.updateOne(
            {_id: user},
            {$pull: { extraMeals: extraMealName }}
        );

        const deletedAllExtraMeals = await Meals.updateMany(
            {user: user},
            {$pull: { "meals": {name: extraMealName }}}
        );


        if(deletedExtraMeal.nModified === 1 && deletedAllExtraMeals.nModified >= 1){
            res.json("ExtraMeal deleted!");
        }else{
            res.status(400).json("Error while deleting ExtraMeal!");
        }
        
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

router.patch('/addStorage', auth, async (req, res) => {
    const { error } = validateAddStorage(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const location = req.body.location;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    

    const storage = userBeforeChange.storage.find(storage => storage.location === location);

    if(storage){
        return res.status(400).json("Location already exists!");
    }

    if(userBeforeChange.storage.length >= 4){
        return res.status(400).json("You are adding too many storages!");
    }

    try{
        const addedStorage = await User.updateOne(
            {_id: user},
            {$push: { storage: { location: location} }}
        );
        res.json("Location added!");
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

router.patch('/deleteStorage', auth, async (req, res) => {
    const { error } = validateAddStorage(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const location = req.body.location;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    const storage = userBeforeChange.storage.find(storage => storage.location === location);
    
    if(!storage){
        return res.status(400).json("Location does not exists!");
    }

    try{
        const deletedStorage = await User.updateOne(
            {_id: user},
            {$pull: { storage: {location: location} }}
        );
        if(deletedStorage.nModified === 1){
            res.json("Storage deleted!");
        }else{
            res.status(400).json("Error while deleting Storage!");
        }
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

//Iwi könnte man noch ein Limit für storedFood machn, dass wenn man 20 Objekte hat und 
//man dann eins hinzufügt dass ma schaut ob iwo weight bei einem 0 is, dass man dann bei deleteFood nicht so ein Problem hat
//wenn man des ja quasi nd benutzt und man wieda hinzufügt zu storedFood wenns da raus kommt
router.patch('/addFoodToStorage', auth, async (req, res) => {
    const { error } = validateAddFoodToStorage(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const location = req.body.location;
    const addFood = req.body.addFood;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    const storage = userBeforeChange.storage.find(storage => storage.location === location);

    if(!storage){
        return res.status(400).json("Location doesnt exist!");
    }

    const foodFromStorage = storage.storedFood.find(food => food.code === addFood.code)

    if(foodFromStorage){
        try{
            const addedFoodToStorage = await User.updateOne(
                {_id: user, "storage.location" : location},
                { $inc: {"storage.$.storedFood.$[food].weight": addFood.weight}},
                { arrayFilters: [ { "food.code": addFood.code } ]},
            );
            res.json("Food added to storage!");
        }catch(err){
            res.status(400).json('Error: ' + err)
        }
    }else{
        try{
            const addedFoodToStorage = await User.updateOne(
                {_id: user, "storage.location" : location},
                {$push: { "storage.$.storedFood" :  addFood}}
            );
            res.json("Food added to storage!");
        }catch(err){
            res.status(400).json('Error: ' + err)
        }
    }


})

router.patch('/changeFoodFromStorage', auth, async (req, res) => {
    const { error } = validateChangeFoodFromStorage(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const location = req.body.location;
    const code = req.body.code;
    const weight = req.body.weight;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    const storage = userBeforeChange.storage.find(storage => storage.location === location);

    if(!storage){
        return res.status(400).json("Location doesnt exist!");
    }

    const foodFromStorage = storage.storedFood.find(food => food.code === code)

    if(foodFromStorage){
        try{
            const addedFoodToStorage = await User.updateOne(
                {_id: user, "storage.location" : location},
                { $set: {"storage.$.storedFood.$[food].weight": weight}},
                { arrayFilters: [ { "food.code": code } ]},
            );
            res.json("Foodweight changed!");
        }catch(err){
            res.status(400).json('Error: ' + err);
        }
    }else{
        res.status(400).json("Food doesn't exit!");
    }


})

router.patch('/deleteFoodFromStorage', auth, async (req, res) => {
    const { error } = validateDeleteFoodFromStorage(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const location = req.body.location;
    const code = req.body.code;
    const weight = req.body.weight;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    const storage = userBeforeChange.storage.find(storage => storage.location === location);

    if(!storage){
        return res.status(400).json("Location doesnt exist!");
    }

    const foodFromStorage = storage.storedFood.find(food => food.code === code);

    if(!foodFromStorage){
        return res.status(400).json("Food doesnt exist!");
    }

    /*if(foodFromStorage.weight <= weight){
        try{
            const deletedFoodFromStorage = await User.updateOne(
                {_id: user, "storage.location": location},
                { $pull: { "storage.$.storedFood": { code: code, weight: {$lte: weight} } } }
            );
            res.json(deletedFoodFromStorage);
        }catch(err){
            res.status(400).json('Error: ' + err)
        }*/
    try{
        const deletedFoodFromStorage = await User.updateOne(
            {_id: user, "storage.location": location},
            { $inc: {"storage.$.storedFood.$[food].weight": -weight}},
            { arrayFilters: [ { "food.code": code } ]},
        );
        res.json(deletedFoodFromStorage);
    }catch(err){
            res.status(400).json('Error: ' + err)
    }
})

router.patch('/changeCalories', auth, async (req, res) => {
    const { error } = validateChangeCalories(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const newCalorieGoal = req.body.newCalorieGoal;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    if(userBeforeChange.calorieGoal === newCalorieGoal){
        return res.json("Nothing to change!");
    }

    const ratio = newCalorieGoal/userBeforeChange.calorieGoal;

    let fat = Math.round((userBeforeChange.weight * 1.1) );
    let protein = Math.round((userBeforeChange.weight * 2.3));

    let fatCalories =  Math.round(fat*9);
    let proteinCalories =  Math.round(protein*4);
    let carbCalories = newCalorieGoal - (fatCalories + proteinCalories);

    let carbs = Math.round(carbCalories/4);


    try{
        const changeCalories = await User.updateOne(
            {_id: user},
            {$set: {calorieGoal: newCalorieGoal, carbs: carbs, fat: fat, protein: protein}}
        );
        res.json("Calories changed!");
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

router.patch('/changeCarbs', auth, async (req, res) => {
    const { error } = validateChangeCarbs(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const newCarbs = req.body.newCarbs;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    if(userBeforeChange.carbs === newCarbs){
        return res.json("Nothing to change!");
    }

    let carbCaloriesDiff = Math.round((newCarbs*4) - (userBeforeChange.carbs*4));

    try{
        const changeCalories = await User.updateOne(
            {_id: user},
            {
                $set: {carbs: newCarbs},
                $inc: {calorieGoal: carbCaloriesDiff}
            }
        );
        res.json("Carbs changed!");
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

router.patch('/changeProtein', auth, async (req, res) => {
    const { error } = validateChangeProtein(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const newProtein = req.body.newProtein;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    if(userBeforeChange.protein === newProtein){
        return res.json("Nothing to change!");
    }

    let proteinCaloriesDiff = Math.round((newProtein*4) - (userBeforeChange.protein*4));

    try{
        const changeProtein = await User.updateOne(
            {_id: user},
            {
                $set: {protein: newProtein},
                $inc: {calorieGoal: proteinCaloriesDiff}
            }
        );
        res.json("Protein changed!");
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

router.patch('/changeFat', auth, async (req, res) => {
    const { error } = validateChangeFat(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    const user = req.user._id;
    const newFat = req.body.newFat;
    
    const userBeforeChange = await User.findOne(
        {_id: user},
    );

    if(userBeforeChange.fat === newFat){
        return res.json("Nothing to change!");
    }

    let fatCaloriesDiff = Math.round((newFat*9) - (userBeforeChange.fat*9));

    try{
        const changeFat = await User.updateOne(
            {_id: user},
            {
                $set: {fat: newFat},
                $inc: {calorieGoal: fatCaloriesDiff}
            }
        );
        res.json("Fat changed!");
    }catch(err){
        res.status(400).json('Error: ' + err)
    }
})

export default router;
