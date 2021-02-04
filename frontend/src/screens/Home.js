import { Box, Divider, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { requestProducts } from 'api'
import { Alert } from 'components/Shared/Feedback'
import { ProductCard } from 'components/Shared/Product'
import { PrimaryHeading, Subtitle } from 'components/Shared/Typography'
import { useQuery } from 'react-query'

const Home = () => {
  const { data: products, isLoading, isError } = useQuery(
    'products',
    requestProducts
  )

  return (
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
      <Box alignSelf='center'>
        {isError ? (
          <Alert
            status='error'
            title='Oops!'
            description='It looks like something went wrong with the server'
          />
        ) : (
          !isLoading && (
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={3} pt={3}>
              {products?.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
          )
        )}
      </Box>
    </Stack>
  )
}

export default Home
