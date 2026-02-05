import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import logo from '@/assets/images/logo/logo.png'
import Img from '@/components/common/Img'
import SettingModalButton from '@/components/common/Settings'
import { useSound } from '@/context/SoundContext'
import { useWindow } from '@/context/WindowContext'

export default function EntryLayout() {
  const { setBackgroundImage, setIsCompact } = useWindow()
  const { playMusic } = useSound()

  useEffect(() => {
    playMusic('citymafia')
    setBackgroundImage('home')
    setIsCompact(false)
  })

  return (
    <div className='no-scrollbar box-content flex h-full w-full max-w-[720px] flex-col items-center justify-around gap-4 overflow-scroll p-4 md:p-8 lg:p-12'>
      <Img
        src={logo}
        alt='Logo'
        className='w-[50dvw] max-w-[560px] min-w-[400px]'
      />
      <Outlet />
      <div className={`flex h-[52px] w-full`}>
        <SettingModalButton translate={true} />
      </div>
    </div>
  )
}
