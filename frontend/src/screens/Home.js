import { Box, Divider, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { requestProducts } from 'api'
import {
  Alert,
  Loader,
  PrimaryHeading,
  ProductCard,
  Subtitle
} from 'components/Shared'
import { useQuery } from 'react-query'

const Home = () => {
  const { data: products, isLoading, isError } = useQuery(
    'products',
    requestProducts
  )

  return isLoading ? (
    <Loader />
  ) : (
    <Stack>
      <PrimaryHeading text='Welcome to dev-shop' />
      <Subtitle
        text='Browse the latest and greatest tech and gear to make you the best
        developer you can be.'
      />
      <Heading size='md' pt={5}>
        Latest Products
      </Heading>
      <Divider />
      <Box pt={3} alignSelf='center'>
        {isError ? (
          <Alert
            status='error'
            title='Oops!'
            description='It looks like something went wrong with the server'
          />
        ) : (
          <SimpleGrid columns={[1, 2, 3, 4]} spacing={3} pt={3}>
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Stack>
  )
}

export default Home
