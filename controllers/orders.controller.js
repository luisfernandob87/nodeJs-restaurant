const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { AppError } = require('../utils/appError.util');
const { Restaurant } = require('../models/restaurant.model');

const { catchAsync } = require('../utils/catchAsync.util');

const getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({
    include: [{ model: Meal, include: { model: Restaurant } }],
    where: { userId: sessionUser.id },
  });

  res.status(200).json({
    status: 'success',
    data: { orders },
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meal.findOne({ where: { id: mealId } });

  console.log(meal);

  if (meal.id !== mealId) {
    return next(new AppError('Meal does not exists', 404));
  }

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
    totalPrice: meal.price * quantity,
  });
  res.status(201).json({
    status: 'success',
    data: { newOrder },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (order.status !== 'active') {
    return next(new AppError('Order does not active', 404));
  }

  await order.update({ status: 'completed' });

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (order.status !== 'active') {
    return next(new AppError('Order does not active', 404));
  }

  await order.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    data: { order },
  });
});

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };
