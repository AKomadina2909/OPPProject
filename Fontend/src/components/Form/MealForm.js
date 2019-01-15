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

class MealForm extends React.Component{



    state ={
        mealName:'',
        details:'',
        mealPrice:'',
        idCategory:'',
        categories:[],
        nameCategory:'',
        selectedCategory:null,
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
        .then(selectedCategory=>this.setState({selectedCategory:selectedCategory}))
      };

      componentDidMount(){
        fetch(`/categories/restaurant/${this.props.namerestaurant}`)
        .then(data=>data.json())
        .then(categories=>this.setState({categories:categories}))

    };

    

    onSubmit=(e)=>{
        e.preventDefault();
        const data={
            mealName:this.state.mealName,
            details:this.state.details,
            mealPrice:this.state.mealPrice,
            idCategory:this.state.selectedCategory.idCategory,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/meals',options)
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
                 />
                </div>
                <div> 
                <TextField
                  id="standard-name"
                  label="Cijena(u kunama,npr. 50)"
                  value={this.state.mealPrice}
                  onChange={this.handleChange('mealPrice')}
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
                  Dodaj proizvod
                </Button>
            </Form>
            
            </Card>
        );
    }
}

MealForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MealForm);
