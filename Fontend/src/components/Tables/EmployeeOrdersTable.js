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
import Card from "../Card/Card";

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
  

class EmployeeOrdersTable extends Component{
    state={
        orders:[],
        selectedOrder: null,
        description:"",
        reply:"",
        review:null,
        idRestaurant:null,
        error:'',

    };
    componentDidMount(){
        fetch(`/demandmeals/restaurant/${this.props.idRestaurant}`)
        .then(data=>data.json())
        .then(orders=>this.setState({orders:orders}))
    };

    disabledlockbutton(){
      if(this.state.selectedOrder==null) return true;
      else return false;
    }

    lock=(e)=>{
      e.preventDefault();
      const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
      };
      fetch(`/demandmeals/lock/${this.state.selectedOrder}`,options)
        .then(response=>{
          if(response.ok){
            this.componentDidMount();
            this.setState({ selectedOrder: null });
          }
          if (response.status === 400) {
            this.setState({ error: 'Podaci su neispravni'});
          } 
        })
      

    };
    isEmpty(){
      if(this.state.orders.length==0) return true;
      else return false;
    }
  
    handleClick = (event, selectedOrder) => {  
        this.setState({ selectedOrder: selectedOrder });
      };

      isSelected = (id) => this.state.selectedOrder===id;



  

    render(){
        const { classes } = this.props;

        if(!this.isEmpty()){
      
        return (
            <Paper className={classes.root}>
            <p><b>Popis narudžbi</b></p>
            <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right"><b>Jedinstveni broj narudžbe</b></TableCell>
                      <TableCell align="right"><b>Status</b></TableCell>
                      <TableCell align="right"><b>Datum</b></TableCell>
                      <TableCell align="right"><b>Vrijeme</b></TableCell>
                      <TableCell align="right"><b>Ukupna cijena</b></TableCell>
                      <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell>
                      <TableCell align="right"><b>Proizvodi</b></TableCell>
                      <TableCell align="right"><b>Ime klijenta</b></TableCell>
                      <TableCell align="right"><b>Prezime klijenta</b></TableCell>
                      <TableCell align="right"><b>Email klijenta</b></TableCell>
                      <TableCell align="right"><b>Broj telefona klijenta</b></TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.orders.map(order => {
                        const isSelectedMeal = this.isSelected(order.idOrder);
                      return (
                        <TableRow key={order.idOrder}
                          hover
                          onClick={event => this.handleClick(event, order.idOrder)}
                          role="checkbox"
                          tabIndex={-1}
                          selected={isSelectedMeal}>
                          <TableCell align="right">{order.idOrder}</TableCell>
                          <TableCell align="right">{order.status}</TableCell>
                          <TableCell align="right">{order.dateOrder}</TableCell>
                          <TableCell align="right">{order.timeOrder}</TableCell>
                          <TableCell align="right">{order.priceOrder} kn</TableCell>
                          <TableCell align="right">{order.idTable.idTable}</TableCell>
                          <TableCell align="right">{order.meals.map(meal => {
                           return (
                               <text>{meal.mealName}, </text>
                          );
                           })}
                          </TableCell>
                          <TableCell align="right">{order.idUser.name}</TableCell>
                          <TableCell align="right">{order.idUser.surname}</TableCell>
                          <TableCell align="right">{order.idUser.email}</TableCell>
                          <TableCell align="right">{order.idUser.mobilePhone}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              <Form onSubmit={this.lock} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.disabledlockbutton()}>
                  Zaključaj narudžbu
                </Button>
              </Form>

            </Paper>
          ); 
          }
        else if(this.isEmpty()){
          return(
            <Card>
            <p><b>Trenutno nema dostupnih narudžbi</b></p>
            </Card>
          );
        }        
    
    }
    
}

EmployeeOrdersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeOrdersTable);