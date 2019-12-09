import { useState } from 'react'
import { stateInit, statePending, stateSuccess, stateError } from './model'
import Client from './client'
import FormData from 'Utils/formData'

export const usePut = () => {
  const [res, setResponse] = useState(stateInit)
  const [success, setSuccess] = useState(false)

  const put = async (urlRequest, req) => {
    req = FormData(req)
    setResponse(statePending)
    try {
      const res = await Client.put(urlRequest, req)
      setResponse({ ...stateSuccess, data: res.data })
      setSuccess(true)
    } catch (error) {
      setResponse({ ...stateError })
    }
  }
  return { ...res, put, success }
}
