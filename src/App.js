import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import {connect} from 'react-redux';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      active : true
    }
  }
  render() {
    const {active} = this.state;
    const {user_data,user_data:{auth_user},logout} = this.props;
    return (
      <div>
      <div className="container">
    	<div className="row">
			<div className="col-md-10 col-md-offset-1">
				<div >
          {
          user_data.isAuth ?
          <div className="panel panel-login">
          <div className="panel-heading">
						<div className="row">
              <p>Hi{" "+user_data.auth_user.username}</p>
              <a onClick={()=>{logout();}} href="#">Logout</a>
            </div>
          </div>
            <div className="panel-body">
  						<div className="row">
    							<div className="col-lg-12">
                  <table  className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>USER ID</th>
                        <th>Address</th>
                        <th>Mobile Number</th>
                      </tr>
                    </thead>
                    <tbody>
                     <tr>
                        <td>{auth_user.username}</td>
                        <td>{auth_user.user_id}</td>
                        <td>{auth_user.address}</td>
                        <td>{auth_user.mobile_number}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            </div>
          :
          <div className="panel panel-login">
          <div className="panel-heading">
						<div className="row">
							<div className="col-xs-6">
								<a href={"#"} className={active?"active":""} id="login-form-link" onClick={()=>{this.setState({active:true})}}>Login</a>
							</div>
							<div className="col-xs-6">
								<a href={"#"} className={!active?"active":""} id="register-form-link" onClick={()=>{this.setState({active:false})}}>Register</a>
							</div>
						</div>
						<hr/>
					</div>
          <div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
                {
                  active ?
                  <Login />
                  :
                  <Register buttonname={"Register Now"}/>
                }
							</div>
						</div>
					</div>
          </div>
          }
				</div>
			</div>
		</div>
	</div>
  </div>
    );
  }
}

function mapStateToProps(state){
   return {
     user_data : state.user_data,
   }
 }

 function mapDispatchToProps(dispatch){
    return {
      logout:(props,user_data)=>{
        dispatch({type:"LOGOUT_USER"});
      }
    }
 }
 App = connect(mapStateToProps,mapDispatchToProps)(App);
export default App;
