import { twMerge } from 'tailwind-merge'

import { useRoom } from '@/context/RoomContext'
import Card from '../common/Card'
import Icon from '../common/Icon'

export default function TimerCard() {
  const { timeLeft } = useRoom()
  const colorClass = (time: number) => {
    if (time > 10) return ''
    if (time > 5) return 'text-yellow-500'
    return 'text-red-500'
  }
  return (
    <Card size='md' className='w-fit items-center justify-between gap-2 px-2'>
      <p
        className={twMerge(
          'w-[32px] text-center text-2xl',
          colorClass(timeLeft),
        )}
      >
        {timeLeft}
      </p>
      <Icon name='timer' size={26} />
    </Card>
  )
}
