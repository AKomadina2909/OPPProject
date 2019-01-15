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

class UserForm extends React.Component{



    state ={
        date:null,
        time:null,
        table:null
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            dateReservation:this.state.date,
            timeReservation:this.state.time,
            idTable:this.state.table
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/reservations',options)
            .then(response=>{
                if(response.ok){
                    this.props.history.push('/');
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                } 
            })
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
                  label="Datum*"
                  value={this.state.date}
                  onChange={this.handleChange('date')}
                  margin="normal"
                 />
                </div>
                 <TextField
                  id="standard-name"
                  label="Vrijeme*"
                  value={this.state.time}
                  onChange={this.handleChange('time')}
                  margin="normal"
                  type="password"
                 />
                 <div>
                <TextField
                  id="standard-name"
                  label="Broj stola*"
                  value={this.state.table}
                  onChange={this.handleChange('table')}
                  margin="normal"
                 />
                </div>
                <div>
                    <p><font size="3">* Podaci su obavezni</font></p>
                </div>               
            </form>
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            </div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Rezerviraj
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
