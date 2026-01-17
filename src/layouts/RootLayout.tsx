import { Outlet, useBlocker } from 'react-router-dom'
import { ModalProvider, useModal } from 'sam-react-modal'

import RoomProvider from '@/context/RoomProvider'
import UserProvider from '@/context/UserProvider'
import WindowProvider from '@/context/WindowProvider'

export default function RootLayout() {
  return (
    <WindowProvider>
      <UserProvider>
        <RoomProvider>
          <ModalProviderWrapper>
            <div className='no-scrollbar flex h-dvh w-dvw flex-col items-center overflow-hidden'>
              <Outlet />
            </div>
          </ModalProviderWrapper>
        </RoomProvider>
      </UserProvider>
    </WindowProvider>
  )
}

function ModalProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider
      containerAttributes={{
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      backdropAttributes={{
        className: 'fadeIn',
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
      }}
      modalWrapperAttributes={{
        style: {
          width: 'fit-content',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      beforeClose={async ref => {
        if (!ref?.current) return
        ref.current.classList.remove('fadeIn')
        ref.current.classList.add('fadeOut')
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, 300)
        })
      }}
    >
      <BlockerWrapper>{children}</BlockerWrapper>
    </ModalProvider>
  )
}

function BlockerWrapper({ children }: { children: React.ReactNode }) {
  const { closeModal, closeAllModals, modals } = useModal()

  useBlocker(({ historyAction }) => {
    if (historyAction === 'PUSH') {
      closeAllModals()
      return false
    }
    if (modals.length === 0) return false
    closeModal()
    return true
  })

  return <>{children}</>
}
