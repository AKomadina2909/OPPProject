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

class EditMealForm extends React.Component{

    state ={
        idMeal:this.props.idMeal,
        mealName:'',
        details:'',
        mealPrice:'',
        idCategory:'',
        categories:[],
        nameCategory:'',
        selectedCategory:'',
    };

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };

    handleChange2 = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        fetch(`/categories/name/${event.target.value}`)
        .then(data=>data.json())
        .then(category=>this.setState({idCategory:category.idCategory}))
      };

    componentDidMount(){
        fetch(`/meals/id/${this.state.idMeal}`)
        .then(data=>data.json())
        .then(meal=>this.setState({mealName:meal.mealName, details:meal.details, extra:meal.extra, mealPrice:meal.mealPrice, idCategory:meal.idCategory.idCategory, nameCategory:meal.idCategory.nameCategory}));
        fetch(`/categories/restaurant/${this.props.namerestaurant}`)
        .then(data=>data.json())
        .then(categories=>this.setState({categories:categories}))

    };

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            idMeal:this.state.idMeal,
            mealName:this.state.mealName,
            details:this.state.details,
            extra:this.state.extra,
            mealPrice:this.state.mealPrice,
            idCategory:this.state.idCategory,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/meals/update',options)
            .then(response=>{
                if(response.ok){
                   this.props.edit();
                }
                else {
                    this.setState({ error: 'Podaci su neispravni'});
                } 
            })
    };

    render(){
        const { classes } = this.props;
        let optionItems = this.state.categories.map((category) =>
                <option key={category.nameCategory}>{category.nameCategory}</option>
        );
        return(
            <Card>
            <div className='UserForm'>
            <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Kategorija*</InputLabel>
                    <Select
                        native
                        value={this.state.nameCategory}
                        onChange={this.handleChange2('nameCategory')}
                        inputProps={{
                            nameCategory: 'nameCategory',
                        }}
                    >
                     <option value="" />
                    {optionItems}
                    </Select>
            </FormControl>
            <form onSubmit={this.onSubmit}  noValidate autoComplete="off">
              <div> 
                <TextField
                  id="standard-name"
                  label="Ime proizvoda*"
                  value={this.state.mealName}
                  onChange={this.handleChange('mealName')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}  
                 />
                </div>
                <div> 
                <TextField
                  id="standard-name"
                  label="Opis proizvoda"
                  multiline
                    rowsMax="5"
                  value={this.state.details}
                  onChange={this.handleChange('details')}
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}  
                 />
                </div>
                
                <div> 
                <TextField
                  id="standard-name"
                  label="Cijena proizvoda"
                  value={this.state.mealPrice}
                  onChange={this.handleChange('mealPrice')}
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
            </div>
            <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Izmijeni proizvod
                </Button>
            </Form>
            
            </Card>
        );
    }
}

EditMealForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditMealForm);
