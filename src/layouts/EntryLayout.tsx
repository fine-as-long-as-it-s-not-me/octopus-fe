import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import logo from '@/assets/images/logo/logo.png'
import Img from '@/components/common/Img'
import SettingButtons from '@/components/common/SettingButtons'
import SettingModalButton from '@/components/common/Settings'
import { useBackground } from '@/context/BackgroundContext'
import { useWindow } from '@/context/WindowContext'

export default function EntryLayout() {
  const { playMusic, setBackgroundImage } = useBackground()
  const { setIsCompact } = useWindow()

  useEffect(() => {
    playMusic('citymafia')
    setBackgroundImage('home')
    setIsCompact(false)
  })

  return (
    <div className='no-scrollbar flex h-full w-full max-w-[720px] flex-col items-center gap-4 overflow-scroll p-16 md:p-12'>
      <Img
        src={logo}
        alt='Logo'
        className='w-[50dvw] max-w-[560px] min-w-[400px]'
      />
      <Outlet />
      <div className={`flex w-full`}>
        <SettingModalButton />
      </div>
    </div>
  )
}
