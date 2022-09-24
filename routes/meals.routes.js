const express = require('express');

const {
  createMeal,
  deleteMeal,
  getAllMeals,
  getMeal,
  updateMeal,
} = require('../controllers/meals.controller');

const { mealExists } = require('../middlewares/meals.middlewares');

const {
  protectSession,
  protectAdmin,
} = require('../middlewares/auth.middlewares');

const {
  createMealsValidators,
} = require('../middlewares/validators.middlewares');

const mealsRouter = express.Router();

mealsRouter.get('/', getAllMeals);

mealsRouter.get('/:id', mealExists, getMeal);

mealsRouter.use(protectSession);

mealsRouter.post('/:id', createMealsValidators, createMeal);

mealsRouter.patch('/:id', protectAdmin, mealExists, updateMeal);

mealsRouter.delete('/:id', protectAdmin, mealExists, deleteMeal);

module.exports = { mealsRouter };
