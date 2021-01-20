import React from 'react'
import { ChakraProvider, Box, theme, Heading, VStack } from '@chakra-ui/react'
import { ColorModeSwitcher } from './ColorModeSwitcher'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box p={3}>
        <VStack spacing={8}>
          <ColorModeSwitcher alignSelf='flex-end' />
          <Heading size='lg'>Welcome to the shop</Heading>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}

export default App
