import { Box, IconButton } from '@chakra-ui/react'
import type { FC } from 'react'

type Props = {
  description: string,
  onRequestRemove: () => void
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
    >
      <Box color='#707070' w='100%' p='5' pr='0' fontSize='xl'>
        {description}
      </Box>
      <IconButton
        aria-label='Add new event'
        bg='green' m='5' size='sm'
        onClick={onRequestRemove}
        isRound
      />
    </Box>
  )
}

export default EventItem
