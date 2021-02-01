import { theme } from '@chakra-ui/react'

const appTheme = {
  ...theme,
  styles: {
    global: {
      '.js-focus-visible :focus:not([data-focus-visible-added])': {
        outline: 'none',
        boxShadow: 'none'
      }
    }
  }
}

export default appTheme
