import { Heading } from '@chakra-ui/react'
const SecondaryHeading = ({ text, ...rest }) => {
  return (
    <Heading as='h2' size='md' {...rest}>
      {text}
    </Heading>
  )
}

export default SecondaryHeading
