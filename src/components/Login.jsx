import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { reset } from 'redux-form';

//import { nexmo } from './nexmo.js';
const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Username is Required'
  }
  if (!values.password) {
    errors.password = 'Password is Required'
  }
  return errors
}

const renderField = ({ fields , input, label, placeholder, type, className, meta: { touched, error, warning } }) => (
     <div className="formElements">
      <input {...input} placeholder={placeholder} type={type} className={className}/>
      {touched && ((error && <span className="label label-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)


class Login  extends Component{
  submitForm(formValue){
    this.props.login(formValue,this.props.user_data);
  }
render() {
  const {handleSubmit} = this.props;
  return (
    <form  id="login-form" onSubmit={handleSubmit((formValue)=>{this.submitForm(formValue)})}>
      <div className="form-group">
        <Field name="username"  type="text" className="form-control"  placeholder="Username" component={renderField} />
      </div>
      <div className="form-group">
        <Field name="password" type="password" className="form-control"  placeholder="Password" component={renderField} />
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In" />
          </div>
        </div>
      </div>
    </form>
  )
}
}


function mapStateToProps(state){
  return {
    user_data : state.user_data,
  }
}

function mapDispatchToProps(dispatch){
   return {
     login:(props,user_data)=>{
       if(user_data.hasData){
         let status = user_data.data.map((value,index)=>{
           if((value.username == props.username) && (value.password == props.password)){
             dispatch({type:"AUTH_USER",payload:value});
             dispatch(reset('LoginForm'));
             return true;
           }else{
             return false;
           }
         });
         if(status){
           alert("Login successfully")
         }else{
           alert("In-valid credentials");
         }
       }else{
         alert("In-valid credentials");
       }
     }
   }
}

Login = reduxForm({
  form: 'LoginForm',  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(Login)

Login = connect(mapStateToProps,mapDispatchToProps)(Login);
export default Login;
