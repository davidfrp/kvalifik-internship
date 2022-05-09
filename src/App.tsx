import { Box, Center } from '@chakra-ui/react'
import Calendar from './components/Calendar'
import Events from './components/Events'

function App () {
  return (
    <Box
      bg='#F4F4F4'
      w='100%'
      h='100vh'
      p='10'
    >
      <Center>
        <Box>
          <Calendar/>
          <Events/>
        </Box>
      </Center>
    </Box>
  )
}

export default App
