const { Meal } = require('../models/meal.model');

const { catchAsync } = require('../utils/catchAsync.util');

const { AppError } = require('../utils/appError.util');

const mealExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id } });

  if (!meal) {
    return next(new AppError('Meal does not exists', 404));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExists };
