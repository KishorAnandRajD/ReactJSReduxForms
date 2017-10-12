import Axios from 'axios';// npm install --save axios


export const FETCH_POSTS='fetch_posts'; // For Post Index component
export const CREATE_POST='create_post'; // For Post New component
export const FETCH_POST='fetch_post'; // For Post Show component
export const DELETE_POST='delete_post'; // For Post Show component

const ROOT_URL='http://reduxblog.herokuapp.com/api';// taken from //http://reduxblog.herokuapp.com/
const API_KEY='?key=PAPERCLIPKISHOR1234';//Any Key

// Fetch all the posts (for Post Index component)
export function fetchPosts(){
  //http://reduxblog.herokuapp.com/
  const axiosrequest=Axios.get(`${ROOT_URL}/posts${API_KEY}`);// Asynchronous request because Promise is used

  return{
    type:FETCH_POSTS,
    payload:axiosrequest
  };
}

// Create a new post
export function createPost(values,callbackfn){
  //http://reduxblog.herokuapp.com/
  // Post the values into the API
  //const axiospostrequest=Axios.post(`${ROOT_URL}/posts${API_KEY}`,values);// Asynchronous request because Promise is used

  //Calling the call back function after the post request is successfully executed and completed.
const axiospostrequest=Axios.post(`${ROOT_URL}/posts${API_KEY}`,values).then(()=>callbackfn());// Asynchronous request because Promise is used

// The return value is not used anywhere, just a protocol in this case
  return{
    type:CREATE_POST,
    payload:axiospostrequest
  };
}

// Fetch Post with id (for PostShow component)
export function fetchPost(id){
  //http://reduxblog.herokuapp.com/
  ///api/posts/:id	- GET -	http://reduxblog.herokuapp.com/api/posts/5
  const axiosidrequest=Axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);// Asynchronous request because Promise is used

  return{
    type:FETCH_POST,
    payload:axiosidrequest
  };
}

//Delete Post with id (for Post Show component)
export function deletePost(id,callbackfn){
  //http://reduxblog.herokuapp.com/
  ////api/posts/:id	- DELETE -	http://reduxblog.herokuapp.com/api/posts/5

  //Calling the call back function after the post request is successfully executed and completed and go back to root page

  const axiosdeleteidrequest=Axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then(()=>callbackfn());// Asynchronous request because Promise is used;//

// The return value is not used anywhere, just a protocol in this case
// So instead of returning payload as request, we are returning the id alone
  return{
    type:DELETE_POST,
    payload:id
  };
}
