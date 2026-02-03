import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'
import { useModal } from 'sam-react-modal'

import Button from '@/components/common/Button'
import Icon from '@/components/common/Icon'
import Settings from '@/components/common/Settings'
import Alert from '@/components/modals/Alert'
import PlayerListButton from '@/components/player/PlayerListButton'
import CloseButton from '@/components/room/CloseButton'
import RoomContentWrapper from '@/components/room/RoomContentWrapper'
import RoomHeaderWrapper from '@/components/room/RoomHeaderWrapper'
import RoomWrapper from '@/components/room/RoomWrapper'
import { useSound } from '@/context/SoundContext'
import { encode } from '@/lib/code'
import { useRoomStore } from '@/store/roomStore'

export default function RoomLayout() {
  const { t } = useTranslation()
  const { playMusic } = useSound()
  const { roomCode } = useRoomStore()
  const { openModal } = useModal()

  useEffect(() => {
    playMusic('waiting')
  }, [playMusic])

  const copyLinkHandler = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/guest-room?roomCode=${encode(roomCode)}`,
    )
    openModal(<Alert>{t('Room link copied to clipboard!')}</Alert>)
  }

  return (
    <RoomWrapper key={roomCode}>
      <RoomHeaderWrapper>
        <Button
          size='md'
          className='grow-1 self-stretch sm:min-w-1/2'
          cardClassName={'py-2 md:py-3 h-full'}
          onClick={copyLinkHandler}
        >
          {t('Room Code')} #{roomCode}
          <Icon name='content_copy' />
        </Button>
        <PlayerListButton />
        <Settings translate={false} />
        <CloseButton />
      </RoomHeaderWrapper>
      <RoomContentWrapper>
        <Outlet />
      </RoomContentWrapper>
    </RoomWrapper>
  )
}
