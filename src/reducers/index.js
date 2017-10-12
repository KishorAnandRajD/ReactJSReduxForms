import { combineReducers } from 'redux';
import PostsReducer from './posts_reducer';

import {reducer as formReducer} from 'redux-form';// npm install --save redux-form@6.6.3


const rootReducer = combineReducers({
  posts:PostsReducer,
  form:formReducer
});

export default rootReducer;
