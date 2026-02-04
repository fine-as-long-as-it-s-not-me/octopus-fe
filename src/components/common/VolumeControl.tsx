import { twMerge } from 'tailwind-merge'

import Card from './Card'

interface Props {
  value: number
  onChange: (value: number) => void
  className?: string
  direction: 'vertical' | 'horizontal'
}

export default function VolumeControl({
  value,
  onChange,
  className,
  direction,
}: Props) {
  return (
    <div className='absolute bottom-full left-0 z-52 hidden w-full justify-center group-hover:flex'>
      <Card className='mb-2 w-fit justify-center rounded-xl'>
        <input
          type='range'
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className={twMerge('cursor-pointer', direction, className)}
        />
      </Card>
    </div>
  )
}
