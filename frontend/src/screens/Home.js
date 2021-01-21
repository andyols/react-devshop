import { Divider, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useQuery } from 'react-query'
import ProductCard from '../components/ProductCard'

const getProducts = async () => {
  const { data } = await axios({
    url: '/api/products',
    method: 'GET'
  })
  return data
}

const Home = () => {
  const { data: products, isSuccess } = useQuery('products', getProducts)
  return (
    <Stack>
      <Heading size='lg'>Welcome to dev-shop</Heading>
      <Text color='gray.500'>
        Browse the latest and greatest tech and gear to make you the best
        developer you can be.
      </Text>
      <Heading size='md' pt={5}>
        Latest Products
      </Heading>
      <Divider />
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={[3, 4, 5]} pt={3}>
        {isSuccess &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </SimpleGrid>
    </Stack>
  )
}

export default Home
