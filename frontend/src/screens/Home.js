import {
  Box,
  Divider,
  Heading,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react'
import axios from 'axios'
import { useQuery } from 'react-query'
import ProductCard from '../components/ProductCard'
import { CustomAlert } from '../components/Shared'

const getProducts = async () => {
  const { data } = await axios({
    url: '/api/products',
    method: 'GET'
  })
  return data
}

const Home = () => {
  const { data: products, isSuccess, isFetchedAfterMount, isError } = useQuery(
    'products',
    getProducts
  )
  return (
    <Stack>
      <Heading as='h1' size='lg'>
        Welcome to dev-shop
      </Heading>
      <Text color='gray.500'>
        Browse the latest and greatest tech and gear to make you the best
        developer you can be.
      </Text>
      <Heading size='md' pt={5}>
        Latest Products
      </Heading>
      <Divider />
      <Box pt={3} alignSelf='center'>
        {isError ? (
          <CustomAlert
            status='error'
            title='Oops!'
            description='It looks like something went wrong with the server'
          />
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={[3, 4, 5]} pt={3}>
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                loadStatus={isSuccess && isFetchedAfterMount}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Stack>
  )
}

export default Home
