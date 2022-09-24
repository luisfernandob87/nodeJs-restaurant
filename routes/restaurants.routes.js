const express = require('express');

const {
  getAllRestaurants,
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  getRestaurant,
  updateRestaurant,
  updateReview,
} = require('../controllers/restaurants.controller');

const {
  createRestaurantValidators,
} = require('../middlewares/validators.middlewares');

const { restaurantExists } = require('../middlewares/restaurants.middlewares');

const {
  protectSession,
  protectAdmin,
  protectReviewOwners,
} = require('../middlewares/auth.middlewares');
const { reviewExists } = require('../middlewares/review.middlewares');

const restaurantsRouter = express.Router();

restaurantsRouter.get('/', getAllRestaurants);

restaurantsRouter.get('/:id', restaurantExists, getRestaurant);

restaurantsRouter.use(protectSession);

restaurantsRouter.post('/', createRestaurantValidators, createRestaurant);

restaurantsRouter.patch(
  '/:id',
  protectAdmin,
  restaurantExists,
  updateRestaurant
);

restaurantsRouter.delete(
  '/:id',
  protectAdmin,
  restaurantExists,
  deleteRestaurant
);

restaurantsRouter.post('/reviews/:id', restaurantExists, createReview);

restaurantsRouter.patch(
  '/reviews/:id',
  reviewExists,
  protectReviewOwners,
  updateReview
);

restaurantsRouter.delete(
  '/reviews/:id',
  reviewExists,
  protectReviewOwners,
  deleteReview
);

module.exports = { restaurantsRouter };
