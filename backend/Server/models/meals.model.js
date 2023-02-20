import mongoose from "mongoose";

const Schema = mongoose.Schema;


//Meal
const mealSchema = new Schema({
    id: {
        type: Number,
        required: true,
        max: 8
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    },
    carbs: {
        type: Number,
        required: true,
        default: 0
    },
    sugar: {
        type: Number,
        required: true,
        default: 0
    },
    fiber: {
        type: Number,
        required: true,
        default: 0
    },
    protein: {
        type: Number,
        required: true,
        default: 0
    },
    fat: {
        type: Number,
        required: true,
        default: 0
    },
    saturatedFat: {
        type: Number,
        required: true,
        default: 0
    },    
    salt: {
        type: Number,
        required: true,
        default: 0
    },
    food: []
}, { _id: false });



//Meals
const mealsSchema = new Schema({
    date: {
        type: Date,
        required: true,
        //NUR FÜR STRING! trim: true,
    },
    user: {
        type: mongoose.ObjectId,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
        default: 0
    },
    carbs: {
        type: Number,
        required: true,
        default: 0
    },
    sugar: {
        type: Number,
        required: true,
        default: 0
    },
    fiber: {
        type: Number,
        required: true,
        default: 0
    },
    protein: {
        type: Number,
        required: true,
        default: 0
    },
    fat: {
        type: Number,
        required: true,
        default: 0
    },
    saturatedFat: {
        type: Number,
        required: true,
        default: 0
    },
    salt: {
        type: Number,
        required: true,
        default: 0
    },
    meals: [mealSchema] 
});

mealsSchema.index({ date: 1, user: 1}, { unique: true });

const Meals = mongoose.model('Meals', mealsSchema);

export default Meals;