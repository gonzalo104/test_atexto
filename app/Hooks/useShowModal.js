import { useState } from 'react'

export default () => {
  const [showModal, setShowModal] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [initialValues, setInitialValues] = useState({})

  const openModal = (open = false, newRecording = false, initialData = {}) => {
    setShowModal(open)
    setIsNew(newRecording)
    setInitialValues(initialData)
  }
  return { showModal, isNew, initialValues, openModal }
}
