import { Review } from '../models/models.js'

const ReviewController = {

  async index (req, res) {
    try {
      const reviews = await Review.findAll({
        where: { restaurantId: req.param.restaurantId },
        order: [['createdAt', 'DESC']]
      })
      res.json(reviews)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  async create (req, res) {
    try{
      const newReview = Review.build(req.body)
      newReview.customerId = req.user.id
      newReview.restaurantId = req.param.restaurantId
      const createdReview = await newReview.save()
      res.json(createdReview)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  async update (req, res) {
    try{
      const currentReview = await Review.findByPk(req.param.reviewId)
      currentReview.stars = req.body.stars
      currentReview.body = req.body.bodyconst
      res.json(currentReview)
    } catch(err) {
      res.status(500).send(err)
    }
  },

  async destroy (req, res) {
    try{
      const result = await Review.destroy({ where: { id: req.param.reviewId } })
      if (result === 1) {
        res.json({ message: 'Review deleted successfully' })
      } else {
        res.status(404).json({ message: 'Review not found' })
      }
    } catch(err) {
      res.status(500).send(err)
    }
  }

}

export default ReviewController
