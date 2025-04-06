import express from "express";
import {
    getAllDishes,
    getDishByName,
    createDish,
    updateDish,
    deleteDishById,
    getDishById
} from '../controllers/dishesController.js';

const router = express.Router();

router.get('/', getAllDishes);
router.get('/:name', getDishByName);
router.get('/id/:id', getDishById)
router.post('/', createDish);
router.put('/:id', updateDish);
router.delete('/:id', deleteDishById);

export default router;