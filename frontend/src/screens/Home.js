import { Divider, Heading, SimpleGrid } from '@chakra-ui/react'
import Product from '../components/Product'
import products from '../products'

const Home = () => {
  return (
    <>
      <Heading size='md' pt={5}>
        Latest Products
      </Heading>
      <Divider />
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={[3, 4, 5]} pt={3}>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </>
  )
}

export default Home
