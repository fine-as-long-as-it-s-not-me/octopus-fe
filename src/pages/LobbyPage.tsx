import { useTranslation } from 'react-i18next'
import { Spacing, useModal } from 'sam-react-modal'

import { useJoinRandomRoom } from '@/apis/room'
// import chzzkIcon from '@/assets/images/icons/chzzk.png'
// import Img from '@/components/common/Img'
import Button from '@/components/common/Button'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import RoomCodeInputModal from '@/components/modals/RoomCodeInputModal'
import { useUserStore } from '@/store/userStore'

export default function LobbyPage() {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const { mutate: joinRandomRoom } = useJoinRandomRoom()
  const { setId } = useUserStore()

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
  const logoutClickHandler = () => {
    setId(-1)
  }

  return (
    <>
      <Spacing />
      <Button onClick={randomRoomClickHandler}>{t('Join Random Room')}</Button>
      <Button onClick={useRoomCodeClickHandler}>{t('Use Room Code')}</Button>
      <Button onClick={createRoomClickHandler}>{t('Create Room')}</Button>
      <Button onClick={logoutClickHandler}>{t('Log out')}</Button>
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
