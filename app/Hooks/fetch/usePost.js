import { useState } from 'react'
import { stateInit, statePending, stateSuccess, stateError } from './model'
import Client from './client'
import FormData from 'Utils/formData'

export const usePost = () => {
  const [res, setResponse] = useState(stateInit)
  const [success, setSuccess] = useState(false)

  const post = async (urlRequest, req) => {
    req = FormData(req)
    setResponse(statePending)
    try {
      const res = await Client.post(urlRequest, req)
      setResponse({ ...stateSuccess, data: res.data })
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setResponse({ ...stateError })
    }
  }
  return { ...res, post, success }
}
