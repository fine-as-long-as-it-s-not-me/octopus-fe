import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import Card from '@/components/common/Card'
import Profile from '@/components/player/Profile'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'
import { useGameStore } from '@/store/gameStore'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'
import { Team, type Player } from '@/types'

export default function RoundResultPage() {
  const { playSoundEffect, pauseMusic } = useSound()
  const { direction } = useWindow()
  const { t } = useTranslation()
  const { octopuses, winningTeam, isUnanimity, tied, guessed } = useRoundStore()
  const { UUID } = useUserStore()
  const { ranks } = useGameStore()

  const team = octopuses.find((octopus: Player) => octopus.UUID === UUID)
    ? Team.OCTOPUS
    : Team.SQUID

  const resultText =
    winningTeam === team
      ? team === Team.SQUID
        ? isUnanimity
          ? 'Squids Get Bonus from unanimity!'
          : 'Squids Win! Octopuses failed to figure out the code.'
        : tied
          ? 'Octopuses Win because Squids were too indecisive'
          : guessed
            ? 'Octopuses Win! They figured out the code.'
            : 'Octopuses Win! Squids failed to find them.'
      : team === Team.SQUID
        ? tied
          ? 'Squids Lose because they were too indecisive'
          : guessed
            ? 'Squids Lose. The Octopus figured out the code.'
            : 'Squids Lose. They failed to find an Octopus.'
        : 'Octopuses Lose. They failed to figure out the code.'

  useEffect(() => {
    if (winningTeam === null) return
    if (winningTeam === team) playSoundEffect('round-win')
    else playSoundEffect('round-lose')
  }, [playSoundEffect, winningTeam, team])

  useEffect(() => {
    pauseMusic()
  }, [pauseMusic])

  return (
    <Card
      className={twMerge(
        'shrink-0 grow-4 flex-col gap-2 p-4 md:p-8',
        direction === 'vertical' ? 'w-full' : 'w-fit',
      )}
    >
      <h1 className='w-full text-center'>{t('Round Result')}</h1>
      <p className='text-center'>{t(resultText)}</p>
      <table className='border-separate border-spacing-y-8 text-center'>
        <thead>
          <tr>
            <th className='w-6'>{t('Ranking')}</th>
            <th className='w-32'>{t('Player')}</th>
            <th className='w-16'>{t('Round Score')}</th>
            <th className='w-20'>{t('Total')}</th>
          </tr>
        </thead>
        <tbody>
          {ranks.map((rank, index) => (
            <tr key={rank.player.UUID}>
              <td>{index + 1}</td>
              <td className='flex justify-center'>
                <Profile size='sm' name={rank.player.name} />
              </td>
              <td>
                {rank.score.delta > 0 && '+'}
                {rank.score.delta}
              </td>
              <td>{rank.score.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
