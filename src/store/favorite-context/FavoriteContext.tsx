import { createContext, ReactNode, useReducer } from 'react'
import { FAVORITE_ACTIONS } from '../../constants'
import { FavoriteAction, IFavorite } from '../../types'

const favoriteReducer = (state: IFavorite, action: FavoriteAction) => {
  switch (action.type) {
    case FAVORITE_ACTIONS.ADD:
      return {
        items: [...state.items, action.payload]
      }
    case FAVORITE_ACTIONS.REMOVE:
      return {
        items: state.items.filter((item) => {
          return item.id !== action.payload.id
        })
      }

    default:
      return state
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteContext = createContext<{
  favoriteState: IFavorite
  dispatch: React.Dispatch<FavoriteAction>
} | null>(null)

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteState, dispatch] = useReducer(favoriteReducer, {
    items: []
  })

  return <FavoriteContext.Provider value={{ favoriteState, dispatch }}>{children}</FavoriteContext.Provider>
}
