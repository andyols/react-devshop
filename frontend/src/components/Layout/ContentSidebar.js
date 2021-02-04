import { Flex, Stack } from '@chakra-ui/react'

const ContentSidebar = ({
  content,
  contentW,
  minContentW,
  maxContentW,
  sidebar,
  sidebarW,
  minSidebarW,
  maxSidebarW,
  ...rest
}) => (
  <Flex wrap='wrap' {...rest}>
    <Stack
      flex={`1 1 ${contentW || '60%'}`}
      align={['center', 'flex-start']}
      minW={minContentW && minContentW}
      maxW={maxContentW || '100%'}
    >
      {content}
    </Stack>

    <Stack
      flex={`1 1 ${sidebarW || '30%'}`}
      align={['center', 'center', 'flex-start']}
      minW={minSidebarW && minSidebarW}
      maxW={maxSidebarW || '100%'}
      mt={[12, 0]}
    >
      {sidebar}max
    </Stack>
  </Flex>
)

export default ContentSidebar
