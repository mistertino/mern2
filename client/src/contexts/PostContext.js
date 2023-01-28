import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { apiUrl } from './constants'
import {
  POST_LOAD_SUCCESS,
  POST_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from '../reducers/constant'
import axios from 'axios'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
  //State
  const [postState, dispath] = useReducer(postReducer, {
    post: null,
    posts: [],
    postsLoading: true,
  })

  const [showAddPostModal, setShowAddPostModal] = useState(false)
  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
  const [showToast, setShowToast] = useState({
    show: false,
    message: '',
    type: null,
  })

  // Get all posts
  const getPosts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/posts`)
      if (response.data.success) {
        dispath({ type: POST_LOAD_SUCCESS, payload: response.data.posts })
      }
    } catch (error) {
      dispath({ type: POST_LOADED_FAIL })
    }
  }

  // Add Post
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/posts`, newPost)
      if (response.data.success)
        dispath({ type: ADD_POST, payload: response.data.post })
      return response.data
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'sever error' }
    }
  }

  // Update post
  const updatePost = async (updatedPost) => {
    try {
      const response = await axios.put(
        `${apiUrl}/posts/${updatedPost._id}`,
        updatedPost,
      )
      if (response.data.success) {
        dispath({ type: UPDATE_POST, payload: response.data.post })
        return response.data
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'sever error' }
    }
  }

  // Delete Post
  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`)
      if (response.data.success) dispath({ type: DELETE_POST, payload: postId })
    } catch (error) {
      console.log(error)
    }
  }

  // Find post when user updating post
  const findPost = (postId) => {
    const post = postState.posts.find((post) => post._id === postId)
    dispath({ type: FIND_POST, payload: post })
  }

  // PostContext data
  const PostContextData = {
    postState,
    getPosts,
    showAddPostModal,
    setShowAddPostModal,
    addPost,
    showToast,
    setShowToast,
    deletePost,
    findPost,
    updatePost,
    showUpdatePostModal,
    setShowUpdatePostModal,
  }

  return (
    <PostContext.Provider value={PostContextData}>
      {children}
    </PostContext.Provider>
  )
}

export default PostContextProvider
