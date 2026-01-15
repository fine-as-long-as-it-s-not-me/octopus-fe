import type { ReactNode } from 'react'

interface Props {
  icon: ReactNode
  label: string
  children: ReactNode
}

export default function SettingInputWrapper({ icon, label, children }: Props) {
  return (
    <div className='flex min-h-12 w-full flex-wrap items-center justify-between gap-x-12 gap-y-2 md:gap-x-24'>
      <div className='flex items-center gap-2'>
        {icon}
        <div>{label}</div>
      </div>
      <div>{children}</div>
    </div>
  )
}
