import { Divider, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import Product from '../components/Product'
import products from '../products'

const Home = () => {
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
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default Home
