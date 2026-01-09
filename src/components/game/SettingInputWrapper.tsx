import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  label: string
  children: ReactNode
}

export default function SettingInputWrapper({ icon, label, children }: Props) {
  return (
    <div className='flex items-center justify-between gap-x-12 gap-y-2 md:gap-x-24 w-full min-h-12 flex-wrap'>
      <div className='flex items-center gap-2'>
        {icon}
        <div>{label}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
