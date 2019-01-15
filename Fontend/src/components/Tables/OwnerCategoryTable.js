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
import CategoryForm from '../Form/CategoryForm';
import EditCategoryForm from '../Form/EditCategoryForm';


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
  

class OwnerCategoryTable extends Component{
    constructor(props) {
        super(props)
        this.add = this.add.bind(this)
        this.edit = this.edit.bind(this)
    }
    state={
        categories:[],
        selected: [],
        selectedCategory:null,
        adding:false,
        editing:false,

    };
    componentDidMount(){
        fetch(`/categories/restaurant/${this.props.namerestaurant}`)
        .then(data=>data.json())
        .then(categories=>this.setState({categories:categories}))

    };

    isEmpty(){
      if(this.state.categories.length>0) return false;
      return true;

    };

    isSelectedCategory(){
      if(this.state.selected.length==1) return true;
      else return false;
    };

        
    onSubmit2=(e)=>{
        e.preventDefault();
        const data={
            category:this.state.selected
        };
        const options={
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };

        {this.state.selected.map(id => {
          return fetch(`/categories/id/${id}`,options)
          .then(response=>{
              if(response.ok){
                this.componentDidMount();
                this.setState({ selected: []});
                this.selectedCategory=null;
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
        this.setState({selectedCategory:id})
      };

      isSelected = id => this.state.selected.indexOf(id) !== -1;

    render(){
        const { classes } = this.props;
        if(!this.state.adding && !this.state.editing){
            return (
                <Paper className={classes.root}>
                    <p><b>Popis kategorija</b></p>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Označeno</TableCell>
                        <TableCell align="right"><b>Ime kategorije</b></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.categories.map(category => {
                          const isSelected = this.isSelected(category.idCategory);
                        return (
                          <TableRow key={category.idCategory}
                            hover
                            onClick={event => this.handleClick(event, category.idCategory)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            selected={isSelected}>
                            <TableCell padding="checkbox">
                                <Checkbox checked={isSelected} />
                             </TableCell>
                            <TableCell align="right">{category.nameCategory}</TableCell>
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
                      Dodaj kategoriju
                </Button>
                </Form>
                <Form onSubmit={this.edit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!this.isSelectedCategory()} >
                      Izmijeni kategoriju
                </Button>
                </Form>
                </Paper>
              ); 

        }
        else if(this.state.adding){
            return(
                <CategoryForm add={this.add} ></CategoryForm>

            );
            

        }
        else if(this.state.editing){
            return(
                <EditCategoryForm edit={this.edit} idCategory={this.state.selectedCategory}></EditCategoryForm>
            );
        }
        else{
            return(
                <div>Greška</div>
            );
        }
        
        

    }
    
}

OwnerCategoryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerCategoryTable);