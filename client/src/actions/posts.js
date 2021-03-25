/* eslint-disable no-console */
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

const Toast = withReactContent(Swal.mixin({
  toast: true,
  position: 'top-right',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
}));

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    Toast.fire({ html: ' &nbsp; Posts Loaded ', icon: 'success' });
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    Toast.fire({ html: ' &nbsp; Action Failed ', icon: 'error' });
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    Toast.fire({ html: ' &nbsp; Post Created ', icon: 'success' });
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    Toast.fire({ html: ' &nbsp; Action Failed ', icon: 'error' });
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    Toast.fire({ html: ' &nbsp; Post Updated ', icon: 'success' });
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    Toast.fire({ html: ' &nbsp; Action Failed ', icon: 'error' });
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    Toast.fire({ html: ' &nbsp; Post Liked ', icon: 'success' });
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    Toast.fire({ html: ' &nbsp; Action Failed ', icon: 'error' });
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    Toast.fire({ html: ' &nbsp; Post Deleted ', icon: 'success' });
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    Toast.fire({ html: ' &nbsp; Action Failed ', icon: 'error' });
    console.log(error);
  }
};
