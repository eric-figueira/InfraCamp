import { useEffect, useReducer, useRef } from "react";

interface State<T> {
  data?: T
  error?: Error
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

// options possui atributos como body, headers e method 
function useFetch<T = unknown>(url?: string, options?: RequestInit) {
  // armazena os dados pegos de uma url para otimizar o código e prevenir rerenderizações desnecessárias
  const cache = useRef<Cache<T>>({})

  // serve para que, se o componente não estiver montado, não usemos o dispatch
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
  }

  // a função reducer possui dois parâmetros: state e action
  // dependendo do tipo de cada action, retornamos valores específicos
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return { ...initialState }
      case 'fetched':
        return { ...initialState, data: action.payload } // payload é do tipo genérico T
      case 'error':
        return { ...initialState, error: action.payload } // payload é do tipo Error
      default:
        return state
    }
  }

  // useReducer: funciona como um state que possui subvalores a serem tratados por uma função reducer, além de um valor inicial initialState
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  useEffect(() => {
    // Se a url não existe, não prosseguimos
    if (!url) return

    // o componente está montado: descancelamos as operações
    cancelRequest.current = false

    // pega os dados e trata os erros
    const fetchData = async () => {
      dispatch({ type: 'loading' })

      // se já há algum dado relacionado a uma url armazenado no cache, não precisamos fazer um fetch novamente: já pegamos os dados salvos
      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] })
        return
      }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T
        // salvamos os dados no cache, para ser usado posteriormente
        cache.current[url] = data
        // antes de fazer o dispatch, verificamos se o componente não foi desmontado
        if (cancelRequest.current) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        // antes de fazer o dispatch, verificamos se o componente não foi desmontado
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()

    // função cleanup do useEffect: serve para evitar uma atribuição de state em um componente desmontado
    return () => {
      cancelRequest.current = true
    }
  }, [options, url])

  // retorna um objeto com os dados recuperados ou erros que ocorreram no processo
  return state
}

export default useFetch