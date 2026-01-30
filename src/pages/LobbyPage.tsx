import { useTranslation } from 'react-i18next'
import { Spacing, useModal } from 'sam-react-modal'

import { useJoinRandomRoom } from '@/apis/room'
import Button from '@/components/common/Button'
import CreateRoomModal from '@/components/modals/CreateRoomModal'
import RoomCodeInputModal from '@/components/modals/RoomCodeInputModal'
import { useUserStore } from '@/store/userStore'

export default function LobbyPage() {
  const { t } = useTranslation()
  const { openModal } = useModal()
  const { mutate: joinRandomRoom } = useJoinRandomRoom()
  const { setId, UUID } = useUserStore()

  const randomRoomClickHandler = () => {
    joinRandomRoom({ UUID })
  }
  const useRoomCodeClickHandler = () => {
    openModal(<RoomCodeInputModal />)
  }
  const createRoomClickHandler = () => {
    openModal(<CreateRoomModal action='create' />)
  }
  const logoutClickHandler = () => {
    setId(-1)
  }

  return (
    <>
      <Spacing />
      <Button onClick={randomRoomClickHandler}>{t('Join Random Room')}</Button>
      <Button onClick={useRoomCodeClickHandler}>{t('Use Room Code')}</Button>
      <Button onClick={createRoomClickHandler}>{t('Create Room')}</Button>
      <Button onClick={logoutClickHandler}>{t('Logout')}</Button>
      <Spacing />
    </>
  )
}
