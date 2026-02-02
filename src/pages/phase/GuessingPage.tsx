import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useModal } from 'sam-react-modal'

import { useGuessWord } from '@/apis/game'
import Button from '@/components/common/Button'
import Card from '@/components/common/Card'
import Form from '@/components/common/Form'
import Input from '@/components/common/Input'
import Confirm from '@/components/modals/Confirm'
import { useSound } from '@/context/SoundContext'
import { useRoundStore } from '@/store/roundStore'
import { useUserStore } from '@/store/userStore'

export default function GuessingPage() {
  const { octopuses, votedPlayer } = useRoundStore()
  const { mutate: guess } = useGuessWord()
  const { openModal } = useModal()
  const { playMusic, playSoundEffect } = useSound()
  const { UUID } = useUserStore()
  const { t } = useTranslation()

  // const isOctopus = true
  const isOctopus = octopuses.some(octopus => octopus.UUID === UUID)

  useEffect(() => {
    playMusic('suspense')
  }, [playMusic])

  useEffect(() => {
    if (isOctopus) playSoundEffect('nav')
  }, [isOctopus, playSoundEffect])

  return (
    <Card className='flex w-auto shrink-0 grow-4 flex-col items-center justify-center p-8 sm:p-8 md:p-8'>
      {isOctopus ? (
        <Form
          className='flex-col gap-4'
          onSubmit={async e => {
            e.preventDefault()

            const enteredGuess = e.currentTarget.guess.value as string

            if (
              await openModal(
                <Confirm>
                  {t('Are you sure you want to submit your guess?')}
                </Confirm>,
              )
            ) {
              guess({ word: enteredGuess })
            }
          }}
        >
          <h2 className='text-2xl font-bold'>{t('You are an Octopus.')}</h2>
          <p className='text-lg'>
            {t('Guess the secret code to occupy the squid village...')}
          </p>
          <div className='flex flex-row gap-4'>
            <Input
              type='text'
              placeholder={t('Enter your guess...')}
              name='guess'
              required
            />
            <Button size='md' type='submit' cardClassName='rounded-xl h-full'>
              <p className='text-md'>{t('Submit')}</p>
            </Button>
          </div>
        </Form>
      ) : (
        <>
          <p className='text-lg'>
            {votedPlayer ? votedPlayer.name : t('The Octopus')}
            {t(' is guessing the word...')}
          </p>
          <p>{t('Pray for village not being occupied.')}</p>
        </>
      )}
    </Card>
  )
}
