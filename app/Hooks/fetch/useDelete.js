import { useState } from 'react'
import { stateInit, statePending, stateSuccess, stateError } from './model'
import Client from './client'
import FormData from 'Utils/formData'

export const useDelete = () => {
  const [res, setResponse] = useState(stateInit)
  const [success, setSuccess] = useState(false)

  const deleteItem = async (urlRequest, req) => {
    req = FormData(req)
    setResponse(statePending)
    try {
      const res = await Client.delete(urlRequest, req)
      setResponse({ ...stateSuccess, data: res.data })
      setSuccess(true)
    } catch (error) {
      setResponse({ ...stateError })
    }
  }
  return { ...res, deleteItem, success }
}
