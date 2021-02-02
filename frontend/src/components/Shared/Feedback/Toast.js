import { useBreakpointValue, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Toast = () => {
  // redux
  const { auth, cart, order } = useSelector((state) => state)
  const authToast = auth.toast
  const cartToast = cart.toast
  const orderToast = order.toast

  const toast = useToast()
  const toastPosition = useBreakpointValue({ base: 'top', md: 'bottom' })

  useEffect(() => {
    if (authToast || cartToast || orderToast) {
      toast.closeAll()
      toast({
        title: authToast || cartToast || orderToast,
        status: 'success',
        position: toastPosition
      })
    }
  }, [authToast, cartToast, orderToast, toast, toastPosition])

  return true
}

export default Toast
