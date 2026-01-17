import { useEffect, useRef, useState } from 'react'
import { useModal } from 'sam-react-modal'

import Button from './Button'
import Icon from './Icon'
import SettingButtons from './SettingButtons'
import SettingButtonsModal from './SettingButtonsModal'

export default function Settings() {
  const { openModal } = useModal()
  const ref = useRef(null)
  const [isLong, setIsLong] = useState(true)

  useEffect(() => {
    if (!ref.current) return
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        setIsLong(width >= 240)
      }
    })
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [])
  return (
    <div className='flex w-fit grow sm:gap-2' ref={ref}>
      {isLong ? (
        <SettingButtons />
      ) : (
        <Button
          className='w-fit grow'
          cardClassName='h-full'
          onClick={() => {
            openModal(<SettingButtonsModal />)
          }}
        >
          <Icon name='settings' />
        </Button>
      )}
    </div>
  )
}
