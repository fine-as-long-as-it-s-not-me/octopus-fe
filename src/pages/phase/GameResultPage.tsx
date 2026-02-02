import { useEffect } from 'react'
import Realistic from 'react-canvas-confetti/dist/presets/realistic'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Profile from '@/components/player/Profile'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'

export default function GameResultPage() {
  const { playSoundEffect } = useSound()
  const { direction } = useWindow()
  const { t } = useTranslation()
  const { ranks } = useGameStore()

  useEffect(() => {
    playSoundEffect('game-result')
  }, [playSoundEffect])

  return (
    <Card
      className={twMerge(
        'shrink-0 grow-4 flex-col items-center gap-2',
        direction === 'vertical' ? 'w-full' : 'w-fit',
      )}
    >
      <h1 className='w-full text-center'>{t('Game Result')}</h1>
      <table className='w-fit border-separate border-spacing-y-8 text-center'>
        <thead>
          <tr>
            <th className='w-12'>{t('Ranking')}</th>
            <th className='w-40'>{t('Player')}</th>
            <th className='w-20'>{t('Total')}</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((rank, index) => (
            <tr
              key={rank.player.UUID}
              className={index === 0 ? 'font-bold' : ''}
            >
              <td>{index + 1}</td>
              <td className='flex justify-center'>
                <Profile size='sm' name={rank.player.name} />
              </td>
              <td>{rank.score.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Realistic
        autorun={{ speed: 0.5, delay: 200 }}
        decorateOptions={() => ({
          angle: 120,
          origin: { x: 1, y: 0.45 },
        })}
      />

      <Realistic
        autorun={{ speed: 0.5, delay: 600 }}
        decorateOptions={() => ({
          angle: 60,
          origin: { x: 0, y: 0.45 },
        })}
      />
    </Card>
  )
}
