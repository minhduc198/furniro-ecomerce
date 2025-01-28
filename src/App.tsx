import { useRoutes } from 'react-router'
import Layout from './layouts'
import AboutUs from './pages/about-us'
import CartPage from './pages/cart-page'
import Contact from './pages/contact'
import Home from './pages/home'
import ProductComparison from './pages/product-comparison'
import ProductDetail from './pages/product-detail'
import Shop from './pages/shop'
import { path } from './routers'
import CheckOut from './pages/check-out'

function App() {
  const element = useRoutes([
    {
      path: '',
      element: <Layout />,
      children: [
        {
          path: path.home,
          element: <Home />
        },

        {
          path: path.product,
          element: <Shop />
        },

        {
          path: path.about,
          element: <Contact />
        },

        {
          path: path.contact,
          element: <AboutUs />
        },

        { path: path.productDetail, element: <ProductDetail /> },

        { path: path.productComparison, element: <ProductComparison /> },

        { path: path.cart, element: <CartPage /> },

        { path: path.checkout, element: <CheckOut /> }
      ]
    }
  ])

  return element
}

export default App
