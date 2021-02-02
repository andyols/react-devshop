import { useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Toast = () => {
  // redux
  const { auth, cart, order } = useSelector((state) => state)
  const authToast = auth.toast
  const cartToast = cart.toast
  const orderToast = order.toast

  const toast = useToast()

  useEffect(() => {
    if (authToast || cartToast || orderToast) {
      toast.closeAll()
      toast({
        description: authToast || cartToast || orderToast,
        status: 'success',
        position: 'top'
      })
    }
  }, [authToast, cartToast, orderToast, toast])

  return true
}

export default Toast
