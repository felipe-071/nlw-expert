import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render( //O método render renderiza algo na tela
  <React.StrictMode>
    <App />
    <Toaster richColors/>
  </React.StrictMode>,
)

//O React StrictMode evita erros, mas não representa nada visual
//Esse arquivo está fazendo com que a aplicação seja renderizada dentro da div com id root
