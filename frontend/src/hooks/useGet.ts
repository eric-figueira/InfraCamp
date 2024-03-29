import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useGet<T = unknown>(url: string) {

  const [data, setData] = useState<T | null>(null)
  const [isGetting, setIsGetting] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    api.get(url)
    .then(response => {
      setData(response.data)
    })
    .catch(error => {
      setError(error)
    })
    .finally(() => {
      setIsGetting(false)
    })
  }, [])

  return { data, isGetting, error }
}