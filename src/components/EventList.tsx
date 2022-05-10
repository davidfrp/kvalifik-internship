import { Box, Heading, IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { MonthNames } from '../common/monthNames'
import EventItem from './EventItem'

type Props = {
  selectedDate: Date
}

type Event = {
  description: string,
  date: Date
}

const EventList: FC<Props> = ({ selectedDate }: Props) => {
  const [events, setEvents] = useState<Event[]>([])
  const [description, setDescription] = useState<string>('')

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      addEvent({ description, date: selectedDate })
    }
  }

  /**
   * Adds an event to the list
   * @param event The event to add
   */
  const addEvent = (event: Event) => {
    if (description.trim().length > 0) {
      setEvents([...events, event])
      setDescription('')
    }
  }

  /**
   * Removes an event from the list
   * @param event The event to remove
   */
  const removeEvent = (event: Event) => {
    setEvents(events.filter(e => e !== event))
  }

  useEffect(() => {
    setEvents([...events])
  }, [selectedDate])

  return (
    <Box>
      <Heading as='h2' size='lg' m='5' mb='3' fontWeight='thin' color='#707070'>
        {MonthNames[selectedDate.getMonth()]} {selectedDate.getDate()}
      </Heading>
      <InputGroup
        bg='white' maxW='500px' borderRadius='13px'
        boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)'
        display='flex' justifyContent='center'
        alignItems='center'
      >
        <Input
          p='5' pr='4.5rem' placeholder='Add new event'
          variant='unstyled' color='#707070' fontSize='xl'
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={handleKeyPress}
          value={description}
        />
        <InputRightElement mr='1.375rem' top='unset'>
          <IconButton
            aria-label='Add new event'
            onClick={() => addEvent({ description, date: selectedDate })}
            isRound
          />
        </InputRightElement>
      </InputGroup>
      {events.filter((event) =>
        event.date.toDateString() === selectedDate.toDateString()
      ).map((event, index) => (
        <EventItem
          key={index}
          description={event.description}
          onRequestRemove={() => removeEvent(event)}
        />
      )).reverse()}
    </Box>
  )
}

export default EventList
