import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './reduxes/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { FeatureContextProvider } from './context/featureContext.jsx'
import { DataContextProvider } from './context/dataContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <FeatureContextProvider>
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </FeatureContextProvider> 
      </BrowserRouter>
    </PersistGate>   
  </Provider>
)