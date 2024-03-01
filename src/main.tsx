import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { LoadingProvider } from './commons/context/useLoading.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LoadingProvider>
    <App />
  </LoadingProvider>
)
