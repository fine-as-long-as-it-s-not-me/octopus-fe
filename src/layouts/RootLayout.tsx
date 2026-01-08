import { Outlet, useBlocker } from 'react-router-dom'
import { ModalProvider, useModal } from 'sam-react-modal'

export default function RootLayout() {
  return (
    <ModalProviderWrapper>
      <div className='h-dvh w-dvw overflow-hidden no-scrollbar flex flex-col justify-center items-center'>
        <Outlet />
      </div>
    </ModalProviderWrapper>
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
      }}
      modalWrapperAttributes={{
        style: {
          width: '100%',
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
