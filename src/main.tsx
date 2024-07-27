import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App.tsx'
import { MouseProvider } from './providers/mouse-provider.tsx'

import '@/styles/globals.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MouseProvider>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <App />
          <ReactQueryDevtools />
          <Toaster />
        </React.StrictMode>
      </QueryClientProvider>
    </MouseProvider>
  </React.StrictMode>
)
