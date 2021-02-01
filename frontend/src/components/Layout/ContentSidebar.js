import { Flex, Stack, useBreakpointValue } from '@chakra-ui/react'

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
      align={useBreakpointValue({ base: 'center', sm: 'flex-start' })}
      flex={`1 1 ${contentW || '60%'}`}
      minW={minContentW && minContentW}
      maxW={maxContentW && maxContentW}
    >
      {content}
    </Stack>

    <Stack
      mt={useBreakpointValue({ base: 12, sm: 0 })}
      align={useBreakpointValue({ base: 'center', sm: 'flex-start' })}
      flex={`1 1 ${sidebarW || '30%'}`}
      minW={minSidebarW && minSidebarW}
      maxW={maxSidebarW && maxSidebarW}
    >
      {sidebar}max
    </Stack>
  </Flex>
)

export default ContentSidebar
