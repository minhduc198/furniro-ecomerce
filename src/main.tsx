import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import './styles/index.scss'
import { CartProvider } from './store/cart-context/CartContext.tsx'
import { ToastContainer } from 'react-toastify'
import { FavoriteProvider } from './store/favorite-context/FavoriteContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>
      <FavoriteProvider>
        <App />
        <ToastContainer />
      </FavoriteProvider>
    </CartProvider>
  </BrowserRouter>
)
