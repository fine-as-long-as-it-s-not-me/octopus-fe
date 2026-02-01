import { AssetProvider } from './context/AssetProvider'
import { BackgroundProvider } from './context/BackgroundProvider'
import SoundProvider from './context/SoundProvider'
import WindowProvider from './context/WindowProvider'
import Routes from './routes'

function App() {
  return (
    <WindowProvider>
      <AssetProvider>
        <BackgroundProvider>
          <SoundProvider>
            <Routes />
          </SoundProvider>
        </BackgroundProvider>
      </AssetProvider>
    </WindowProvider>
  )
}

export default App
