import { Box, IconButton, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import type { FC } from 'react'

type Props = {
  description: string,
  onRequestRemove?: () => void
}

const EventItem: FC<Props> = ({ description, onRequestRemove }: Props) => {
  return (
    <Box
      bg='white'
      mt='3'
      borderRadius='13px'
      display='flex'
      justifyContent='center'
      alignItems='center'
      maxW={'500px'}
    >
      <Box color='#707070' w='100%' p='5' pr='0' fontSize='xl'>
        <Text noOfLines={3}>{description}</Text>
      </Box>
      {onRequestRemove && (
        <IconButton
          aria-label='Add new event'
          m='8' size='xsm' bg='#d9d9d9'
          _hover={{ bg: '#ebebeb' }}
          onClick={onRequestRemove}
          icon={<SmallCloseIcon color='white' />}
          isRound
        />
      )}
    </Box>
  )
}

export default EventItem
