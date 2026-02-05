import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

import { useAssets } from '@/context/AssetContext'

export default function LoadingScreen() {
  const { progress } = useAssets()
  const { t } = useTranslation()
  const { interacted } = useAssets()
  return (
    <button
      className={twMerge(
        `absolute inset-0 flex h-[100lvh] flex-col items-center justify-center gap-6 text-white`,
        interacted && progress === 100 ? 'hidden' : 'flex',
      )}
      style={{
        background: 'linear-gradient(rgb(82, 165, 255), rgb(5, 47, 118))',
      }}
      type='button'
    >
      {progress === 100 ? (
        <p>{t('press anywhere to continue')}</p>
      ) : (
        <h2>{t('Loading')}...</h2>
      )}

      <div className='relative flex flex-col items-center'>
        <div
          className={twMerge(
            'water-round-container relative overflow-hidden rounded-full border-[3px] text-center',
            progress === 100 ? 'border-[#44ee66bb]' : 'border-[#eeeeee88]',
          )}
        >
          <Wave number={1} top={`${95 - progress}%`} />
          <Wave number={2} top={`${100 - progress}%`} />
          <Wave number={3} top={`${105 - progress}%`} />
          <p className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-xl font-bold'>
            {progress}%
          </p>
        </div>
      </div>
      <p className='max-w-[720px] p-4 text-center leading-relaxed whitespace-pre-wrap'>
        {t(
          `Deep beneath the sea lies a peaceful squid village.\nOne day, a cunning octopus slips in disguised among them.\nThe squids write a secret keyword in ink,\ntrying to expose the intruder who doesn’t know the keyword.`,
        )}
      </p>
    </button>
  )
}

function Wave({ number, top }: { number: 1 | 2 | 3; top: string }) {
  return (
    <div
      className={`water-wave${number}`}
      style={{
        top,
        transition: 'top 0.1s ease-in-out',
      }}
    />
  )
}
