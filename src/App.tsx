import { useRoutes } from 'react-router'
import Layout from './layouts'
import Home from './pages/home'
import { path } from './routers'
import Shop from './pages/shop'

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
          path: path.shop,
          element: <Shop />
        },

        {
          path: path.about,
          element: <Shop />
        },

        {
          path: path.contact,
          element: <Shop />
        }
      ]
    }
  ])

  return element
}

export default App
