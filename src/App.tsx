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
      p={[4, 16]}
    >
      <Center>
        <Box w='100%' maxW='lg'>
          <Calendar selectedDate={selectedDate} onChange={setSelectedDate} />
          <EventList selectedDate={selectedDate} />
        </Box>
      </Center>
    </Box>
  )
}

export default App
