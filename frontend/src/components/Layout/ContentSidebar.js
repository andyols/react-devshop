import { Flex, Stack } from '@chakra-ui/react'

const ContentSidebar = ({ content, contentWidth, sidebar, sidebarWidth }) => (
  <Flex wrap='wrap'>
    <Stack flex={`1 1 ${contentWidth || '60%'}`} align='flex-start'>
      {content}
    </Stack>

    <Stack flex={`1 1 ${sidebarWidth || '30%'}`} align='flex-start'>
      {sidebar}
    </Stack>
  </Flex>
)

export default ContentSidebar
