import express from "express";
import {
    getAllDishes,
    getDishByName,
    createDish
} from '../controllers/dishesController.js';

const router = express.Router();

router.get('/', getAllDishes);
router.get('/:name', getDishByName);
router.post('/', createDish);

export default router;