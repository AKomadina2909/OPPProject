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
  

class MoneyByRestaurantTable extends Component{
 
    state={
        restaurants:[],
        moneyByRestaurant:'',


    };
    componentDidMount(){
        fetch('/restaurants')
        .then(data=>data.json())
        .then(restaurants=>this.setState({restaurants:restaurants}));
        fetch('/restaurants/moneyByRestaurant')
        .then(data=>data.json())
        .then(moneyByRestaurant=>this.setState({moneyByRestaurant:moneyByRestaurant}));
        
    };

    
    isEmpty(){
        if(this.state.restaurants.length==0) return true;
        else return false;
    }



    render(){
        const { classes } = this.props;
        if(!this.isEmpty()){
        return (
            <Paper className={classes.root}>
            <p><h2>Zarada prema restoranu</h2></p>
            <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><b>Ime restorana</b></TableCell>
                      <TableCell align="right"><b>Ukupna zarada</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.restaurants.map(restaurant => {
                      
                      return (
                        <TableRow key={restaurant.idRestaurant}>
                          <TableCell align="left">{restaurant.nameRestaurant}</TableCell>
                          <TableCell align="right">{this.state.moneyByRestaurant[restaurant.nameRestaurant]} kn</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

            </Paper>
          ); 
          }
          
          else{
            return(
              <div>
              <p><h2>Zarada prema restoranu</h2></p>
                <p>Podaci nisu dostupni</p>
            </div>
            );

          }
    }
    
}

MoneyByRestaurantTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MoneyByRestaurantTable);