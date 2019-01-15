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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
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
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
  });
  

class OrderForm extends Component{
    state={
       idTable:null,
       meals:[],
       selectedmeals:[],
       tables:[],
       restaurant:'',
       restaurants:[],
       error:'',
       success:'',
       tablerror:'',
       orderedmeals:[],
       selectedmealnames:[],
       check:false,
       mapa:'',
       totalPrice:'',
       buttondisabled:true,



    };

    componentDidMount(){
      fetch('/tables')
      .then(data=>data.json())
      .then(tables=>this.setState({tables:tables}));
    };

    onSubmit2=(e)=>{
      e.preventDefault();
      {this.state.selectedmeals.map(meal => {
        this.state.orderedmeals.push(meal);
      })}
      this.setState({ success: 'Proizvod uspješno dodan'});

      this.setState({ error: ''});
      this.setState({ restaurant: ''});
      this.setState({ selectedmeals: []});
      this.setState({ buttondisabled: false});
    }

    buttondisabled2(){
      if(this.state.selectedmeals.length==0) return true;
      else return false;
    }

    onSubmit3=(e)=>{
      e.preventDefault();
      const data={
        idMeals:this.state.orderedmeals
    };
    const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    };
      fetch('/meals/orderFrequency',options)
      .then(data=>data.json())
      .then(mapa=>this.setState({mapa:mapa}));
      fetch('/meals/orderPrice',options)
      .then(data=>data.json())
      .then(totalPrice=>this.setState({totalPrice:totalPrice}));
      this.getMealsNames();
      this.setState({check:true});
      
    }
    


             
    onSubmit=(e)=>{
      e.preventDefault();
      const data={
         idTable:this.state.idTable,
         idMeals:this.state.orderedmeals,
      };
      const options={
          method:'POST',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
      };
          return fetch('/demandmeals',options)
          .then(response=>{
              if(response.ok){
                
                this.setState({ error: ''});
                this.setState({ restaurant: ''});
                this.setState({ idTable: ''});
                this.setState({ selectedmeals: []});
                this.setState({ meals: []});
                this.setState({ orderedmeals: []});
                this.setState({ check: false});
                this.setState({ buttondisabled: true});
                this.setState({ success: ''});

              }
              if (response.status === 400) {
                  this.setState({ error: 'Podaci su neispravni'});
                  this.setState({ success: ''});
              } 
          })
      };

      handleChange2 = name => event => {
        this.setState({
          [name]: event.target.value,
        });
        this.state.meals=[];
        if(this.state.tables.some(table => table.idTable == event.target.value )){
          this.setState({ error: ''});
          fetch(`/meals/table/${event.target.value}`)
          .then(data=>data.json())
          .then(meals=>this.setState({meals:meals}));
          this.setState({ success: ''});
          this.setState({ tablerror: ''});

        }else{
          this.setState({ tablerror: 'Navedeni stol ne postoji'});
          this.setState({ success: ''});
        }
       
      };

      
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });

    };

    getMealsNames(){
      var mealnames=[];
      this.state.orderedmeals.map(mealID => {
        this.state.meals.map(meal => {
            if(meal.idMeal==mealID && !mealnames.includes(meal.mealName)){
              mealnames.push(meal.mealName);

            }
        })
      })
      this.setState({selectedmealnames:mealnames});
    }
      
      


      handleClick = (event, id) => {
        const { selectedmeals } = this.state;
        const selectedIndex = selectedmeals.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedmeals, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedmeals.slice(1));
        } else if (selectedIndex === selectedmeals.length - 1) {
          newSelected = newSelected.concat(selectedmeals.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedmeals.slice(0, selectedIndex),
            selectedmeals.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selectedmeals: newSelected });

      };

      isSelected = id => this.state.selectedmeals.indexOf(id) !== -1;

    render(){
        
        const { classes } = this.props;
        if(!this.state.check){
          return (
            <div>
              <div>
                  <TextField
                    id="standard-name"
                    label="Jedinstveni broj stola"
                    value={this.state.idTable}
                    onChange={this.handleChange2('idTable')}
                    margin="normal"
                   />
                  </div>
                  <div  className='error'><font color="red" size="3">{this.state.tablerror}</font></div>
              <Paper className={classes.root}>
                <p><h2>Izaberite proizvode</h2></p>
                
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Označeno</TableCell>
                      <TableCell align="right"><b>Kategorija</b></TableCell>
                      <TableCell align="right"><b>Ime proizvoda</b></TableCell>
                      <TableCell align="right"><b>Opis</b></TableCell>
                  
                      <TableCell align="right"><b>Cijena</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.meals.map(meal => {
                        const isSelected = this.isSelected(meal.idMeal);
                      return (
                        <TableRow key={meal.idCategory.idCategory}
                          hover
                          onClick={event => this.handleClick(event, meal.idMeal)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          selected={isSelected}>
                          <TableCell padding="checkbox">
                              <Checkbox checked={isSelected} />
                           </TableCell>
                          <TableCell align="right">{meal.idCategory.nameCategory}</TableCell>
                          <TableCell align="right">{meal.mealName}</TableCell>
                          <TableCell align="right">{meal.details}</TableCell>
                          
                          <TableCell align="right">{meal.mealPrice} kn</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              <div  className='error'><font color="red" size="3">{this.state.error}</font></div>
              
              <Form onSubmit={this.onSubmit2} >
              <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.buttondisabled2()}>
                    Dodaj proizvod
              </Button>
              </Form>
              <div className='error'><font color="green" size="3">{this.state.success}</font></div>
  
              <Form onSubmit={this.onSubmit3} >
              <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={this.state.buttondisabled}>
                    Završi narudžbu
              </Button>
              </Form>
              </Paper>
  
              </div>
            ); 

        }else if(this.state.check){
          return(
            <div>
              <p><h2>Naručeni proizvodi</h2></p>

              <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left"><b>Ime proizvoda</b></TableCell>
                      <TableCell align="right"><b>Količina</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {this.state.selectedmealnames.map(mealname => {
                      return (
                        <TableRow key={mealname}
                          >
                          <TableCell align="left">{mealname}</TableCell>
                          <TableCell align="right">{this.state.mapa[mealname]}</TableCell>
                        </TableRow>
                      );
                    })}
                    <TableCell align="left"><b>Ukupna cijena:</b></TableCell>
                    <TableCell align="right"><b>{this.state.totalPrice} kn</b></TableCell>
                  </TableBody>
                </Table>
            <Form onSubmit={this.onSubmit} >
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Potvrdi narudžbu
            </Button>
            </Form>
            </div>

          );

        }
        
    }
    
}

OrderForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderForm);