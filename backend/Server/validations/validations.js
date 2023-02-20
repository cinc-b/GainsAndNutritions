//const Joi = require('joi');
import Joi from 'joi';

export const validateRegister = (dataToValidate) => {
    const registerSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        gender: Joi.string().valid("male", "female").required(),
        firstName: Joi.string().min(3).required(),
        age: Joi.number().min(18).required(),
        weight: Joi.number().min(40).required(),
        height: Joi.number().min(150).required(),
        goal: Joi.string().valid("lose", "stay", "gain").required(),
        targetWeight: Joi
            .when('goal', {
                is: Joi.string().valid('gain'),
                then: Joi.number().greater(Joi.ref('weight')).required(),
            })
            .when('goal', {
                is: Joi.string().valid('lose'),
                then: Joi.number().less(Joi.ref('weight')).required(),
            })
            .when('goal', {
                is: Joi.string().valid('stay'),
                then: Joi.valid(0),
            })
    })
    return registerSchema.validate(dataToValidate);
}

export const validateLogin = (dataToValidate) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    })
    return loginSchema.validate(dataToValidate);
}

export const validateAddFood = (dataToValidate) => {
    const foodSchema = Joi.object({
        mealId: Joi.number().min(0).max(7).required(),
        selectedLocation: Joi.string().required(),
        date: Joi.date().required(),
        addFood: Joi.object().keys({
            code: Joi.string().required(),
            brand: Joi.string().required(),
            name: Joi.string().required(),
            kcal: Joi.number().required(),
            carbs: Joi.number().required(),
            fiber: Joi.number().required(),
            sugar: Joi.number().required(),
            protein: Joi.number().required(),
            fat: Joi.number().required(),
            saturatedFat: Joi.number().required(),
            salt: Joi.number().required(),
            weight: Joi.number().min(1).required()
        })
    })
    return foodSchema.validate(dataToValidate);
}

export const validateDeleteFood = (dataToValidate) => {
    const foodSchema = Joi.object({
        selectedLocation: Joi.string().required(),
        mealId: Joi.number().min(0).max(7).required(),
        code: Joi.string().required(),
        date: Joi.date().required()
    })
    return foodSchema.validate(dataToValidate);
}

export const validateAddExtraMeal = (dataToValidate) => {
    const extraMealSchema = Joi.object({
        extraMealName: Joi.string().required(),
    })
    return extraMealSchema.validate(dataToValidate);
}

export const validateAddStorage = (dataToValidate) => {
    const StorageSchema = Joi.object({
        location: Joi.string().required(),
    })
    return StorageSchema.validate(dataToValidate);
}

export const validateAddFoodToStorage = (dataToValidate) => {
    const storedFoodSchema = Joi.object({
        location: Joi.string().required(),
        addFood: Joi.object().keys({
            code: Joi.string().required(),
            name: Joi.string().required(),
            brand: Joi.string().required(),
            weight: Joi.number().min(1).required()
        })
    })
    return storedFoodSchema.validate(dataToValidate);
}

export const validateChangeFoodFromStorage = (dataToValidate) => {
    const storedFoodSchema = Joi.object({
        location: Joi.string().required(),
        code: Joi.string().required(),
        weight: Joi.number().required()
    })
    return storedFoodSchema.validate(dataToValidate);
}

export const validateDeleteFoodFromStorage = (dataToValidate) => {
    const storedFoodSchema = Joi.object({
        location: Joi.string().required(),
        code: Joi.string().required(),
        weight: Joi.number().min(1).required()
    })
    return storedFoodSchema.validate(dataToValidate);
}

export const validateAddMeals = (dataToValidate) => {
    const addMealSchema = Joi.object({
        date: Joi.date().required(),
    })
    return addMealSchema.validate(dataToValidate);
}

export const validateAddMeal = (dataToValidate) => {
    const addMealSchema = Joi.object({
        name: Joi.string().required(),
        date: Joi.date().required()
    })
    return addMealSchema.validate(dataToValidate);
}

export const validateFood = (dataToValidate) => {
    const foodSchema = Joi.object({
        code: Joi.string().required(),
        brand: Joi.string().required(),
        name: Joi.string().required(),
        calories: Joi.number().min(0).required(),
        carbs: Joi.number().min(0).required(),
        fiber: Joi.number().min(0).required(),
        sugar: Joi.number().min(0).required(),
        protein: Joi.number().min(0).required(),
        fat: Joi.number().min(0).required(),
        saturatedFat: Joi.number().min(0).required(),
        salt: Joi.number().min(0).required(),
    })  
    return foodSchema.validate(dataToValidate);
}

export const validateFindFood = (dataToValidate) => {
    const addMealSchema = Joi.object({
        value: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
    })
    return addMealSchema.validate(dataToValidate);
}

export const validateChangeFoodWeight = (dataToValidate) => {
    const changeFoodSchema = Joi.object({
        selectedLocation: Joi.string().required(),
        mealId: Joi.number().required(),
        date: Joi.date().required(),
        code: Joi.string().required(),
        newWeight: Joi.number().min(0).required(),
    })
    return changeFoodSchema.validate(dataToValidate);
}

export const validateChangeCalories = (dataToValidate) => {
    const changeCaloriesSchema = Joi.object({
        newCalorieGoal: Joi.number().min(0).required(),
    })
    return changeCaloriesSchema.validate(dataToValidate);
}

export const validateChangeCarbs = (dataToValidate) => {
    const changeCarbsSchema = Joi.object({
        newCarbs: Joi.number().min(0).required(),
    })
    return changeCarbsSchema.validate(dataToValidate);
}

export const validateChangeProtein = (dataToValidate) => {
    const changeProteinSchema = Joi.object({
        newProtein: Joi.number().min(0).required(),
    })
    return changeProteinSchema.validate(dataToValidate);
}

export const validateChangeFat = (dataToValidate) => {
    const changeFatSchema = Joi.object({
        newFat: Joi.number().min(0).required(),
    })
    return changeFatSchema.validate(dataToValidate);
}



/*module.exports.validateRegister = validateRegister;
module.exports.validateLogin = validateLogin;

module.exports.validateAddMeals = validateAddMeals;

module.exports.validateAddMeal = validateAddMeal;


module.exports.validateAddFood = validateAddFood;
module.exports.validateDeleteFood = validateDeleteFood;

module.exports.validateAddExtraMeal = validateAddExtraMeal;

module.exports.validateAddStorage = validateAddStorage;

module.exports.validateAddFoodToStorage = validateAddFoodToStorage;
module.exports.validateChangeFoodFromStorage = validateChangeFoodFromStorage;
module.exports.validateDeleteFoodFromStorage = validateDeleteFoodFromStorage;

module.exports.validateFood = validateFood;

module.exports.validateFindFood = validateFindFood;

module.exports.validateChangeFoodWeight = validateChangeFoodWeight;

module.exports.validateChangeCalories = validateChangeCalories;
module.exports.validateChangeCarbs = validateChangeCarbs;
module.exports.validateChangeProtein = validateChangeProtein;
module.exports.validateChangeFat = validateChangeFat;*/