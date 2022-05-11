import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Flex, Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FC, useEffect, useState } from 'react'
import { MonthNames } from '../common/monthNames'

type Props = {
  selectedDate: Date,
  onChange: (date: Date) => void
}

type CalendarDate = {
  date: Date,
  isSelected: boolean,
  isInMonth: boolean
}

const Calendar: FC<Props> = ({ selectedDate, onChange }: Props) => {
  const [dateOfMonthShown, setDateOfMonthShown] = useState<Date>(selectedDate)
  const [shownDates, setShownDates] = useState<CalendarDate[]>([])

  /**
   * Offsets the shown month by the given amount.
   * @param offset The number of months to offset the calendar by. 0 resets to the selected month.
   */
  const offsetShownMonth = (offset: number) => {
    const newShownDate = new Date(dateOfMonthShown)
    newShownDate.setMonth(newShownDate.getMonth() + offset)
    if (offset === 0) {
      setDateOfMonthShown(new Date())
    } else {
      setDateOfMonthShown(newShownDate)
    }
  }

  /**
   * Updates the calendar to display dates for the month of `shownDate`.
   */
  const updateCalendar = () => {
    if (selectedDate) {
      // Takes the zeroth day of the next month, which is the last day of the current month.
      const daysInShownMonth = new Date(dateOfMonthShown.getFullYear(), dateOfMonthShown.getMonth() + 1, 0).getDate()

      // Which week day does the month start on? 0 is Monday, 6 is Sunday
      const weekDayOffset = (new Date(dateOfMonthShown.getFullYear(), dateOfMonthShown.getMonth(), 1).getDay() + 6) % 7

      const numberOfGrids = Math.ceil((daysInShownMonth + weekDayOffset) / 7) * 7

      const dates: { date: Date, isSelected: boolean, isInMonth: boolean }[] = []
      for (let i = 0; i < numberOfGrids; i++) {
        const offset = i - weekDayOffset + 1
        const date = new Date(dateOfMonthShown.getFullYear(), dateOfMonthShown.getMonth(), offset)

        const isSelected = date.toDateString() === selectedDate.toDateString()
        const isInMonth = offset > 0 && offset <= daysInShownMonth

        dates.push(({ date, isSelected, isInMonth }))
      }

      setShownDates(dates)
    }
  }

  useEffect(() => {
    updateCalendar()
  }, [dateOfMonthShown, selectedDate])

  return (
    <Box
      bg='white' color='#707070'
      mb={10} maxW='lg' borderRadius='13px'
      boxShadow='0 0 15px 0 rgba(0, 0, 0, 0.04)'
      fontFamily='Roboto'
      fontSize='xl'
    >
      <Flex pl={8} pr={5} justify='space-between' fontSize='xl'>
        <Box py={5} fontWeight='bold' color='#707070'>
          {MonthNames[dateOfMonthShown.getMonth()]}
          <Box as='span' fontWeight='normal' ml={1.5}>
            {dateOfMonthShown.getFullYear()}
          </Box>
        </Box>
        <ButtonGroup alignItems='center' spacing={1}>
          <IconButton
            aria-label='View previous month'
            onClick={() => offsetShownMonth(-1)}
            icon={<ChevronLeftIcon color='white' w={6} h={6} />}
            size='sm' bg='#8c5ec3' _hover={{ bg: '#a170db' }}
            isRound
          />
          <Button
            variant='ghost' color='#8c5ec3'
            fontSize='inherit' fontWeight='medium'
            onClick={() => {
              offsetShownMonth(0)
              onChange(new Date())
            }
          }>Today</Button>
          <IconButton
            aria-label='View next month'
            onClick={() => offsetShownMonth(1)}
            icon={<ChevronRightIcon color='white' w={6} h={6} />}
            size='sm' bg='#8c5ec3' _hover={{ bg: '#a170db' }}
            isRound
          />
        </ButtonGroup>
      </Flex>
      <Flex wrap='wrap'>
        {shownDates.map(({ date, isSelected, isInMonth }: CalendarDate, index) => (
          <Box
            key={index}
            flex='1 0 calc(100%/7)'
            h='3.25rem' pos='relative'
            borderRight='1px' borderTop='1px' borderColor='#f2f2f2'
            sx={{
              ':nth-child(7n)': { borderRight: 'none' },
              ':nth-last-child(7) :first-child': { borderBottomLeftRadius: '13px' },
              ':last-child :first-child': { borderBottomRightRadius: '13px' }
            }}
          >
            <Box h='full' bg={isSelected ? '#a170db' : 'white'}>
              <Button
                variant='unstyled' h='full' w='full'
                fontWeight='light' fontSize='inherit'
                color={isSelected ? 'white' : '#707070'}
                opacity={isInMonth ? undefined : 0.38}
                tabIndex={isInMonth ? undefined : -1}
                pointerEvents={isInMonth ? undefined : 'none'}
                onClick={() => onChange(date)}
                zIndex={1}
              >
                <Box as='span' pos='absolute' bottom={0.25} right={1.5}>
                  {date.getDate()}.
                </Box>
              </Button>
            </Box>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

export default Calendar
