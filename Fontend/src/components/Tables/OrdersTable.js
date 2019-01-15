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


class OrdersTable extends Component{
  
  constructor(props) {
    super(props)
    this.end = this.end.bind(this)
}
  
    state={
        orders:[],
        selectedstatus:'',
        selectedMeal: null,
        selectedRestaurant: null,
        description:"",
        reply:"",
        review:null,
        idRestaurant:null,
        error:'',
        buttondisable:true,
        comment:false,

    };
    componentDidMount(){
        fetch(`/demandmeals/user/${this.props.username}`)
        .then(data=>data.json())
        .then(orders=>this.setState({orders:orders}))
    };

    comment=(e)=>{
      e.preventDefault();
      this.setState({ comment: true});
    };

    disabledcommentbutton(){
      if(this.state.selectedMeal==null) return true;
      else if(this.state.selectedstatus=='priprema'){
        return true;
      }else return false;
      
    }

    end(){
      this.setState({ comment: false});
      this.setState({ selectedMeal: null});
      this.setState({ selectedRestaurant: null});


    }
  
    handleClick = (event, idMeal,idRestaurant,status) => {  
      this.setState({ selectedstatus: status });
        this.setState({ selectedMeal: idMeal });
        this.setState({ selectedRestaurant: idRestaurant });
        this.state.buttondisable=false;
      };

      isSelected = (id) => this.state.selectedMeal===id;
      isSelected2 = (id) => this.state.selectedRestaurant===id;

  

    render(){
        const { classes } = this.props;
        if(!this.state.comment){
        return (
            <Paper className={classes.root}>
            <p><h2>Popis narudžbi</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right"><b>Status</b></TableCell>
                    <TableCell align="right"><b>Datum</b></TableCell>
                    <TableCell align="right"><b>Vrijeme</b></TableCell>
                    <TableCell align="right"><b>Ukupna cijena</b></TableCell>
                    <TableCell align="right"><b>Ime restorana</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell>
                    <TableCell align="right"><b>Proizvodi</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orders.map(order => {
                      const isSelectedMeal = this.isSelected(order.idOrder);
                    return (
                      <TableRow key={order.idOrder}
                        hover
                        onClick={event => this.handleClick(event, order.idOrder,order.idTable.idRestaurant.idRestaurant,order.status)}
                        role="checkbox"
                        tabIndex={-1}
                        selected={isSelectedMeal}>
                        <TableCell align="right">{order.status}</TableCell>
                        <TableCell align="right">{order.dateOrder}</TableCell>
                        <TableCell align="right">{order.timeOrder}</TableCell>
                        <TableCell align="right">{order.priceOrder} kn</TableCell>
                        <TableCell align="right">{order.idTable.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{order.idTable.idTable}</TableCell>
                        <TableCell align="right">{order.meals.map(meal => {
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
              <Form onSubmit={this.comment} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.disabledcommentbutton()}>
                  Ostavi osvrt
                </Button>
              </Form>
              <div  className='error'><font  size="2">Moguće je ocijeniti samo gotove narudžbe</font></div>

            </Paper>
          ); 
          }
          
          else if(this.state.comment){
            return(
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <RestaurantCommentForm idRestaurant={this.state.selectedRestaurant} end={this.end}></RestaurantCommentForm>
                <MealCommentForm idOrder={this.state.selectedMeal}  end={this.end}></MealCommentForm>
    
              </div>
              
            );

          }
          else{
            return(<p>Pojavila se greška</p>);

          }
    }
    
}

OrdersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersTable);