import { HStack, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'

const ItemList = ({ items }) => {
  return (
    <Stack spacing={5}>
      {items.map((item) => (
        <SimpleGrid minChildWidth='25ch' gap={3} key={item._id}>
          <HStack spacing={6} maxW='35ch'>
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                boxSize='32px'
                fit='cover'
                borderRadius='base'
                ignoreFallback
              />
            )}
            <Text fontWeight='semibold' lineHeight='1.2rem'>
              {item.name}
            </Text>
          </HStack>
          <HStack justifySelf='flex-end' fontSize='sm'>
            {item.qty > 1 && (
              <Text
                color='gray.500'
                fontStyle='italic'
              >{`${item.qty} x $${item.price} =`}</Text>
            )}
            <Text fontWeight='semibold'>{`$${(item.price * item.qty).toFixed(
              2
            )}`}</Text>
          </HStack>
        </SimpleGrid>
      ))}
    </Stack>
  )
}

export default ItemList
