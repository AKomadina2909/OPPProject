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

class CategoryForm extends React.Component{



    state ={
        nameCategory:'',
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            nameCategory:this.state.nameCategory,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/categories',options)
            .then(response=>{
                if(response.ok){
                   this.props.add();
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
            <div className='UserForm'>
            
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div>
                  
                <TextField
                  id="standard-name"
                  label="Ime kategorije*"
                  value={this.state.nameCategory}
                  onChange={this.handleChange('nameCategory')}
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
                  Dodaj kategoriju
                </Button>
            </Form>
            
            </Card>
        );
    }
}

CategoryForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CategoryForm);
