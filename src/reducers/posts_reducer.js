import {FETCH_POSTS} from '../actions'; // For Post Index component
import {FETCH_POST} from '../actions'; // For Post Show Component
import {DELETE_POST} from '../actions'; // For Post Show Component

import _ from 'lodash';

export default function(state={},action){
  switch(action.type){

    // Fetch all the posts
    case FETCH_POSTS:
      console.log(action.payload.data);// [post1,post2,..]
      // What we need is [{1:post1}]
      // The Lodash has a function to convert the array to required array object with index on 'id' as below
      return _.mapKeys(action.payload.data,'id');

      // WE have to retrive only one post based on id
    case FETCH_POST:
        console.log(action.payload.data);
        const post=action.payload.data;
        // ES5 syntax
        /*const newState= {...state}; // Get all State values
        newState[post.id]=post; // Get the
        return newState;
        */
        //ES6 syntax
        // {...<all state object values>,[Key]:[value]}   For the id assign the data
        //return {...state,[action.payload.data.id]:action.payload.data}; // This is NOT an array
        // What we need is [{1:post1}]
        // The Lodash has a function to convert the array to required array object with index on 'id' as below
        return _.mapKeys(action.payload.data,'id');

    // Delete the entry for the object based on id on the state
    // REMEMBER that the API call to delete is done in the action Creator
    // This is done so that after delete the root page refresh based on state to fetch the data is quick instead of another full API call to get list of posts
    case DELETE_POST:
      console.log(action.payload.data);
      // Lodash function to omit the entry from state object
      return _.omit(state,action.payload);// State object is with Key as 'id'
      // If state object was array
      //return _.reject(state,post=>post===action.payload);

    default:
      return state;
  }
}
