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
  

class OrdersByRestaurantTable extends Component{
 
    state={
        restaurants:[],
        orders:[],
        ordersByRestaurant:'',
        nameRestaurant:'',
        restaurant:'',
        load:false,
        months:['1','2','3','4','5','6','7','8','9','10','11','12'],
        years:[],
        year:'',


    };
    componentDidMount(){
        fetch('/restaurants')
        .then(data=>data.json())
        .then(restaurants=>this.setState({restaurants:restaurants}));
    };

    
    isEmpty(){
        if(this.state.restaurants.length==0) return true;
        else return false;
    }
    getFrequency(name,year){
        const data={
            nameRestaurant:name,
            year:year,
        };
      const options={
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
      };
        fetch('/restaurants/ordersByRestaurant',options)
          .then(data=>data.json())
          .then(ordersByRestaurant=>this.setState({ordersByRestaurant:ordersByRestaurant}));
  
      }

      handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        if(event.target.value=='') return;
        fetch(`/meals/restaurant/${event.target.value}`)
        .then(data=>data.json())
        .then(orders=>this.setState({orders:orders}));
        fetch(`/restaurants/name/${event.target.value}`)
        .then(data=>data.json())
        .then(restaurant=>this.setState({restaurant:restaurant}));
        fetch(`/demandmeals/years/${event.target.value}`)
        .then(data=>data.json())
        .then(years=>this.setState({years:years}));

       
      };
      handleChange2 = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        if(event.target.value=='') return;
        this.getFrequency(this.state.nameRestaurant,event.target.value);
        this.setState({load:true});
      };



    render(){
        const { classes } = this.props;
        let optionRestaurants = this.state.restaurants.map((restaurant) =>
        <option key={restaurant.idRestaurant}>{restaurant.nameRestaurant}</option>
        );
        let optionYears = this.state.years.map((year) =>
        <option key={year}>{year}</option>
        );
        if(!this.isEmpty() && this.state.load==false){
        return (
            <Paper className={classes.root}>
            <p><h2>Broj narudžbi prema restoranu</h2></p>
                <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Restoran</InputLabel>
                        <Select
                            native
                            value={this.state.nameRestaurant}
                            onChange={this.handleChange('nameRestaurant')}
                            inputProps={{
                             restaurant: 'nameRestaurant',
                            }}
                        >
                         <option value="" />
                        {optionRestaurants}
                        </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Godina</InputLabel>
                        <Select
                            native
                            value={this.state.year}
                            onChange={this.handleChange2('year')}
                            inputProps={{
                             restaurant: 'year',
                            }}
                        >
                         <option value="" />
                        {optionYears}
                        </Select>
                </FormControl>
            

            </Paper>
          ); 
          }else if(!this.isEmpty() && this.state.load==true){
            return(
            <Paper className={classes.root}>
            <p><h2>Broj narudžbi prema restoranu</h2></p>
            <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Restoran</InputLabel>
                        <Select
                            native
                            value={this.state.nameRestaurant}
                            onChange={this.handleChange('nameRestaurant')}
                            inputProps={{
                             restaurant: 'nameRestaurant',
                            }}
                        >
                         <option value="" />
                        {optionRestaurants}
                        </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Godina</InputLabel>
                        <Select
                            native
                            value={this.state.year}
                            onChange={this.handleChange2('year')}
                            inputProps={{
                             restaurant: 'year',
                            }}
                        >
                         <option value="" />
                        {optionYears}
                        </Select>
                </FormControl>
            <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><b>Mjesec</b></TableCell>
                      <TableCell align="right"><b>Broj narudžbi</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.months.map(month => {
                      
                      return (
                        <TableRow key={month}>
                          <TableCell align="left">{month}</TableCell>
                          <TableCell align="right">{this.state.ordersByRestaurant[month]}</TableCell>
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
              <p><h2>Broj narudžbi prema restoranu</h2></p>
                <p>Podaci nisu dostupni</p>
            </div>
            );

          }
    }
    
}

OrdersByRestaurantTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersByRestaurantTable);