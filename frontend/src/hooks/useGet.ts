import { useState, useEffect } from "react";
import { api } from "../services/api";

export function useGet<T = unknown>(url: string) {

  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    api.get(url).then(response => {
      setData(response.data)
    })
  }, [])

  return { data }
}