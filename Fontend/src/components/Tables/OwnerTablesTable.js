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
import TableForm from '../Form/TableForm';
import EditTableForm from '../Form/EditTableForm';

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
  

class OwnerTablesTable extends Component{
    constructor(props) {
        super(props)
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this)
    }
    state={
        tables:[],
        selected: [],
        selectedTable:null,
        adding:false,
        editing:false,

    };
    componentDidMount(){
        fetch(`/tables/restaurant/${this.props.namerestaurant}`)
        .then(data=>data.json())
        .then(tables=>this.setState({tables:tables}))

    };

    isEmpty(){
      if(this.state.tables.length>0) return false;
      return true;

    };

    isSelectedTable(){
      if(this.state.selected.length==1) return true;
      else return false;
    };

        
    onSubmit2=(e)=>{
        e.preventDefault();
        const data={
            tables:this.state.selected
        };
        const options={
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };

        {this.state.selected.map(id => {
          return fetch(`/tables/id/${id}`,options)
          .then(response=>{
              if(response.ok){
                this.componentDidMount();
                this.setState({ selected: []});
                this.selectedTable=null;
              }
              else {
                  this.setState({ error: 'Podaci su neispravni'});
              } 
          })
      })}
    };
  

    add(){
        if(this.state.adding){
            this.setState({ adding: false});
        }
        else{
            this.setState({ adding: true});
        }
        this.componentDidMount();
    }

    edit(){
        if(this.state.editing){
            this.setState({ editing: false});
        }
        else{
            this.setState({ editing: true});
        }
        this.componentDidMount();
    }




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
        this.setState({selectedTable:id})
      };

      isSelected = id => this.state.selected.indexOf(id) !== -1;

    render(){
        const { classes } = this.props;
        if(!this.state.adding && !this.state.editing){
            return (
                <Paper className={classes.root}>
                    <p><b>Popis stolova</b></p>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Označeno</TableCell>
                        <TableCell align="left"><b>Jedinstveni broj stola</b></TableCell>
                        <TableCell align="right"><b>Kapacitet</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.tables.map(table => {
                          const isSelected = this.isSelected(table.idTable);
                        return (
                          <TableRow key={table.idTable}
                            hover
                            onClick={event => this.handleClick(event, table.idTable)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            selected={isSelected}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={isSelected} />
                             </TableCell>
                            <TableCell align="left">{table.idTable}</TableCell>
                            <TableCell align="right">{table.capacity}</TableCell>
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
                <Form onSubmit={this.add} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} >
                      Dodaj stol
                </Button>
                </Form>
                <Form onSubmit={this.edit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!this.isSelectedTable()} >
                      Izmijeni stol
                </Button>
                </Form>
                </Paper>
              ); 

        }
        else if(this.state.adding){
            return(
                <TableForm add={this.add} ></TableForm>

            );
            

        }
        else if(this.state.editing){
            return(
                <EditTableForm edit={this.edit} idTable={this.state.selectedTable}></EditTableForm>
            );
        }
        else{
            return(
                <div>Greška</div>
            );
        }
        
        

    }
    
}

OwnerTablesTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerTablesTable);