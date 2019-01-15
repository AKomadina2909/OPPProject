import React,{Component} from 'react';
import '../Form/UserForm.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Form from "../Form/Form";
import Card from "../Card/Card";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
    root: {
        display: 'flex',
      },
      formControl: {
        margin: theme.spacing.unit * 3,
      },
      group: {
        margin: `${theme.spacing.unit}px 0`,
      },
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });

class CommentsPage extends React.Component{
    state ={
        description:"",
        reply:"",
        review:null,
        error:'',
        selectedStatus:'',
        success:'',
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            idOrder:this.props.idOrder,
            review:this.state.review,
            description:this.state.description,
            reply:this.state.reply,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/mealreviews',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ error: ''});
                    this.setState({ success: 'Osvrt uspješno ostavljen'});
                    this.setState({ reply: ''});
                    this.setState({ description: ''});
                    this.props.end();
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            })
    };

    render(){
        const { classes } = this.props;
        return(
            <Card>
            <div className='UserForm' >
            <p><b>Osvrt na narudžbu</b></p>
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Osvrt"
                    multiline
                    rowsMax="5"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                </div>
            </form>
                <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Ocjena</FormLabel>
                    <RadioGroup
                            aria-label="Ocjena"
                            name="ocjena"
                            className={classes.group}
                            value={this.state.review}
                            onChange={this.handleChange('review')}
                    >
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="4" control={<Radio />} label="4" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    </RadioGroup>
                </FormControl> 
                </div>  
         
            
            
            <div className='error'><font color="red" size="3">{this.state.error}</font></div>
            <div className='error'><font color="green" size="3">{this.state.success}</font></div>
            </div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Ostavi osvrt
                </Button>
            </Form>
            </Card> 
            
           
             
        );
    }
}

CommentsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentsPage);
