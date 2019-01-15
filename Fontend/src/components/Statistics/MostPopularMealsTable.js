import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Form from "../Form/Form";
import Button from '@material-ui/core/Button';
import MealCommentForm from '../Form/MealCommentForm';
import RestaurantCommentForm from '../Form/RestaurantCommentForm';
import '../../App.css';
import ChangeRoleForm from '../Form/ChangeRoleForm';

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
  

class MostPopularMealsTable extends Component{

    state={
        meals:[],
        mealFrequency:'',


    };
    componentDidMount(){
        fetch('/meals')
        .then(data=>data.json())
        .then(meals=>this.setState({meals:meals}));
        fetch('/meals/mostpopular')
        .then(data=>data.json())
        .then(mealFrequency=>this.setState({mealFrequency:mealFrequency}));

    };

   
    isEmpty(){
        if(this.state.meals.length==0) return true;
        else return false;
    }



    render(){
        const { classes } = this.props;
        if(!this.isEmpty()){
        return (
            <Paper className={classes.root}>
            <p><h2>Najpopularniji proizvodi</h2></p>
            <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><b>Ime proizvoda</b></TableCell>
                      <TableCell align="right"><b>Ime kategorije</b></TableCell>
                      <TableCell align="right"><b>Ime restorana</b></TableCell>
                      <TableCell align="right"><b>Broj naručivanja</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.meals.map(meal => {
                      return (
                        <TableRow key={this.state.mealFrequency[meal.mealName]}>
                          <TableCell align="left">{meal.mealName}</TableCell>
                          <TableCell align="right">{meal.idCategory.idCategory}</TableCell>
                          <TableCell align="right">{meal.idCategory.idRestaurant.nameRestaurant}</TableCell>
                          <TableCell align="right">{this.state.mealFrequency[meal.mealName]}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

            </Paper>
          ); 
          }
          
          else{
            return( <div>
            <p><h2>Najpopularniji proizvodi</h2></p>
            <p>Podaci nisu dostupni</p>
            </div>
            );

          }
    }
    
}

MostPopularMealsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MostPopularMealsTable);