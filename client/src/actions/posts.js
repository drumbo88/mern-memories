import * as at from '../constants/actionTypes'
import * as api from '../api'

// Action creators
export const getPosts = () => async (dispatch) => {

    try {
        const { data } = await api.fetchPosts()
        const action = { type: at.FETCH_ALL, payload: data }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }

}
export const createPost = (post) => async (dispatch) => {

    try {
        const { data } = await api.createPost(post)
        const action = { type: at.CREATE, payload: data }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }

}

export const updatePost = (id, post) => async (dispatch) => {

    try {
        const { data } = await api.updatePost(id, post)
        const action = { type: at.UPDATE, payload: data }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }

}
export const deletePost = (id) => async (dispatch) => {

    try {
        await api.deletePost(id)
        const action = { type: at.DELETE, payload: id }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }

}
export const likePost = (id) => async (dispatch) => {

    try {
        const { data } = await api.likePost(id)
        const action = { type: at.LIKE_POST, payload: data }
        dispatch(action)
    }
    catch (error) {
        console.log(error)
    }

}