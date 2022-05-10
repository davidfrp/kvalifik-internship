import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Table, Thead, Tbody, Tr, Td, Flex, Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FC, ReactElement, useEffect, useState } from 'react'
import { MonthNames } from '../common/monthNames'

type Props = {
  selectedDate: Date,
  onChange: (date: Date) => void
}

const Calendar: FC<Props> = ({ selectedDate, onChange }: Props) => {
  const [shownDate, setShownDate] = useState<Date>(selectedDate)
  const [tableRows, setTableRows] = useState<ReactElement[]>([])

  /**
   * Offsets the shown month by the given amount.
   * @param offset The number of months to offset the calendar by. 0 resets to the selected month.
   */
  const offsetShownMonth = (offset: number) => {
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
  const updateCalendar = () => {
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
              border='1px' borderColor='#f2f2f2'
              h='3.25rem' w='4.5rem' p='0' position='relative'
              bg={isSelectedDate ? '#a170db' : undefined}
              color={isOutOfRange ? '#dfdfdf' : (isSelectedDate ? 'white' : 'inherit')}
            >
              <Button
                pointerEvents={isOutOfRange ? 'none' : 'auto'}
                variant='unstyled' h='full' w='full'
                fontWeight='inherit' fontSize='inherit'
                onClick={() => onChange(cellDate)}
              >
                <Box position='absolute' bottom='1.5' right='1.5'>
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
      fontSize='xl'
    >
      <Flex w='full' pl='8' pr='5' justify='space-between' fontSize='xl'>
        <Box py='5' fontWeight='bold' color='#707070'>
          {MonthNames[shownDate.getMonth()]}
          <Box as='span' fontWeight='normal' ml='1.5'>
            {shownDate.getFullYear()}
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
      <Table variant='unstyled'>
        <Thead>
        </Thead>
        <Tbody fontWeight='light'>
          {tableRows}
        </Tbody>
      </Table>
    </Box>
  )
}

export default Calendar
