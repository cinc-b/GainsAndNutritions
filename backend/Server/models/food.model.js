import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    kcal: {
        type: Number,
        required: true,
        min: 0
    },
    carbs: {
        type: Number,
        required: true,
        min: 0
    },
    fiber: {
        type: Number,
        required: true,
        min: 0
    },
    sugar: {
        type: Number,
        required: true,
        min: 0
    },
    protein: {
        type: Number,
        required: true,
        min: 0
    },
    fat: {
        type: Number,
        required: true,
        min: 0
    },
    saturatedFat: {
        type: Number,
        required: true,
        min: 0
    },
    salt: {
        type: Number,
        required: true,
        min: 0
    },
    addedBy: {
        type: mongoose.ObjectId,
        required: true
    }
});

const Food = mongoose.model('Food', foodSchema);

export default Food;