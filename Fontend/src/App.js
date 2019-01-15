import React, { Component } from 'react';
import './App.css';
import Login from "./components/Login/Login";
import ClientNavBar from './components/NavBar/ClientNavBar';
import EmployeeNavBar from './components/NavBar/EmployeeNavBar';
import Delay from 'react-delay'
import OwnerNavBar from './components/NavBar/OwnerNavBar';
import AdminNavBar from './components/NavBar/AdminNavBar';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';




class App extends Component {

    state={
      loggedIn:false,
      user:'',
    };


   
  
    onLogin =(user) => {
      if(user==null){

      }else{
        this.setState( { loggedIn: true });
        this.setState( { user: user });
      }
    };
    

    getUser(){
      fetch(`/users/username/${this.state.userName}`)
        .then(data=>data.json())
        .then(user=>this.setState({user:user}))
    }

    getRole(){
      return this.state.user.role;
    }



   
    onLogout = () => {
      this.setState({ loggedIn: false });
    };
  
    render(){

      if(!this.state.loggedIn){
        return(
          <div >
            <p><font color="white"><h1>Sjedi pa jedi</h1></font></p>
            <li></li>
            <Login onLogin={this.onLogin} error={''}/>
          </div>
        )
      }else{
        if(this.state.user.role=='klijent'){
          return(

            <div>
              
              <p><font color="white"><h1>Sjedi pa jedi</h1></font></p>
              <p><font color="white">Trenutni korisnik: {this.state.user.userName}</font></p> 
              <ClientNavBar userName={this.state.user.userName} onLogout={this.onLogout}/>
            </div>
            );
          
        }else if(this.state.user.role=='vlasnik'){
          return(
            <div>
              <p><font color="white"><h1>Sjedi pa jedi</h1></font></p>
              <p><font color="white">Trenutni korisnik: {this.state.user.userName}</font></p> 
              <p><font color="white">Razina ovlasti: {this.state.user.role}</font></p>
              <OwnerNavBar userName={this.state.user.userName} restaurant={this.state.user.idRestaurant}></OwnerNavBar>
            </div>
            );
        }else if(this.state.user.role=='administrator'){
          return(
            <div>
              <p><font color="white"><h1>Sjedi pa jedi</h1></font></p>
              <p><font color="white">Trenutni korisnik: {this.state.user.userName}</font></p> 
              <p><font color="white">Razina ovlasti: {this.state.user.role}</font></p>
              <AdminNavBar userName={this.state.user.userName}></AdminNavBar>
            </div>
            );

        }else if(this.state.user.role=='zaposlenik'){
          return(
            <div>
            <Delay
                wait={100}
              >
            <div>  
              <p><font color="white"><h1>Sjedi pa jedi</h1></font></p>
              <p><font color="white">Trenutni korisnik: {this.state.user.userName}</font></p> 
              <p><font color="white">Razina ovlasti: {this.state.user.role}</font></p>
              <EmployeeNavBar userName={this.state.user.userName} restaurant={this.state.user.idRestaurant} onLogout={this.onLogout}/>
            </div>
            </Delay>
            </div>
            );

        }
        else{
          return(
            <div className="App">
            <Login onLogin={this.onLogin} error={'Podaci nisu ispravni'}/>
          </div>
          );
        }

    } 
  }
}
 
  

export default App;
