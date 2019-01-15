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
  

class OwnerReservationsTable extends Component{
    state={
        reservations:[],
        idRestaurant:this.props.idRestaurant,

    };
    componentDidMount(){
        fetch(`/reservations/restaurant/${this.props.idRestaurant}`)
        .then(data=>data.json())
        .then(reservations=>this.setState({reservations:reservations}))
    };

  

    render(){
        const { classes } = this.props;
            return (
              <Paper className={classes.root}>
              <p><b>Popis rezervacija</b></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="right"><b>Ime klijenta</b></TableCell>
                    <TableCell align="right"><b>Prezime klijenta</b></TableCell>
                    <TableCell align="right"><b>Datum Rezervacije</b></TableCell>
                    <TableCell align="right"><b>Vrijeme Rezervacije</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell>
                    <TableCell align="right"><b>Broj telefona klijenta</b></TableCell>
                    <TableCell align="right"><b>Email klijenta</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.reservations.map(reservation => {
                    return (
                      <TableRow key={reservation.idReservation}
                        hover
                        >
                        <TableCell align="right">{reservation.idUser.name}</TableCell>
                        <TableCell align="right">{reservation.idUser.surname}</TableCell>
                        <TableCell align="right">{reservation.dateReservation}</TableCell>
                        <TableCell align="right">{reservation.timeReservation}</TableCell>
                        <TableCell align="right">{reservation.idTable.idTable}</TableCell>
                        <TableCell align="right">{reservation.idUser.mobilePhone}</TableCell>
                        <TableCell align="right">{reservation.idUser.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
            ); 
    }
    
}

OwnerReservationsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerReservationsTable);