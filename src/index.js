import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// BrowserRouter - Interacts with history library to display what component to show on screen
// Route - if the URL is this, show this component
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import reducers from './reducers';
import PostsIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostShow from './components/posts_show';

import promise from 'redux-promise'; // npm install --save redux-promise

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

/* If switch is not used, then subsets of URL will also be rendered
// Switch will handle it by taking only the first match of Route path for rendering */

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/posts/new" component={PostsNew}/>
          <Route path="/posts/:id" component={PostShow}/>
          <Route path="/" component={PostsIndex}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
