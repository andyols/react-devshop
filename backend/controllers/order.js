import asyncHandler from 'express-async-handler'

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
    return
  } else {
    const order = new order({
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
