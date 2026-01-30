import { useTranslation } from 'react-i18next'
import { useMatch, useNavigate } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import { ROUTES } from '@/routes/ROUTES'
import Button from '../common/Button'
import Icon from '../common/Icon'
import Confirm from '../modals/Confirm'

export default function CloseButton() {
  const navigate = useNavigate()
  const isRoomPage = useMatch(ROUTES.ROOM)
  const isCustomWordPage = useMatch(ROUTES.CUSTOM_WORD)
  const isGamePage = useMatch(`${ROUTES.ROOM}/*`)

  const { t } = useTranslation()
  const { openModal } = useModal()

  if (isCustomWordPage)
    return (
      <Button
        cardClassName='py-2 md:py-3 h-full'
        size='md'
        onClick={() => {
          navigate(ROUTES.ROOM)
        }}
        aria-label='Go back'
      >
        <Icon name='arrow_back' />
      </Button>
    )
  if (isRoomPage || isGamePage)
    return (
      <Button
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
        aria-label='Leave room'
      >
        <Icon name='logout' />
      </Button>
    )
  return <></>
}
