import asyncHandler from 'express-async-handler'
import Order from '../models/order.js'

/**
 *  @desc    Create a new order
 *  @route   POST /api/orders
 *  @access  Private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body

  if (orderItems?.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

/**
 *  @desc    Get order by id
 *  @route   GET /api/orders/:id
 *  @access  Private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
