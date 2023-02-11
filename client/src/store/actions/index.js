import * as api from "../../api/index";

export const signupUser = (userData) => ({
    type:'AUTH_USER',
    payload: api.signupUser(userData)
});

export const loginUser = (userData) => ({
    type:'AUTH_USER',
    payload: api.loginUser(userData)
});

export const autoSignin = () => ({
    type:'AUTH_USER',
    payload: api.autoSignin()
});

export const logoutUser = () => {

    localStorage.removeItem('X-AUTH');

   return  {
    type:'LOGOUT_USER',
    payload: null
}};


export const getUserStats = (id) => {

   return  {
    type:'USER_STATS',
    payload: api.getUserStats()
}};


export const createPost = (args) => {

   return  {
    type:'POST_CREATE',
    payload: api.createPost(args)
}};

export const clearCreatePost = (args) => {

    return  {
     type:'POST_CREATE',
     payload: {createdPost: null}
 }};


 export const getUserPosts = (sort, prevState, id) => {

    return  {
     type:'USER_POSTS',
     payload: api.getUserPosts(sort, prevState, id)
 }};


 export const updatePostStatus = (status, postId, state) => {

    return  {
     type:'UPDATE_POST',
     payload: api.updatePostStatus(status, postId, state)
 }};


 
 export const removePost = (id, state) => {

    return  {
     type:'USER_POSTS',
     payload: api.removePost(id, state)
 }};


 export const getPosts = (sort, state) => {

    return  {
     type:'GET_POSTS',
     payload: api.getPosts(sort, state)
 }};