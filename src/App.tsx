import { AssetProvider } from './context/AssetProvider'
import { BackgroundProvider } from './context/BackgroundProvider'
import SoundProvider from './context/SoundProvider'
import Routes from './routes'

function App() {
  return (
    <AssetProvider>
      <BackgroundProvider>
        <SoundProvider>
          <Routes />
        </SoundProvider>
      </BackgroundProvider>
    </AssetProvider>
  )
}

export default App
