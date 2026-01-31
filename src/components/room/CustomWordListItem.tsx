import { twMerge } from 'tailwind-merge'

import { useRoomStore } from '@/store/roomStore'

interface Props {
  word: string
  votes: number
}

export default function CustomWordListItem({ word, votes }: Props) {
  const { settings } = useRoomStore()
  return (
    <div
      className={twMerge(
        'flex flex-row gap-2 rounded-2xl bg-white px-3 py-1 ring-2',
        votes >= settings.customWordMinVotes
          ? 'ring-green-500'
          : 'text-gray-500 ring-gray-300',
      )}
    >
      <p>{word}</p>
      <p>{votes}</p>
    </div>
  )
}
