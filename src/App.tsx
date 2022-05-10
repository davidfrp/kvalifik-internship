import { Box, Center } from '@chakra-ui/react'
import { useState } from 'react'
import Calendar from './components/Calendar'
import Events from './components/Events'

function App () {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <Box
      bg='#F4F4F4'
      w='100%'
      h='100vh'
      p='10'
    >
      <Center>
        <Box>
          <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
          <Events/>
        </Box>
      </Center>
    </Box>
  )
}

export default App
