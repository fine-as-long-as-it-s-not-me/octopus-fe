import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import logo from '@/assets/images/logo/logo.png'
import Img from '@/components/common/Img'
import SettingButtons from '@/components/common/SettingButtons'
import { useBackground } from '@/context/BackgroundContext'

export default function EntryLayout() {
  const { playMusic, setBackgroundImage } = useBackground()

  useEffect(() => {
    playMusic('citymafia')
    setBackgroundImage('home')
  })

  return (
    <div className='no-scrollbar flex h-full w-full max-w-[720px] flex-col items-center gap-4 overflow-scroll p-16 md:p-12'>
      <Img
        src={logo}
        alt='Logo'
        className='w-[50dvw] max-w-[560px] min-w-[400px]'
      />
      <Outlet />
      <div className={`grid w-full grid-cols-3 gap-4`}>
        <SettingButtons />
      </div>
    </div>
  )
}
