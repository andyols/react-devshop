import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiMoon, FiSun } from 'react-icons/fi'

export const ColorModeSwitcher = (props) => {
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
      icon={<SwitchIcon />}
      _hover={{ background: hoverBg }}
      {...props}
    />
  )
}
