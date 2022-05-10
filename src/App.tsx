import { Box, Center } from '@chakra-ui/react'
import { useState } from 'react'
import Calendar from './components/Calendar'
import EventList from './components/EventList'

function App () {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <Box
      minH='100vh'
      bg='#f4f4f4'
      w='100%'
      p='16'
    >
      <Center>
        <Box>
          <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
          <EventList selectedDate={selectedDate} />
        </Box>
      </Center>
    </Box>
  )
}

export default App
