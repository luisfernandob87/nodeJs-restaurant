const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync.util');

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: { status: 'active' },
  });
  res.status(200).json({
    status: 'success',
    data: { restaurants },
  });
});

const getRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    data: { restaurant },
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });
  res.status(201).json({
    status: 'success',
    data: { newRestaurant },
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({ name, address });

  res.status(200).json({
    status: 'success',
    data: { restaurant },
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

const createReview = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;
  const { comment, rating } = req.body;

  const newReview = await Review.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId: id,
  });
  res.status(201).json({
    status: 'success',
    data: { newReview },
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;

  await review.update({ comment, rating });

  res.status(200).json({
    status: 'success',
    data: { review },
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await review.update({ status: 'deleted' });
  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
