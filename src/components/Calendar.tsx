import { Box, Table, Thead, Tbody, Tr, Td, Flex, Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FC, ReactElement, useEffect, useState } from 'react'

type Props = {
  selectedDate: Date,
  onChange: (date: Date) => void
}

enum MonthNames {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

const Calendar: FC<Props> = ({ selectedDate, onChange }: Props) => {
  const [shownDate, setShownDate] = useState<Date>(selectedDate)
  const [tableRows, setTableRows] = useState<ReactElement[]>([])

  /**
   * Offsets the shown month by the given amount.
   * @param offset The number of months to offset the calendar by. 0 resets to the selected month.
   */
  const offsetShownMonth = (offset: number): void => {
    const newShownDate = new Date(shownDate)
    newShownDate.setMonth(newShownDate.getMonth() + offset)
    if (offset === 0) {
      setShownDate(selectedDate)
    } else {
      setShownDate(newShownDate)
    }
  }

  /**
   * Updates the calendar to display dates for the month of `shownDate`.
   */
  const updateCalendar = (): void => {
    if (selectedDate) {
      // Takes the zeroth day of the next month, which is the last day of the current month.
      const daysInShownMonth = new Date(shownDate.getFullYear(), shownDate.getMonth() + 1, 0).getDate()

      // Which week day does the month start on? 0 is Monday, 6 is Sunday
      const weekDayOffset = (new Date(shownDate.getFullYear(), shownDate.getMonth(), 1).getDay() + 6) % 7

      const rowCount: number = Math.ceil((daysInShownMonth + weekDayOffset) / 7)
      const rows: ReactElement[] = []

      for (let i = 0; i < rowCount; i++) {
        const cells: ReactElement[] = []

        // For each row fill in the dates.
        for (let j = 0; j < 7; j++) {
          // Days offset from the first day of the month.
          const offset = i * 7 + j + 1 - weekDayOffset
          const cellDate = new Date(shownDate.getFullYear(), shownDate.getMonth(), offset)
          const isSelectedDate = selectedDate.toDateString() === cellDate.toDateString()
          const isOutOfRange = offset < 1 || offset > daysInShownMonth

          cells.push(
            <Td
              h='3.25rem' w='4.5rem' p='0'
              border='1px' borderColor='#F2F2F2'
              position='relative'
              bg={isSelectedDate ? '#A170DB' : undefined}
              color={isSelectedDate ? 'white' : 'inherit'}
            >
              <Button
                disabled={isOutOfRange}
                variant='unstyled' h='full' w='full'
                fontWeight='inherit'
                onClick={() => onChange(cellDate)}
              >
                <Box position='absolute' bottom='1.5' right='1.5' fontSize='20px'>
                  {cellDate.getDate()}.
                </Box>
              </Button>
            </Td>
          )
        }

        rows.push(<Tr>{cells}</Tr>)
      }

      setTableRows(rows)
    }
  }

  useEffect(() => {
    updateCalendar()
  }, [shownDate, selectedDate])

  return (
    <Box
      bg='white' color='#707070'
      mb='10' maxW='500px' borderRadius='13px'
      boxShadow='0 0 99px 0px rgba(0, 0, 0, 0.04)'
      fontFamily='Roboto'
      fontWeight='light'
    >
      <Flex w='full' px='1.875rem' bg='' justify='space-between'>
        <Box py='1.5625rem' fontSize='xl' fontWeight='bold' color='#707070'>
          {MonthNames[shownDate.getMonth()]}
          <Box as='span' fontWeight='normal' ml='1.5'>
            {shownDate.getFullYear()}
          </Box>
        </Box>
        <ButtonGroup alignItems='center'>
          <IconButton aria-label='View previous month' onClick={() => offsetShownMonth(-1)} />
          <Button variant='ghost' onClick={() => {
            offsetShownMonth(0)
            onChange(new Date())
          }}>Today</Button>
          <IconButton aria-label='View next month' onClick={() => offsetShownMonth(1)} />
        </ButtonGroup>
      </Flex>
      <Table variant='unstyled'>
        <Thead>
        </Thead>
        <Tbody>
          {tableRows}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Calendar
