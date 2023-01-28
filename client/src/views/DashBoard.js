import React, { useContext, useEffect } from 'react'
import {
  Button,
  Card,
  Spinner,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Toast,
} from 'react-bootstrap'
import { AuthContext } from '../contexts/AuthContext'
import { PostContext } from '../contexts/PostContext'
import SinglePost from '../component/posts/SinglePost'
import AddPostModal from '../component/posts/AddPostModal'
import UpdatePostModal from '../component/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'

const DashBoard = () => {
  // Load Context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext)

  const {
    postState: { post, posts, postsLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext)

  // Get all post
  useEffect(() => {
    getPosts()
  }, [])

  let body = null

  if (postsLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearnIt</Card.Title>
            <Card.Text>
              Click the button below to track your first skill to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              LearnIt
            </Button>
          </Card.Body>
        </Card>
      </>
    )
  } else {
    body = (
      <>
        <Row className="row-cols-1 row=cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>

        {/* Open add post modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add a new thing</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="addPost" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    )
  }

  return (
    <>
      {body}
      <AddPostModal />
      {post !== null && <UpdatePostModal />}

      <Toast
        show={show}
        style={{ position: 'fixed', top: '20%', right: '10px' }}
        className={`bg-${type} text-white`}
        onClose={setShowToast.bind(this, {
          show: false,
          message: '',
          type: null,
        })}
        delay={3000}
        autohide
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  )
}

export default DashBoard
