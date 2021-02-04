import { Progress, Skeleton } from '@chakra-ui/react'
import { useIsFetching } from 'react-query'
import { useSelector } from 'react-redux'

const Loader = () => {
  // get app loading states from redux and react-query
  const authLoading = useSelector(state => state.auth.loading)
  const isFetching = useIsFetching()

  const show = authLoading || isFetching
  return show ? (
    <Skeleton isLoaded pos='relative' w='100%' h={0}>
      <Progress
        // value={100}
        isIndeterminate
        mt={'3px'}
        w='100%'
        h='6px'
        colorScheme='twitter'
        background='none'
        left='50%'
        transform='translate(-50%,-50%)'
        pos='absolute'
      />
    </Skeleton>
  ) : null
}

export default Loader
