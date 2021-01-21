import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

const Home = ({ match }) => {
  const product = products.find((p) => p._id === match.params.id)
  const inStock = product.countInStock > 0
  const inStockColor = useColorModeValue('green.600', 'green.300')
  const outOfStockColor = useColorModeValue('red.600', 'red.300')
  const addToCartButtonColor = useColorModeValue('purple', 'cyan')
  return (
    <Stack>
      <Box pt={7}>
        <Button
          as={RouterLink}
          to='/'
          leftIcon={<FiArrowLeft />}
          variant='ghost'
        >
          Go Back
        </Button>
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={12}>
        <Image src={product.image} alt={product.name} borderRadius='sm' />
        <Stack spacing={3}>
          <Heading size='lg'>{product.name}</Heading>
          <Divider />
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <Text fontWeight='semibold'>Price: ${product.price}</Text>
          <Divider />
          <Text>{product.description}</Text>
        </Stack>
        {/* add to cart column */}
        <Stack d='block' spacing={5}>
          <Stat>
            <StatLabel>Total Price</StatLabel>
            <StatNumber>${product.price}</StatNumber>
            <StatHelpText color={inStock ? inStockColor : outOfStockColor}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </StatHelpText>
          </Stat>
          <Divider />
          <Button
            mt={3}
            w='100%'
            colorScheme={addToCartButtonColor}
            rightIcon={<FiShoppingCart />}
            disabled={!inStock}
          >
            Add to Cart
          </Button>
        </Stack>
      </SimpleGrid>
    </Stack>
  )
}

export default Home
