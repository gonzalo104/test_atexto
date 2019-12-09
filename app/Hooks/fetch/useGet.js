import { useState, useEffect } from 'react'
import { stateInit, statePending, stateSuccess, stateError } from './model'
import FromData from 'Utils/formData'
import Client from './client'

export const useGet = (urlRequest, executeStartComponent = false) => {
  const [res, setResponse] = useState(stateInit)
  const get = async req => {
    req = FromData({ ...req })
    setResponse(statePending)
    try {
      const response = await Client.get(urlRequest, req)
      setResponse({ ...stateSuccess, data: response.data.data })
    } catch (error) {
      setResponse({ ...stateError })
    }
  }

  useEffect(() => {
    if (executeStartComponent) get()
  }, [urlRequest, executeStartComponent])

  return { ...res, get }
}
