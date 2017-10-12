import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost} from '../actions';// Action Creator for fetching one post
import {deletePost} from '../actions';// Action Creator for Deleting the post
//import _ from 'lodash';
import {Link} from 'react-router-dom'; // For Navigating between pages

class PostShow extends Component{

  // Immediately after component is shown up the DOM
  componentDidMount(){
    console.log("componentDidMount");
    const {id}=this.props.match.params;  // directly provided by react-router
    this.props.fetchPost(id);
  }

  // On Delete of the post
  onDeleteClick(){
    const {id}=this.props.match.params;  // directly provided by react-router
    // deletePost is the Action Creator present in action index js file
    //this.props.deletePost(id);
    // Also do a callback function to get back to root page after delete is successful and request is complete
    this.props.deletePost(id,()=>{this.props.history.push('/')});
  }

  render(){
  //  posts[this.props.match.params.id]; // the post we want to show
  const {post}=this.props;

  //During first load of render, the values would not have been processed from componentDidMount. So return some constant value if post is null. Else we will get console error stating title is not defined
  if(!post){
    return <div>Loading..</div>;
  }

    return(
      <div>
          <Link to="/" > Back To Index </Link>
          <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>
            Delete Post
          </button>
          <h3>{post.title}</h3>
          <h6>Categories:{post.categories}</h6>
          <p>{post.content}</p>
      </div>
    );
  }
}
// FIrst arg is application state, second arg is ownProps
// ownProps is the props object which is heading to PostShow class
function mapStateToProps({posts},ownProps){
//  return {posts};  // full list of posts
  return {post: posts[ownProps.match.params.id]}; // only the single post based on id
}

export default connect(mapStateToProps,{fetchPost,deletePost})(PostShow);
