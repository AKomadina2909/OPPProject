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
  

class OrdersByUSerTable extends Component{
 
    state={
        clients:[],
        orders:[],
        ordersByUser:'',


    };
    componentDidMount(){
        fetch('/users/clients')
        .then(data=>data.json())
        .then(clients=>this.setState({clients:clients}));
        fetch('/users/ordersByUser')
        .then(data=>data.json())
        .then(ordersByUser=>this.setState({ordersByUser:ordersByUser}));
        
    };

    
    isEmpty(){
        if(this.state.clients.length==0) return true;
        else return false;
    }



    render(){
        const { classes } = this.props;
        if(!this.isEmpty()){
        return (
            <Paper className={classes.root}>
            <p><h2>Broj narudžbi prema klijentu</h2></p>
            <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><b>Korisničko ime</b></TableCell>
                      <TableCell align="right"><b>Ime</b></TableCell>
                      <TableCell align="right"><b>Prezime</b></TableCell>
                      <TableCell align="right"><b>Broj narudžbi</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.clients.map(client => {
                      
                      return (
                        <TableRow key={client.idUser}>
                          <TableCell align="left">{client.userName}</TableCell>
                          <TableCell align="right">{client.name}</TableCell>
                          <TableCell align="right">{client.surname}</TableCell>
                          <TableCell align="right">{this.state.ordersByUser[client.userName]}</TableCell>
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
              <p><h2>Broj narudžbi prema klijentu</h2></p>
                <p>Podaci nisu dostupni</p>
            </div>
            );

          }
    }
    
}

OrdersByUSerTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrdersByUSerTable);