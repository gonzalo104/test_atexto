import React from 'react'
import ListRecording from './components/listRecording'
import CreateEditModal from './components/createEditModal'
import AppBar from 'Components/appBar'
import { useGet, usePost, usePut, useDelete } from 'Hooks/fetch'
import useShowModal from 'Hooks/useShowModal'
import Loading from 'Components/loading'

const Recording = () => {
  // HOOKS
  const { put } = usePut()
  const { post } = usePost()
  const { deleteItem } = useDelete()
  const { data, get, loading } = useGet('/recordings', true)

  // DATA INITIAL
  const objAudio = { recordingFile: null, audioBlob: null, audioUrl: '', audio: null }
  const initialObj = { _id: '0', title: '', description: '', ...objAudio }
  const { showModal, isNew, initialValues, openModal } = useShowModal()

  const closeModal = () => openModal(false, false, initialObj)
  const openModalEdit = (obj) => openModal(true, false, { ...obj, ...objAudio })
  const openModalNew = () => openModal(true, true, initialObj)

  // FETCHING
  const createRecording = (data) => {
    post('/recording', data).then(() => {
      get()
      closeModal()
    })
  }

  const updateRecording = (data, id) => {
    put(`/recording/${id}`, data).then(() => {
      get()
      closeModal()
    })
  }

  const deleteRecording = (id) => {
    deleteItem(`/recording/${id}`).then(() => { get() })
  }

  return (
    <AppBar handleModal={openModalNew}>
      {
        loading ? <Loading />
          : <React.Fragment>
            <ListRecording
              handleModal={openModalEdit}
              data={data || []}
              deleteRecording={deleteRecording}
            />
          </React.Fragment>
      }
      {
        showModal &&
        <CreateEditModal
          open={showModal}
          handleModal={closeModal}
          initialValues={initialValues}
          isNew={isNew}
          createRecordig={createRecording}
          updateRecording={updateRecording}
        />
      }
    </AppBar>
  )
}

export default Recording
