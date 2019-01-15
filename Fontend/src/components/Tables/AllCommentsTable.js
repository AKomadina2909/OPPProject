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
import Card from "../Card/Card";
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
  

class CommentTable extends Component{
    state={
        restaurantComments:[],
        orderComments:[],
        nameRestaurant:'',
        restaurants:[],

    };
    componentDidMount(){
      fetch('/restaurants').then(data=>data.json())
      .then(restaurants=>this.setState({restaurants:restaurants}));
    };

    restaurantSelected(name){
      fetch(`/restaurantreviews/restaurantname/${name}`)
        .then(data=>data.json())
        .then(restaurantComments=>this.setState({restaurantComments:restaurantComments}));
        fetch(`/mealreviews/restaurantname/${name}`)
        .then(data=>data.json())
        .then(orderComments=>this.setState({orderComments:orderComments}))
    }

    isOrderCommentsEmpty(){
      if(this.state.orderComments.length>0) return false;
      else return true;

    }
    

    isRestaurantCommentsEmpty(){
      if(this.state.restaurantComments.length>0) return false;
      else return true;
    }

    handleChange3 = name => event => {
      this.setState({
        [name]: event.target.value,
      });
      if(event.target.value=='') return;
      this.setState({nameRestaurant:event.target.value});
      this.restaurantSelected(event.target.value);
     
    };

    render(){
        const { classes } = this.props;
        let optionRestaurants = this.state.restaurants.map((restaurant) =>
        <option key={restaurant.idRestaurant}>{restaurant.nameRestaurant}</option>);
        if(this.state.nameRestaurant==''){
          return(
            <div>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <p><b>Odaberite restoran</b></p>
                </div>
                
                <div className={classes.root} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Restoran</InputLabel>
                        <Select
                            native
                            value={this.state.nameRestaurant}
                            onChange={this.handleChange3('nameRestaurant')}
                            inputProps={{
                             restaurant: 'nameRestaurant',
                            }}
                        >
                         <option value="" />
                        {optionRestaurants}
                        </Select>
                    </FormControl>
                </div>
                
                
                
            </div>
           


          );
        }
        if(!this.isOrderCommentsEmpty() && !this.isRestaurantCommentsEmpty()){
        return (
          <div>
            <Paper className={classes.root}>
              <p><h2>Osvrti na restorane</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                    <TableCell align="right"><b>Klijent</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.restaurantComments.map(restaurantComment => {

                    return (
                      <TableRow key={restaurantComment.idRestaurantReview}
                        hover
                        >
                        
                        <TableCell align="right">{restaurantComment.review}</TableCell>
                        <TableCell align="right">{restaurantComment.description}</TableCell>
                        <TableCell align="right">{restaurantComment.reply}</TableCell>
                        <TableCell align="right">{restaurantComment.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{restaurantComment.idUser.userName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
           
            </Paper>

            <Paper className={classes.root}>
              <p><h2>Osvrti na narudžbe</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                   
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Datum narudžbe</b></TableCell>
                    <TableCell align="right"><b>Vrijeme narudžbe</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell> 
                    <TableCell align="right"><b>Klijent</b></TableCell>
                    <TableCell align="right"><b>Proizvodi</b></TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderComments.map(orderComment => {
                      
                    return (
                      <TableRow key={orderComment.idMealReview}
                        hover
                      >
                         
                        <TableCell align="right">{orderComment.review}</TableCell>
                        <TableCell align="right">{orderComment.description}</TableCell>
                        <TableCell align="right">{orderComment.reply}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.dateOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.timeOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idTable}</TableCell>
                        <TableCell align="right">{orderComment.idUser.userName}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.meals.map(meal => {
                         return (
                             <text>{meal.mealName}, </text>
                        );
                         })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            
            </Paper>
            </div>
          ); 
          }
          else if(!this.isOrderCommentsEmpty() && this.isRestaurantCommentsEmpty()){
            return(
            <Paper className={classes.root}>
              <p><h2>Osvrti na narudžbe</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                   
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Datum narudžbe</b></TableCell>
                    <TableCell align="right"><b>Vrijeme narudžbe</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell>
                    <TableCell align="right"><b>Klijent</b></TableCell> 
                    <TableCell align="right"><b>Proizvodi</b></TableCell> 
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderComments.map(orderComment => {
                 
                    return (
                      <TableRow key={orderComment.idMealReview}
                        hover
                       >
                      
                        <TableCell align="right">{orderComment.review}</TableCell>
                        <TableCell align="right">{orderComment.description}</TableCell>
                        <TableCell align="right">{orderComment.reply}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.dateOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.timeOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idTable}</TableCell>
                        <TableCell align="right">{orderComment.idUser.userName}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.meals.map(meal => {
                         return (
                             <text>{meal.mealName}, </text>
                        );
                         })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
           
            </Paper>
            );


          }
          else if(this.isOrderCommentsEmpty() && !this.isRestaurantCommentsEmpty()){
            return(
            <Paper className={classes.root}>
              <p><h2>Osvrti na restorane</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                   
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                    <TableCell align="right"><b>Klijent</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.restaurantComments.map(restaurantComment => {
                     
                    return (
                      <TableRow key={restaurantComment.idRestaurantReview}
                        hover
                       >
                     
                        <TableCell align="right">{restaurantComment.review}</TableCell>
                        <TableCell align="right">{restaurantComment.description}</TableCell>
                        <TableCell align="right">{restaurantComment.reply}</TableCell>
                        <TableCell align="right">{restaurantComment.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{restaurantComment.idUser.userName}</TableCell>
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
            <Card>
            <p><b>Trenutno nema dostupnih osvrta</b></p>
            </Card>
            );
          }
    }
    
}

CommentTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentTable);