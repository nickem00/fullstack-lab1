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

export const getDishByName = async (req, res, next) => {
    try {
        let { name } = req.params;
        
        // make it case-insensitive   
        name = name.toLowerCase();

        const searchedDish = await Dish.findOne({ name: name})

        if (!searchedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(searchedDish)

    } catch (error) {
        console.error("Error while fetching dish by name from database:");
        next(error);
    }
}

export const createDish = async (req, res, next) => {
    try {
        let {
            name,
            ingredients,
            preparationSteps,
            cookingTime,
            origin,
            isVegetarian
        } = req.body;

        name = name.toLowerCase();
        origin = origin.toLowerCase();

        const alreadyExists = await Dish.find({ name: name });

        if (alreadyExists.length > 0) {
            return res.status(409).json({ message: "Dish with that name already exists" })
        }

        const newDish = {
            name: name,
            ingredients: ingredients,
            preparationSteps: preparationSteps,
            cookingTime: cookingTime,
            origin: origin,
            isVegetarian: isVegetarian
        };

        const result = await Dish.create(newDish);

        res.status(201).json(result)
        
    } catch (error) {
        console.error("Error while creating a new dish in the database:");
        next(error);
    }
}

export const updateDish = async (req, res, next) => {
    try {
        const { id } = req.params;
        const {
            name,
            ingredients,
            preparationSteps,
            cookingTime,
            origin,
            isVegetarian
        } = req.body;

        if (!name || !ingredients || !preparationSteps || !cookingTime || !origin || isVegetarian === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedDish = await Dish.findByIdAndUpdate(
            id,
            {
                name: name.toLowerCase(),
                ingredients,
                preparationSteps,
                cookingTime,
                origin: origin.toLowerCase(),
                isVegetarian
            },
            { new: true }
        );

        if (!updatedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(updatedDish)

    } catch (error) {
        console.error("Error while updating dish:");
        next(error);
    }
}

export const deleteDishById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedDish = await Dish.findByIdAndDelete(id)

        if (!deletedDish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json({
            message: "Dish deleted successfully",
            deleted: deletedDish
        });

    } catch (error) {
        console.error("Error while deleting dish:");
        next(error);
    }

}

export const getDishById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const dish = await Dish.findById(id);

        if (!dish) {
            return res.status(404).json({ message: "Dish not found" });
        }

        res.status(200).json(dish);
        
    } catch (error) {
        console.error("Error while fetching dish by ID:");
        next(error);
    }
}