import mongoose from "mongoose";

// Schema for validation
const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true
    },
    ingredients: [String],
    preparationSteps: [String],
    cookingTime: Number,
    origin: {
        type: String,
        lowercase: true
    },
    isVegetarian: Boolean
});

// Creating and exporting the model so it can be used in the controller
const Dish = mongoose.model('Dish', dishSchema);

export default Dish;