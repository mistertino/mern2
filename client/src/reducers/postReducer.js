import {
  POST_LOAD_SUCCESS,
  POST_LOADED_FAIL,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from './constant'
export const postReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case POST_LOAD_SUCCESS:
      return {
        ...state,
        posts: payload,
        postsLoading: false,
      }
    case POST_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postsLoading: false,
      }
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      }
    case UPDATE_POST:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post,
      )
      return {
        ...state,
        posts: newPosts,
      }
    case FIND_POST:
      return {
        ...state,
        post: payload,
      }
    default:
      return state
  }
}
