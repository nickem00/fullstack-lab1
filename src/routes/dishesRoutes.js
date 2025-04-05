import express from "express";
import {
    getAllDishes,
    getDishByName,
    createDish,
    updateDish
} from '../controllers/dishesController.js';

const router = express.Router();

router.get('/', getAllDishes);
router.get('/:name', getDishByName);
router.post('/', createDish);
router.put('/:id', updateDish);

export default router;