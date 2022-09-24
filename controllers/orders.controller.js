const { Order } = require('../models/order.model');

const { catchAsync } = require('../utils/catchAsync.util');

const getOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const orders = await Order.findAll({});

  res.status(200).json({
    status: 'success',
    data: { orders },
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId, totalPrice } = req.body;
  const { sessionUser } = req;

  const newOrder = await Order.create({
    mealId,
    userId: sessionUser.id,
    quantity,
    totalPrice,
  });
  res.status(201).json({
    status: 'success',
    data: { newOrder },
  });
});

const updateOrder = catchAsync(async (req, res, next) => {});

const deleteOrder = catchAsync(async (req, res, next) => {});

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };
