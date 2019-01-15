import React, {Component} from 'react';
import Form from "../Form/Form";
import Button from '@material-ui/core/Button';
import Card from "../Card/Card";
import './Login.css';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import UserForm from "../Form/UserForm";
import GoogleMapRestaurants from '../Map/GoogleMapRestaurants';




const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


class Login extends Component {
  constructor(props) {
    super(props);
    this.end = this.end.bind(this)
}

    state = {
      username: '',
      password: '',
      error: '',
      user:'',
      register:false,
    };

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
      
    };
    componentDidMount(){
        const data={
            userName: "admin",
            password: "admin",
            name: "admin",
            surname: "admin",
            email: "admin@gmail.com",
            role: "administrator",
            creditCard: "1234"
            
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/users',options)
            .then(response=>{
                if(response.ok){
                }
                if (response.status === 400) {
                } 
            });
    }

    

    onSubmit = (e) => {
      e.preventDefault();
      const data={
        userName:this.state.username,
        password:this.state.password,
    };
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    };
      fetch('/users/login',options)
      .then(data=>data.json())
      .then(user=>this.props.onLogin(user)); 
      this.setState({ username: '' });
      this.setState({ password: '' });

    };

    onSubmit2 = (e) => {
      e.preventDefault();
      this.setState({ register: true });
       
    };

    end(){
      this.setState({register:false});
  }
 
    render() {
      const { classes } = this.props;
      if(!this.state.register){

        return (
          <div>
          <Card>
             <form  noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-name"
                  label="Korisničko ime"
                  value={this.state.username}
                  onChange={this.handleChange('username')}
                  margin="normal"
                 />
                </div>
                 <TextField
                  id="standard-name"
                  label="Lozinka"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  type="password"
                 />
              </form>
              <div className='error'><font color="red" size="3">{this.props.error}</font></div>
              <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                  Prijava
                </Button>
              </Form>
              <Form onSubmit={this.onSubmit2} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                  Registracija
                </Button>
              </Form>
              
              <GoogleMapRestaurants></GoogleMapRestaurants>
          </Card>
          
        
         
          </div>
        )

      }else if(this.state.register){

        return (
          <Card>
              <UserForm end={this.end}></UserForm>
          </Card>
          
        
        )

      }else{
        return(
          <p>Došlo je do greške</p>
        );
      }
        
      }
    }
  

    Login.propTypes = {
      classes: PropTypes.object.isRequired,
    };
  
    export default withStyles(styles)(Login);
  