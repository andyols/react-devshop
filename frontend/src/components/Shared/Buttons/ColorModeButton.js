import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

const ColorModeButton = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue('dark', 'light')
  const hoverBg = useColorModeValue('red.300', 'gray.600')
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)

  return (
    <IconButton
      size='md'
      fontSize='lg'
      aria-label={`Switch to ${text} mode`}
      variant='ghost'
      color='current'
      marginLeft='2'
      onClick={toggleColorMode}
      onMouseDown={(e) => e.preventDefault()}
      icon={<SwitchIcon />}
      _hover={{ background: hoverBg }}
      _focus={{ outline: 0, background: hoverBg }}
      {...props}
    />
  )
}

export default ColorModeButton
