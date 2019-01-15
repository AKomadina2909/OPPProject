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
import OrdersByUserTable from './OrdersByUserTable';
import OrdersByRestaurantTable from './OrdersByRestaurantTable';
import MostPopularMealsTable from './MostPopularMealsTable';
import MoneyByRestaurant from './MoneyByRestaurantTable';

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
  

class Statistics extends Component{
 



    render(){
        const { classes } = this.props;
        return (
            <div>
              
               <OrdersByUserTable></OrdersByUserTable>
               <OrdersByRestaurantTable></OrdersByRestaurantTable>
               <MostPopularMealsTable></MostPopularMealsTable>
               <MoneyByRestaurant></MoneyByRestaurant>
               
               
               </div>
          ); 
          }
          
    
}

Statistics.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Statistics);