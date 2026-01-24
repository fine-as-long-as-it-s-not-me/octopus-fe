import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Spacing, useModal } from 'sam-react-modal'

// import chzzkIcon from '@/assets/images/icons/chzzk.png'
// import Img from '@/components/common/Img'
import Button from '@/components/common/Button'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import RoomCodeInputModal from '@/components/modals/RoomCodeInputModal'
import { useSocket } from '@/context/SocketContext'
import { ROUTES } from '@/routes/ROUTES'
import { useUserStore } from '@/store/userStore'

export default function LobbyPage() {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const navigate = useNavigate()
  const { joinRandomRoom } = useSocket()
  const { name } = useUserStore()

  useEffect(() => {
    if (!name) navigate(ROUTES.HOME)
  }, [name, navigate])

  const randomRoomClickHandler = () => {
    joinRandomRoom()
  }
  const useRoomCodeClickHandler = () => {
    openModal(<RoomCodeInputModal />)
  }
  const createRoomClickHandler = () => {
    openModal(<CreateRoomModal action='create' />)
  }
  // const leaderboardClickHandler = () => {
  //   navigate(ROUTES.LEADERBOARD)
  // }

  return (
    <>
      <Spacing />
      <Button onClick={randomRoomClickHandler}>{t('Join Random Room')}</Button>
      <Button onClick={useRoomCodeClickHandler}>{t('Use Room Code')}</Button>
      <Button onClick={createRoomClickHandler}>{t('Create Room')}</Button>
      {/* <Button
        icon={<Img width={32} src={chzzkIcon} alt='Chzzk Icon' />}
        onClick={leaderboardClickHandler}
      >
        {t('Leaderboard')}
      </Button> */}
      <Spacing />
    </>
  )
}
