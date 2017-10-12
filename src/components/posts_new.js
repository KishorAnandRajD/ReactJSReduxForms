import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom'; // For Navigating between pages

import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component{

// field is a default argument. The event handlers in them are inbuilt. just make some standard entries like '...field.input' for text type input
// {field.meta.error} - adds the validation function[fieldValidate] to the field
// There are 3 states for a field
// Pristine[untouched field], touched[keyed in,TAB out], invalid[invalid messages].
//{field.meta.touched? field.meta.error:''} - if field.meta.touched=TRUE, only then do the validation.

renderField(field){
// RED color for both field and error messages only when they are touched and error thrown
//const className=`form-group ${field.meta.touched && field.meta.error? 'has-danger':''}`;
// OR with destructuring on field TO meta using ES6
/*const {meta}=field;
const className=`form-group ${meta.touched && meta.error? 'has-danger':''}`;
*/
// OR with destructuring on nested objects field, touched and error TO meta
const {meta:{touched,error}}=field;
const customcssclass=`form-group ${touched && error? 'has-danger':''}`;
/*<div className="form-group  has-danger">
    To
  <div className={customcssclass}>
*/
  return(
    <div className={customcssclass}>
      <label>{field.labelToShow}</label>
      <input className="form-control" type="text" {...field.input} />
      <div className="text-help">
        {touched? error:''}
      </div>
    </div>
  );
}


onFormSubmit(values) {
    console.log(values);
    //this.props.createPost(values);// Call the function in action index.js file
    // Go back to the root page after submit and post has been inserted which takes some time
    //this.props.history.push('/');

    // So instead of using them in separate lines of code, use a call back function
    this.props.createPost(values,()=>{this.props.history.push('/')});// Call the function in action index.js file


}


/*
Field element - only knows how to interact with Redux form
component: interacts with user. returns JSX.
*/
  render(){

    const {handleSubmit}=this.props;// this.props passed on behalf of redux form


    /*
    <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
    Takes the custom function(onFormSubmit) and handleSubmit
    */
    return(
      <form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
        <Field name="title" component={this.renderField} labelToShow="Title for Post"/>
        <Field name="categories" component={this.renderField} labelToShow="Categories"/>
        <Field name="content" component={this.renderField} labelToShow="Post Content"/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">
            Cancel
        </Link>
      </form>
    );
  }

}

// Validation for the fields in the form
// All the field values will be present in the 'values' param
// {title:'dfsdf',categories:'sdffsd',content:'sdfsd'}
// NOTE: name should be 'validate'
function validate(values){

  console.log("Field Validate");

  const errors={};  // declare Errors object for throwing errors on validation

  // Validate the input fields
  if(!values.title ){
    errors.title="Enter a title!";
  }
  if(!values.categories){
    errors.categories="Enter some categories!";
  }
  if(!values.content){
    errors.content="Enter some content!";
  }
  // If errors is empty, the Form is fine to be submitted
  // If errors has values, redux form assumes form is invalid
  return errors;
}


//reduxForm - helper to communicate directly from component to reducer
/*export default reduxForm({
  validate:validate,
  form:'PostsNewForm'//Unique value, used as namespace
})(PostsNew);*/
export default reduxForm({
  validate:validate,
  form:'PostsNewForm'//Unique value, used as namespace
})(connect(null,{createPost})(PostsNew));
