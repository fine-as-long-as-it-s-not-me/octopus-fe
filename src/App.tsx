import { AssetProvider } from './context/AssetProvider'
import SoundProvider from './context/SoundProvider'
import WindowProvider from './context/WindowProvider'
import Routes from './routes'

function App() {
  return (
    <AssetProvider>
      <WindowProvider>
        <SoundProvider>
          <Routes />
        </SoundProvider>
      </WindowProvider>
    </AssetProvider>
  )
}

export default App
