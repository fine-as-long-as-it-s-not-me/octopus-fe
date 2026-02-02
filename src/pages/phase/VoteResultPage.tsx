import { useEffect, useState } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Img from '@/components/common/Img'
import VoteCard from '@/components/game/VoteCard'
import { CONFETTI_DELAY } from '@/consts'
import { useSound } from '@/context/SoundContext'
import useAvatar from '@/hooks/useAvatar'
import { useRoundStore } from '@/store/roundStore'

export default function VoteResultPage() {
  const { octopuses, votedPlayer } = useRoundStore()
  const { playSoundEffect, pauseMusic } = useSound()
  const { t } = useTranslation()

  const [hidden, setHidden] = useState(true)

  const avatar = useAvatar(octopuses[0]?.name || 'Unknown')
  const didFindOctopus = octopuses.some(
    octopus => octopus.UUID === votedPlayer?.UUID,
  )

  useEffect(() => {
    playSoundEffect('drum-roll')
    pauseMusic()
  }, [playSoundEffect, pauseMusic])

  useEffect(() => {
    if (!hidden) playSoundEffect('gasp')
  }, [hidden, playSoundEffect])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHidden(false)
    }, CONFETTI_DELAY)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <Card className='flex w-auto shrink-0 grow-4 flex-col items-center justify-center'>
      <Img
        src={avatar}
        style={{
          transition: 'filter 0.5s ease-in-out',
        }}
        className={twMerge(
          'mb-4 max-w-[160px]',
          hidden ? 'grayscale filter-[brightness(0)]' : '',
        )}
      />

      <div
        className={twMerge(
          'mb-8 text-center text-2xl font-bold',
          hidden ? 'invisible' : '',
        )}
      >
        <p>
          {`${t(`The ${octopuses.length > 1 ? 'octopuses were' : 'octopus was'}`)} ${octopuses.map(octopus => octopus.name).join(', ')}.`}
        </p>
        <p>
          {didFindOctopus
            ? t(`Squids found the octopus! 🎉`)
            : t(`Squids failed to find the octopus. 😢`)}
        </p>
      </div>

      <Realistic
        autorun={{ speed: 0.0001, delay: CONFETTI_DELAY }}
        decorateOptions={() => ({
          angle: 90,
          origin: { x: 0.5, y: 0.4 },
        })}
      />
      <VoteCard key={'result'} />
    </Card>
  )
}
