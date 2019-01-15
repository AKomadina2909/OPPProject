import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "../Form/Form";
import Card from "../Card/Card";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class UserForm extends React.Component{



    state ={
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
        error:'',
        success:'',
        checkedOwner:false,
        role:'klijent'
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleChange2 = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    onSubmit=(e)=>{
        var role;
        if(this.state.checkedOwner) role='vlasnik';
        else role='klijent';
        e.preventDefault();
        const data={
            userName: this.state.userName,
            password: this.state.password,
            name: this.state.name,
            surname: this.state.surname,
            mobilePhone:this.state.mobilePhone,
            city:this.state.city,
            adress:this.state.adress,
            email: this.state.email,
            role: role,
            creditCard: this.state.creditCard
            
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
                    this.setState({ error: ''});
                    this.setState({ success: 'Korisnik je uspješno registriran'});
                    this.setState({ userName: ''});
                    this.setState({ password: ''});
                    this.setState({ name: ''});
                    this.setState({ surname: ''});
                    this.setState({ mobilePhone: ''});
                    this.setState({ city: ''});
                    this.setState({ adress: ''});
                    this.setState({ email: ''});
                    this.setState({ role: ''});
                    this.setState({ creditCard: ''});
                    this.setState({ checkedOwner: false});
                    this.props.end();

                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            });
            
    };

    render(){
        const { classes } = this.props;
        return(
            <Card>
            <div className='UserForm'>
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-name"
                  label="Korisničko ime*"
                  value={this.state.userName}
                  onChange={this.handleChange('userName')}
                  margin="normal"
                 />
                </div>
                 <TextField
                  id="standard-name"
                  label="Lozinka*"
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  margin="normal"
                  type="password"
                 />
                 <div>
                <TextField
                  id="standard-name"
                  label="Ime*"
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Prezime*"
                  value={this.state.surname}
                  onChange={this.handleChange('surname')}
                  margin="normal"
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="E-mail*"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  margin="normal"
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Broj kreditne kartice*"
                  value={this.state.creditCard}
                  onChange={this.handleChange('creditCard')}
                  margin="normal"
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Broj mobilnog telefona"
                  value={this.state.mobilePhone}
                  onChange={this.handleChange('mobilePhone')}
                  margin="normal"
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Grad stanovanja"
                  value={this.state.city}
                  onChange={this.handleChange('city')}
                  margin="normal"
                 />
                </div>
                <div>
                <TextField
                  id="standard-name"
                  label="Adresa stanovanja"
                  value={this.state.adress}
                  onChange={this.handleChange('adress')}
                  margin="normal"
                 />
                </div>
                <FormControlLabel
                    control={
                        <Switch
                        checked={this.state.checkedOwner}
                        onChange={this.handleChange2('checkedOwner')}
                        value="checkedOwner"
                        color="primary"
                        />
                    }
                    label="Vlasnik"
                /> 
                <div>
                    <p><font size="3">* Podaci su obavezni</font></p>
                </div>               
            </form>
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            <div className='error'><font color="green" size="3">{this.state.success}</font></div>
            </div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Registriraj se
                </Button>
            </Form>
            
            </Card>
        );
    }
}

UserForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserForm);
