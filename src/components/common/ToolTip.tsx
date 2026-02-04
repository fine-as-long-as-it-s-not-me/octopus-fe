import { useTranslation } from 'react-i18next'

interface Props {
  children: React.ReactNode
  tip: string
}

export default function ToolTip({ children, tip }: Props) {
  const { t } = useTranslation()
  return (
    <div className='group relative flex flex-col items-center'>
      {children}
      <div className='absolute bottom-full z-51 mb-2 hidden min-w-[80px] rounded-xl bg-black/70 px-3 py-2 group-hover:block'>
        <p className='text-center text-sm break-words text-white'>{t(tip)}</p>
      </div>
    </div>
  )
}
