import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}
