import { Heading } from '@chakra-ui/react'
const PrimaryHeading = ({ text, ...rest }) => {
  return (
    <Heading as='h1' size='lg' {...rest}>
      {text}
    </Heading>
  )
}

export default PrimaryHeading
