import { useSearchParams } from 'react-router'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  return {
    getParam: (key: string) => searchParams.get(key),
    getAllParams: () => Object.fromEntries(searchParams.entries()),
    setParam: (key: string, value: string) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.set(key, value)
      setSearchParams(newParams)
    },
    deleteParam: (key: string) => {
      const newParams = new URLSearchParams(searchParams)
      newParams.delete(key)
      setSearchParams(newParams)
    },
    setParams: (paramsObject: URLSearchParams) => setSearchParams(paramsObject)
  }
}

export default useQueryParams
