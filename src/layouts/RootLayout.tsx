import { Outlet, useBlocker } from 'react-router-dom'
import { ModalProvider, useModal } from 'sam-react-modal'

import LoadingScreen from '@/components/common/LoadingScreen'
import SocketProvider from '@/context/SocketProvider'
import { ToastProvider } from '@/context/ToastProvider'

export default function RootLayout() {
  return (
    <ToastProvider>
      <SocketProvider>
        <ModalProviderWrapper>
          <Outlet />
          <LoadingScreen />
        </ModalProviderWrapper>
      </SocketProvider>
    </ToastProvider>
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
        ref.current.classList.remove('fade-in')
        ref.current.classList.add('fade-out')
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
