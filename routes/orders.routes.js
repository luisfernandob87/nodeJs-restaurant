const express = require('express');

const {
  createOrder,
  deleteOrder,
  getOrders,
  updateOrder,
} = require('../controllers/orders.controller');

const { orderExists } = require('../middlewares/orders.middlewares');

const {
  protectSession,
  protectOrderOwners,
} = require('../middlewares/auth.middlewares');

const orderRouter = express.Router();

orderRouter.use(protectSession);

orderRouter.post('/', createOrder);

orderRouter.get('/me', getOrders);

orderRouter.patch('/:id', orderExists, protectOrderOwners, updateOrder);

orderRouter.delete('/:id', orderExists, protectOrderOwners, deleteOrder);

module.exports = { orderRouter };
