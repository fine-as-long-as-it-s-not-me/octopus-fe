import { useTranslation } from 'react-i18next'
import { useMatch, useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import { useRoom } from '@/context/RoomContext'
import { ROUTES } from '@/routes/ROUTES'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Confirm from '../modals/Confirm'

export default function CloseButton() {
  const navigate = useNavigate()
  const isRoomPage = useMatch(ROUTES.ROOM(':roomCode'))
  const isCustomWordPage = useMatch(ROUTES.CUSTOM_WORD(':roomCode'))
  const isGamePage = useMatch(ROUTES.GAME('*'))

  const { roomCode } = useRoom()
  const { t } = useTranslation()
  const { openModal } = useModal()

  if (isCustomWordPage)
    return (
      <Button
        cardClassName='py-2 md:py-3 h-full'
        size='md'
        onClick={() => {
          navigate(ROUTES.ROOM(roomCode))
        }}
      >
        <Icon name='arrow_back' />
      </Button>
    )
  if (isRoomPage || isGamePage)
    return (
      <Button
        className='grow sm:grow-0'
        cardClassName='py-2 md:py-3 h-full'
        size='md'
        onClick={async () => {
          if (
            await openModal(
              <Confirm>
                <p>{t('Are you sure you want to leave the room?')}</p>
              </Confirm>,
            )
          )
            navigate(ROUTES.LOBBY)
        }}
      >
        <Icon name='logout' />
      </Button>
    )
  return <></>
}
