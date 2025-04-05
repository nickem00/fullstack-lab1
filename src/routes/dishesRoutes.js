import express from "express";
import {
    getAllDishes
} from '../controllers/dishesController.js';

const router = express.Router();

router.get('/', getAllDishes);

export default router;