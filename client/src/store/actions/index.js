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