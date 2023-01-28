import React, { useContext, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
  // Load COntext
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext)

  // State
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: 'TO LEARN',
  })

  const { title, description, url } = newPost

  //Func
  const closeDialog = () => {
    setShowAddPostModal(false)
  }

  const onChangeNewPostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const { success, message } = await addPost(newPost)
    setNewPost({
      title: '',
      description: '',
      url: '',
      status: 'TO LEARN',
    })
    setShowAddPostModal(false)
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  }

  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              value={title}
              onChange={onChangeNewPostForm}
              aria-describedby="title-help"
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={description}
              onChange={onChangeNewPostForm}
              name="description"
              rows={3}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Url"
              name="url"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button Variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddPostModal
