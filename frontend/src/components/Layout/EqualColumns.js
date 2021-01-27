import { Flex, Stack } from '@chakra-ui/react'

const EqualColumns = ({ children, minW }) => {
  const width = 100 / children.length
  return (
    <Flex wrap='wrap'>
      {children.map((child, i) => (
        <Stack flex={`1 1 ${width}%`} p={5} minW={minW || '30ch'} key={i}>
          {child}
        </Stack>
      ))}
    </Flex>
  )
}

export default EqualColumns
