import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { reset, stopSubmit  } from 'redux-form';

const validate = values => {
  const errors = {};
  let num_reg = /^\d+$/;
  let valid_mobile_number = num_reg.test(values.mobile_number);
  let valid_user_id = num_reg.test(values.user_id);
  if (!values.mobile_number) {
    errors.mobile_number = 'Mobile Number is mandatory';
  }else
  {
    if(values.mobile_number < 5000000000 || values.mobile_number > 9999999999){
      errors.mobile_number = 'Enter valid Mobile number';
    }
    if(!valid_mobile_number){
      errors.mobile_number = 'Enter valid Mobile number';
    }
  }
  if(!valid_user_id){
    errors.user_id = 'ID should be numeric';
  }
  if (!values.username) {
    errors.username = 'Username is mandatory';
  }
  if (!values.password) {
    errors.password = 'Password is mandatory';
  }
  return errors;
}

const renderField = ({ fields , input, label, placeholder, type, className, meta: { touched, error, warning } }) => (
     <div className="formElements">
      <input {...input} placeholder={placeholder} type={type} className={className}/>
      {touched && ((error && <span className="label label-danger">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
)

class Register  extends Component{
  constructor(props){
    super(props);
  }
render() {
  const {handleSubmit,register,user_data} = this.props;
  return (
    <form  id="register-form" onSubmit={handleSubmit((formValues)=>{register(formValues,user_data)})}>
      <div className="form-group">
        <Field name="username"  type="text" className="form-control"  placeholder="Username" component={renderField} />
      </div>
      <div className="form-group">
        <Field name="password" type="password" className="form-control"  placeholder="Password" component={renderField} />
      </div>
      <div className="form-group">
        <Field name="user_id" type="text" className="form-control"  placeholder="User ID" component={renderField} />
      </div>
      <div className="form-group">
        <Field name="address" type="text" className="form-control"  placeholder="Address" component={renderField} />
      </div>
      <div className="form-group">
        <Field name="mobile_number" type="text" className="form-control"  placeholder="Mobile Number" component={renderField} />
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value={this.props.buttonname} />
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



function  mapDispatchToProps(dispatch){
   return {
      register:(formValues,user_data)=>{
        console.log();
        if(user_data.hasData){
          let checkUniq = user_data.data.filter(each_user => each_user.username ==  formValues.username);
          if(checkUniq.length > 0){
            return dispatch(stopSubmit('registrationForm', {username:"Username had already taken"}));
          }
        }
        dispatch({type:"ADD_USER",payload:formValues});
        alert("User Added successfully");
        dispatch(reset('registrationForm'));
     }
   }
}

Register = reduxForm({
  form: 'registrationForm',  // a unique identifier for this form
  validate               // <--- validation function given to redux-form
})(Register)

Register = connect(mapStateToProps,mapDispatchToProps)(Register);
export default Register;
