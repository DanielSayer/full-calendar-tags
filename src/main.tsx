import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { MouseProvider } from './providers/mouse-provider.tsx'

import '@/styles/globals.css'
import { PopupProvider } from './providers/popup-provider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MouseProvider>
        <PopupProvider>
          <React.StrictMode>
            <App />
            <ReactQueryDevtools />
            <Toaster />
          </React.StrictMode>
        </PopupProvider>
      </MouseProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
