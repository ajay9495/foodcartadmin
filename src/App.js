import { Component } from 'react';
import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';
import './shared/css/dist/css/adminlte.min.css'
import './shared/css/plugins/css/all.css'

import TopNavigation from './components/TopNavigation/TopNavigation'
import SideBar from './components/SideBar/SideBar'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main';
import Register from './components/Register/Register'
import Login from './components/Login/Login';
import useLocalStorage from './shared/js/SharedModules/LocalStorage/useLocalStorage';
import SuperRouter from './components/SuperAdmin/SuperRouter/SuperRouter';
import SuperLoginRouter from './components/SuperAdmin/SuperLoginRouter/SuperLoginRouter';


class App extends  Component{


  constructor(props) {
    super(props);

    props.setUserData(getLocalUserData());
    
  }

  render(){


    return (
      <div className='wrapper'>

        {

          (this.props.user.data.status =="loggedIn")? 
            <>
              <TopNavigation />
              <SideBar />
              <Main />
              <Footer /> 
            </>
          :(this.props.user.data.status =="loggedOut")?
            <Login />
          :(this.props.user.data.status =="toRegister")?  
            <Register />
          :(this.props.user.data.status =="superAdmin")?
            <SuperLoginRouter />
          :(this.props.user.data.status =="superAdminLoggedIn")?
            <SuperRouter />
          :
            <div></div>
          
        }

      </div>
    )

  }



}


let userDataStr = "";
function getLocalUserData(){
    userDataStr = window.localStorage.getItem("adminData");

    if(userDataStr){
        return JSON.parse(userDataStr);
    }
    else{
        return {status:"toRegister",admin_id:"",store_id:""};
    }
}

function mapStateToProps(state){

  return{
    user: state.user
  }
}

function mapDispatchToProps(dispatch){

  return {
    setUserData: (data) => dispatch({
        type:"user/setUserData",
        payload:{data:data}
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
