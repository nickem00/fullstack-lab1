import Dish from "../models/dishModel.js";


export const getAllDishes = async (req, res, next) => {
    try {
        const dishes = await Dish.find();

        if (!dishes || dishes.length === 0) {
            return res.status(404).json({ message: "No dishes found" });
        }

        res.status(200).json(dishes)
    } catch (error) {
        console.error("Error while fetching dishes from database:");
        next(error);
    }
}
