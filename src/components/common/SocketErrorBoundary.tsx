import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  onRetry?: () => void
}

interface State {
  hasError: boolean
  error: Error | null
}

export class SocketErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error('Socket Error Boundary caught an error:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    this.props.onRetry?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex h-dvh w-dvw flex-col items-center justify-center gap-4 bg-gradient-to-b from-blue-50 to-blue-100 p-8'>
          <div className='flex max-w-md flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-lg'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
              <svg
                className='h-8 w-8 text-red-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div className='flex flex-col items-center gap-2 text-center'>
              <h2 className='text-2xl font-bold text-gray-800'>
                Connection Error
              </h2>
              <p className='text-gray-600'>
                {this.state.error?.message ||
                  'Unable to connect to the game server'}
              </p>
            </div>
            <button
              onClick={this.handleRetry}
              className='w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-800'
            >
              Retry Connection
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
