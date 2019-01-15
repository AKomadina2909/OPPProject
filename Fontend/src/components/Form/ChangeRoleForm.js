import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "./Form";
import Card from "../Card/Card";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
    
  });

class EditCategoryForm extends React.Component{

    state ={
        user:this.props.user,
        idUser:this.props.user.idUser,
        role:this.props.user.role,
        error:'',
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };


    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            username:this.state.user.userName,
            role:this.state.role,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/users/changeRole',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ error: ''});
                    this.props.end();
                   
                }
                else {
                    this.setState({ error: 'Podaci su neispravni'});
                } 
            })
    };

    render(){
        const { classes } = this.props;
        return(
            <Card>
                <p>Odaberite novu razinu ovlasti za korisnika: {this.state.user.userName}</p>
            <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Razina ovlasti</InputLabel>
                    <Select
                        native
                        value={this.state.role}
                        onChange={this.handleChange('role')}
                        inputProps={{
                            role: 'role',
                        }}
                        style = {{width: 150}}
                    >
                     <option value="klijent">Klijent</option>
                     <option value="vlasnik">Vlasnik</option>
                     <option value="zaposlenik">Zaposlenik</option>
                     <option value="administrator">Administrator</option>
                    
                    </Select>
            </FormControl>
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Izmijeni razinu ovlasti
                </Button>
            </Form>
            
            </Card>
        );
    }
}

EditCategoryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditCategoryForm);
