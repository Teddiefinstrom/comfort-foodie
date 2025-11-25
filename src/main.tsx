import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './styling/scss/global.scss'
import App from './App.tsx'
import AuthContextProvider from './context/AuthContextProvider.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </QueryClientProvider>
    </AuthContextProvider>
  </StrictMode>
);
