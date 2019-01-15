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
  

class ReservationsSelectTable extends Component{
  constructor(props) {
    super(props)
    this.end = this.end.bind(this)
}
    state={
        reservations:[],
        selected: [],
        selectedReservation:null,
        change:false,
        reservationobject:null,

    };
    componentDidMount(){
        fetch('/reservations/username')
        .then(data=>data.json())
        .then(data=>this.setState({reservations:data}))

    };

    isEmpty(){
      if(this.state.reservations.length>0) return false;
      return true;

    };

    isSelectedReservation(){
      if(this.state.selected.length>0) return true;
      else return false;
    };

  
        
    onSubmit2=(e)=>{
        e.preventDefault();
        const data={
            reservations:this.state.selected
        };
        const options={
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/reservations/selected',options)
            .then(response=>{
                if(response.ok){
                  this.componentDidMount();
                  this.setState({ selected: []});
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                } 
            });
    };
    onSubmit3=(e)=>{
      e.preventDefault();
      this.setState({ change: true});
    };

    editbuttondisabled(){
      if(this.state.selected.length==1) return false;
      else return true;
    }

    end(){
      this.componentDidMount();
      this.setState({ change: false});
      this.setState({ selected: []});
      this.setState({ selectedReservation: ''});
    };

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
        this.setState({selectedReservation:id})
        this.setState({editbuttondisabled:false})
        fetch(`/reservations/id/${id}`)
        .then(data=>data.json())
        .then(reservationobject => this.setState({reservationobject:reservationobject}))

      };

      isSelected = id => this.state.selected.indexOf(id) !== -1;

    render(){
        const { classes } = this.props;
        if(!this.isEmpty()  && this.state.change==false){
        return (
            <Paper className={classes.root}>
            <p><h2>Popis rezervacija</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Označeno</TableCell>
                    <TableCell align="right"><b>Datum Rezervacije</b></TableCell>
                    <TableCell align="right"><b>Vrijeme Rezervacije</b></TableCell>
                    <TableCell align="right"><b>Ime restorana</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.reservations.map(reservation => {
                      const isSelected = this.isSelected(reservation.idReservation);
                    return (
                      <TableRow key={reservation.idReservation}
                        hover
                        onClick={event => this.handleClick(event, reservation.idReservation)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                         </TableCell>
                        <TableCell align="right">{reservation.dateReservation}</TableCell>
                        <TableCell align="right">{reservation.timeReservation}</TableCell>
                        <TableCell align="right">{reservation.idTable.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{reservation.idTable.idTable}</TableCell>
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
            <Form onSubmit={this.onSubmit3} >
              <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.editbuttondisabled()} >
                  Izmijeni
              </Button>
              </Form>
            </Paper>
          ); 
          }
         
          else if(this.state.change==true){
           
            return(
              <EditReservationForm reservation={this.state.selectedReservation} end={this.end} reservationobject={this.state.reservationobject}></EditReservationForm>


            );
          }
          
          else if(this.isEmpty()){
            return(
              <Card>
              <p><b>Trenutno nema dostupnih rezervacija</b></p>
              </Card>
            )
          }
          else{
            return(
              <Card>
              <p><b>Pojavila se greška</b></p>
              </Card>
            )
          }
    }
    
}

ReservationsSelectTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReservationsSelectTable);