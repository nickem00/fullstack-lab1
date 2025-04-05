import express from "express";
import {
    getAllDishes,
    getDishByName
} from '../controllers/dishesController.js';

const router = express.Router();

router.get('/', getAllDishes);
router.get('/:name', getDishByName)

export default router;