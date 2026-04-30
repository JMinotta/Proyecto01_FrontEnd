import { createContext, useContext, useState } from 'react'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (anime) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.mal_id === anime.mal_id)) return prev
      return [...prev, anime]
    })
  }

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((f) => f.mal_id !== id))
  }

  const isFavorite = (id) => favorites.some((f) => f.mal_id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider')
  return ctx
}
