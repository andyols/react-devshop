import { Progress } from '@chakra-ui/react'

const Loader = () => {
  return (
    <Progress
      size='xs'
      isIndeterminate
      w='100vw'
      mt='-2px'
      colorScheme='purple'
      background='none'
      top='-10'
      left='50%'
      transform='translate(-50%,-50%)'
      pos='relative'
    />
  )
}

export default Loader
