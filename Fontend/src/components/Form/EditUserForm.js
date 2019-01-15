import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "./Form";
import Card from "../Card/Card";

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });



class EditUserForm extends Component{



    state ={
        idUser:null,
        userName:null,
        password:null,
        name:null,
        surname:null,
        mobilePhone:null,
        city:null,
        adress:null,
        email:null,
        role:null,
        creditCard:null,
        idRestaurant:null,
        error:'',
        success:'',
    };
   

    componentDidMount(){
        fetch('/users/username')
        .then(data=>data.json())
        .then(data => this.setState({idUser:data.idUser,userName:data.userName,password:data.password,name:data.name,surname:data.surname,mobilePhone:data.mobilePhone,city:data.city,adress:data.adress,email:data.email,creditCard:data.creditCard,role:data.role,idRestaurant:data.idRestaurant  }))

    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            idUser:this.state.idUser,
            userName: this.state.userName,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            mobilePhone:this.state.mobilePhone,
            city:this.state.city,
            adress:this.state.adress,
            email: this.state.email,
            role: this.state.role,
            creditCard: this.state.creditCard,
            idRestaurant:this.state.idRestaurant
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/users/update',options)
            .then(response=>{
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } else if(response.ok){
                  this.setState({success:'Uspješno izmijenjen korisnički račun'});
                  this.setState({ error: ''});
                }
            })
    };

    onSubmit2=(e)=>{
      e.preventDefault();
      const data={
      };
      const options={
          method:'DELETE',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
      };
      return fetch('/users/username',options)
          .then(response=>{
              if (response.status === 400) {
                  this.setState({ error: 'Podaci su neispravni'});
              } else{
                window.location.reload();
              }
          })
  };

    render(){
        const { classes } = this.props;
        return(
            <Card>
            <div className='EditUserForm'>
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-name"
                  label="Korisničko ime*"
                  value={this.state.userName}
                  onChange={this.handleChange('userName')}
                  margin="normal" 
                  InputLabelProps={{
                    shrink: true,
                  }}     
                  InputProps={{
                    readOnly: true,
                  }}        
                 />
                </div>
                 <TextField
                  id="standard-name"
                  label="Lozinka*"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  type="password"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                 <div>
                <TextField
                  id="standard-name"
                  label="Ime*"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Prezime*"
                  value={this.state.surname}
                  onChange={this.handleChange('surname')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="E-mail*"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Broj kreditne kartice*"
                  value={this.state.creditCard}
                  onChange={this.handleChange('creditCard')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Broj mobilnog telefona"
                  value={this.state.mobilePhone}
                  onChange={this.handleChange('mobilePhone')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Grad stanovanja"
                  value={this.state.city}
                  onChange={this.handleChange('city')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Adresa stanovanja"
                  value={this.state.adress}
                  onChange={this.handleChange('adress')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}   
                 />
                </div> 
                <div>
                    <p><font size="3">* Podaci su obavezni</font></p>
                </div>               
            </form>
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            <div className='error'><font color="green" size="3">{this.state.success}</font></div>
            </div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Potvrdi izmjene
                </Button>
            </Form>
            <Form onSubmit={this.onSubmit2} >
                <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Obriši korisnički račun
                </Button>
            </Form>

            
            </Card>
        );
    }
}

EditUserForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditUserForm);
