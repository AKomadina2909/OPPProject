import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Form from "../Form/Form";
import Button from '@material-ui/core/Button';
import EditReservationForm from '../Form/EditReservationForm';
import {BrowserRouter, Switch, Route,Link} from 'react-router-dom';
import Card from "../Card/Card";
import CategoryForm from '../Form/CategoryForm';
import EditCategoryForm from '../Form/EditCategoryForm';
import MealForm from '../Form/MealForm';
import EditMealForm from '../Form/EditMealForm';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });
  

class OwnerCategoryTable extends Component{
    constructor(props) {
        super(props)
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this)
    }
    state={
        meals:[],
        selected: [],
        selectedMeal:null,
        adding:false,
        editing:false,
        selectedCategory:null,
        categories:[],
        restaurants:[],
        namerestaurant:'',

    };
    componentDidMount(){
        fetch('/restaurants')
        .then(data=>data.json())
        .then(restaurants=>this.setState({restaurants:restaurants}));
        


    };

    handleChange2 = name => event => {
        
        this.setState({
          [name]: event.target.value,
        });
        this.state.meals=[];
        fetch(`/meals/restaurant/${event.target.value}`)
        .then(data=>data.json())
        .then(meals=>this.setState({meals:meals}));
        this.setState({ success: ''});
    };

    isEmpty(){
      if(this.state.meals.length>0) return false;
      return true;

    };

    isSelectedMeals(){
      if(this.state.selected.length==1) return true;
      else return false;
    };

    
    addDisabled(){
        if(this.state.namerestaurant=='') return true;
        else return false;
    }

        
    onSubmit2=(e)=>{
        e.preventDefault();
        const data={
            meal:this.state.selected
        };
        const options={
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };

        {this.state.selected.map(id => {
          return fetch(`/meals/idMeal/${id}`,options)
          .then(response=>{
              if(response.ok){
                this.componentDidMount();
                this.setState({ selected: []});
                this.selectedMeal=null;
                fetch(`/meals/restaurant/${this.state.namerestaurant}`)
                .then(data=>data.json())
                .then(meals=>this.setState({meals:meals}));
              }
              else {
                  this.setState({ error: 'Podaci su neispravni'});
              } 
          })
      })}
    };
  

    add(){
        if(this.state.adding){
            this.setState({ adding: false});
            fetch(`/meals/restaurant/${this.state.namerestaurant}`)
                .then(data=>data.json())
                .then(meals=>this.setState({meals:meals}));
            this.setState({ selectedMeal: ''});
            this.setState({ selected: []});
        }
        else{
            this.setState({ adding: true});
            fetch(`/meals/restaurant/${this.state.namerestaurant}`)
                .then(data=>data.json())
                .then(meals=>this.setState({meals:meals}));
            this.setState({ selectedMeal: ''});
            this.setState({ selected: []});
        }
        this.componentDidMount();
    }

    edit(){
        if(this.state.editing){
            this.setState({ editing: false});
            fetch(`/meals/restaurant/${this.state.namerestaurant}`)
                .then(data=>data.json())
                .then(meals=>this.setState({meals:meals}));
            this.setState({ selectedMeal: ''});
            this.setState({ selected: []});
        }
        else{
            this.setState({ editing: true});
            fetch(`/meals/restaurant/${this.state.namerestaurant}`)
                .then(data=>data.json())
                .then(meals=>this.setState({meals:meals}));
        }
        this.componentDidMount();
    }




    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selected: newSelected });
        this.setState({selectedMeal:id})
      };

      isSelected = id => this.state.selected.indexOf(id) !== -1;

    render(){
        let optionItems = this.state.restaurants.map((restaurant) =>
                <option key={restaurant.nameRestaurant}>{restaurant.nameRestaurant}</option>
            );
        const { classes } = this.props;
        if(!this.state.adding && !this.state.editing){
            return (
                <Paper className={classes.root}>
                    <p><b>Popis proizvoda</b></p>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-native-simple">Ime restorana</InputLabel>
                    <Select
                        style = {{width: 150}}
                        native
                
                        value={this.state.namerestaurant}
                        onChange={this.handleChange2('namerestaurant')}
                        inputProps={{
                            namerestaurant: 'namerestaurant',
                        }} 
                    >
                    <option value="" disabled>
                    </option>
                    {optionItems}
                    </Select>
                    </FormControl>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Označeno</TableCell>
                        <TableCell align="right"><b>Ime kategorije</b></TableCell>
                        <TableCell align="right"><b>Ime proizvoda</b></TableCell>
                        <TableCell align="right"><b>Opis proizvoda</b></TableCell>
                        <TableCell align="right"><b>Cijena</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.meals.map(meal => {
                          const isSelected = this.isSelected(meal.idMeal);
                        return (
                          <TableRow key={meal.idMeal}
                            hover
                            onClick={event => this.handleClick(event, meal.idMeal)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            selected={isSelected}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={isSelected} />
                             </TableCell>
                            <TableCell align="right">{meal.idCategory.nameCategory}</TableCell>
                            <TableCell align="right">{meal.mealName}</TableCell>
                            <TableCell align="right">{meal.details}</TableCell>
                            <TableCell align="right">{meal.mealPrice} kn</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                <Form onSubmit={this.onSubmit2} >
                <Button type="submit" variant="contained" color="secondary" className={classes.button} >
                      Obriši označene
                </Button>
                </Form>
                <Form onSubmit={this.add} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.addDisabled()}>
                      Dodaj Proizvod
                </Button>
                </Form>
                <Form onSubmit={this.edit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!this.isSelectedMeals()} >
                      Izmijeni proizvod
                </Button>
                </Form>
                </Paper>
              ); 

        }
        else if(this.state.adding){
            return(
                <MealForm add={this.add} namerestaurant={this.state.namerestaurant} ></MealForm>

            );
            

        }
        else if(this.state.editing){
            return(
                <EditMealForm edit={this.edit} idMeal={this.state.selectedMeal}  namerestaurant={this.state.namerestaurant}></EditMealForm>
            );
        }
        else{
            return(
                <div>Greška</div>
            );
        }
        
        

    }
    
}

OwnerCategoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerCategoryTable);