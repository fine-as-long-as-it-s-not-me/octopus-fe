import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'
import { twMerge } from 'tailwind-merge'

import { useDeleteCustomWord } from '@/apis/room'
import { useRoomStore } from '@/store/roomStore'
import { useUserStore } from '@/store/userStore'
import Confirm from '../modals/Confirm'

interface Props {
  word: string
  votes: number
}

export default function CustomWordListItem({ word, votes }: Props) {
  const { hostUUID, settings } = useRoomStore()
  const { UUID } = useUserStore()
  const { mutate: deleteWord } = useDeleteCustomWord()
  const { t } = useTranslation()
  const { openModal } = useModal()

  const isHost = hostUUID === UUID
  return (
    <div
      className={twMerge(
        'group relative flex flex-row gap-2 overflow-hidden rounded-2xl bg-white px-3 py-1 ring-2',
        votes >= settings.customWordMinVotes
          ? 'ring-green-500'
          : 'text-gray-500 ring-gray-300',
        isHost && 'cursor-pointer',
      )}
      onClick={async () => {
        if (!isHost) return
        if (
          await openModal(
            <Confirm>{`${t('Deleting Keyword')} '${word}'`}</Confirm>,
          )
        )
          deleteWord({ keyword: word })
      }}
    >
      <p>{word}</p>
      <p>{votes}</p>
      <div className='absolute inset-0 left-1/2 z-2020 flex h-full w-full -translate-x-1/2 items-center justify-center bg-gray-600/80 text-center text-xl text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        x
      </div>
    </div>
  )
}
