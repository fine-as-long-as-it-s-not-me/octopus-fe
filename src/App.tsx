import { AssetProvider } from './context/AssetProvider'
import { BackgroundProvider } from './context/BackgroundProvider'
import EffectProvider from './context/EffectsProvider'
import Routes from './routes'

function App() {
  return (
    <AssetProvider>
      <BackgroundProvider>
        <EffectProvider>
          <Routes />
        </EffectProvider>
      </BackgroundProvider>
    </AssetProvider>
  )
}

export default App
