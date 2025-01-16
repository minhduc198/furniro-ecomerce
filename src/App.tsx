import { useRoutes } from 'react-router'
import Layout from './layouts'
import Home from './pages/home'
import { path } from './routers'
import Shop from './pages/shop'
import Contact from './pages/contact'
import AboutUs from './pages/about-us'
import ProductDetail from './pages/product-detail'

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

        { path: path.productDetail, element: <ProductDetail /> }
      ]
    }
  ])

  return element
}

export default App
