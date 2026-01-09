import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

import chzzkIcon from '@/assets/images/icons/chzzk.png'
import Button from '@/components/common/Button'
import Img from '@/components/common/Img'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import RoomCodeInputModal from '@/components/modals/RoomCodeInputModal'
import { ROUTES } from '@/routes/ROUTES'

export default function LobbyPage() {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const navigate = useNavigate()

  const randomRoomClickHandler = () => {
    navigate(ROUTES.ROOM('random?'))
  }
  const useRoomCodeClickHandler = () => {
    openModal(<RoomCodeInputModal />)
  }
  const createRoomClickHandler = () => {
    openModal(<CreateRoomModal />)
  }
  const leaderboardClickHandler = () => {
    navigate(ROUTES.LEADERBOARD)
  }

  return (
    <>
      <Spacing />
      <Button onClick={randomRoomClickHandler}>{t('Join Random Room')}</Button>
      <Button onClick={useRoomCodeClickHandler}>{t('Use Room Code')}</Button>
      <Button onClick={createRoomClickHandler}>{t('Create Room')}</Button>
      <Button
        icon={<Img width={32} src={chzzkIcon} alt='Chzzk Icon' />}
        onClick={leaderboardClickHandler}
      >
        {t('Leaderboard')}
      </Button>
      <Spacing />
    </>
  )
}
