import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {
  // Load COntext
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext)

  // State
  const [updatedPost, setUpdatedPost] = useState(post)

  const { title, description, url, status } = updatedPost

  useEffect(() => setUpdatedPost(post), [post])

  //Func
  const closeDialog = () => {
    setUpdatedPost(post)
    setShowUpdatePostModal(false)
  }

  const onChangeUpdatePostForm = (event) => {
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const { success, message } = await updatePost(updatedPost)
    setShowUpdatePostModal(false)
    setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  }

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header>
        <Modal.Title>Making process?</Modal.Title>
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
              onChange={onChangeUpdatePostForm}
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
              onChange={onChangeUpdatePostForm}
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
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatePostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
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

export default UpdatePostModal
