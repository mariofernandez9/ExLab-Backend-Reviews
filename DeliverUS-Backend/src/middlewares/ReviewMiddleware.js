import { Order, Review } from '../models/models.js'

const userHasPlacedOrderInRestaurant = async (req, res, next) => {
  try {
    const userId = req.user.id
    const restaurantId = req.params.restaurantId
    const order =  await Order.findOne({ where: {userId, restaurantId} })
    if (!order) {
      return res.status(409).json({ message: 'You can only review restaurants you have placed an order in.' })
    }
    next()
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const checkCustomerHasNotReviewed = async (req, res, next) => {
  try {
    const userId = req.user.id
    const restaurantId = req.params.restaurantId
    const review =  await Review.findOne({ where: {customerId: userId, restaurantId} })
    if (review) {
      return res.status(409).json({ message: 'You have already reviewed this restaurant.' })
    }
    next()
  } catch (error) {
    res.status(500).send(error.message)
  }

}

const checkReviewOwnership = async (req, res, next) => {
  const review = await Review.findByPk(req.params.reviewId)
  if (review.customerId !== req.user.id) {
    return res.status(403).json({ message: 'You do not have permission to modify this review.' })
  }
  next()
}

const checkReviewBelongsToRestaurant = async (req, res, next) => {
  const { restaurantId, reviewId } = req.params

  try {
    const review = await Review.findByPk(reviewId)

    // El comparador doble es intencionado por la diferencia de tipo de datos string vs integer
    // eslint-disable-next-line eqeqeq
    if (review.restaurantId != restaurantId) {
      return res.status(409).json({ error: 'Review does not belong to the specified restaurant.' })
    }

    next()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { checkCustomerHasNotReviewed, userHasPlacedOrderInRestaurant, checkReviewOwnership, checkReviewBelongsToRestaurant }
