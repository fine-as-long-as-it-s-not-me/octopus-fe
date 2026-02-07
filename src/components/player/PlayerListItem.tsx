import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useKickPlayer } from '@/apis/room'
import { useWindow } from '@/context/WindowContext'
import { useRoomStore } from '@/store/roomStore'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'
import { Phase } from '@/types'
import Card from '../common/Card'
import Icon from '../common/Icon'
import Confirm from '../modals/Confirm'
import Profile from './Profile'

interface Props {
  UUID: string
  name: string
  host?: boolean
}

export default function PlayerListItem({ UUID, name, host }: Props) {
  const { painterUUID, nextPainterUUID, phase } = useRoundStore()
  const { mutate: kickPlayer } = useKickPlayer()
  const { openModal, closeModal } = useModal()
  const { UUID: userUUID } = useUserStore()
  const { hostUUID } = useRoomStore()
  const { direction } = useWindow()
  const { t } = useTranslation()

  const isHost = userUUID === hostUUID

  return (
    <div
      className={twMerge(
        `m-[-2px] flex shrink-0 items-center`,
        direction === 'vertical' ? 'w-fit' : 'w-full',
      )}
    >
      <Card
        size='sm'
        className='group relative flex w-full shrink-0 items-center justify-between gap-2 py-0 pr-2 md:pr-4'
      >
        <Profile name={name} />
        <Card
          size='sm'
          className='items-center gap-2 border-none bg-transparent p-1'
        >
          {phase === Phase.DRAWING ? (
            painterUUID === UUID ? (
              <div className='flex aspect-square rounded-xl bg-[#333366] p-2'>
                <Icon name='edit' color='#ffffff' />
              </div>
            ) : (
              nextPainterUUID === UUID && (
                <p className='rounded-xl bg-[#6666aa] p-2 text-white'>next</p>
              )
            )
          ) : (
            host && <Icon name='crown' size={18} />
          )}
        </Card>
        {isHost && UUID !== userUUID && (
          <button
            onClick={async () => {
              if (
                await openModal(
                  <Confirm>{`${t('Kick player')} '${name}'?`}</Confirm>,
                )
              ) {
                kickPlayer({ targetUUID: UUID })
                closeModal()
              }
            }}
            className='absolute inset-0 left-1/2 z-49 flex h-full w-full -translate-x-1/2 items-center justify-center bg-gray-600/80 text-center text-xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'
          >
            x
          </button>
        )}
      </Card>
    </div>
  )
}
