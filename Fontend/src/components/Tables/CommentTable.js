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
        selectedRestaurantComment: [],
        selectedOrderComment:[],

    };
    componentDidMount(){
        fetch('/restaurantreviews/user')
        .then(data=>data.json())
        .then(restaurantComments=>this.setState({restaurantComments:restaurantComments}));
        fetch('/mealreviews/user')
        .then(data=>data.json())
        .then(orderComments=>this.setState({orderComments:orderComments}))
    };

    isOrderCommentsEmpty(){
      if(this.state.orderComments.length>0) return false;
      else return true;

    }

    isRestaurantCommentsEmpty(){
      if(this.state.restaurantComments.length>0) return false;
      else return true;
    }


        
    onSubmit2=(e)=>{
        e.preventDefault();
        const data={
            comments:this.state.selectedRestaurantComment
        };
        const options={
            method:'DELETE',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        {this.state.selectedRestaurantComment.map(id => {
            return fetch(`/restaurantreviews/id/${id}`,options)
            .then(response=>{
                if(response.ok){
                  this.componentDidMount();
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                } 
            })
        })}
        
    };
    onSubmit=(e)=>{
      e.preventDefault();
      const data={
          comments:this.state.selectedOrderComment
      };
      const options={
          method:'DELETE',
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
      };
      {this.state.selectedOrderComment.map(id => {
          return fetch(`/mealreviews/id/${id}`,options)
          .then(response=>{
              if(response.ok){
                this.componentDidMount();
              }
              if (response.status === 400) {
                  this.setState({ error: 'Podaci su neispravni'});
              } 
          })
      })}
      
    };

    handleClick2 = (event, id) => {
        const { selectedRestaurantComment } = this.state;
        const selectedIndex = selectedRestaurantComment.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedRestaurantComment, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedRestaurantComment.slice(1));
        } else if (selectedIndex === selectedRestaurantComment.length - 1) {
          newSelected = newSelected.concat(selectedRestaurantComment.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedRestaurantComment.slice(0, selectedIndex),
            selectedRestaurantComment.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selectedRestaurantComment: newSelected });
      };

      handleClick = (event, id) => {
        const { selectedOrderComment } = this.state;
        const selectedIndex = selectedOrderComment.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedOrderComment, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedOrderComment.slice(1));
        } else if (selectedIndex === selectedOrderComment.length - 1) {
          newSelected = newSelected.concat(selectedOrderComment.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedOrderComment.slice(0, selectedIndex),
            selectedOrderComment.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selectedOrderComment: newSelected });
      };

      isSelected2 = id => this.state.selectedRestaurantComment.indexOf(id) !== -1;
      isSelected = id => this.state.selectedOrderComment.indexOf(id) !== -1;

    render(){
        const { classes } = this.props;
        if(!this.isOrderCommentsEmpty() && !this.isRestaurantCommentsEmpty()){
        return (
          <div>
            <Paper className={classes.root}>
              <p><h2>Osvrti na restorane</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Označeno</TableCell>
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.restaurantComments.map(restaurantComment => {
                      const isSelected = this.isSelected2(restaurantComment.idRestaurantReview);
                    return (
                      <TableRow key={restaurantComment.idRestaurantReview}
                        hover
                        onClick={event => this.handleClick2(event, restaurantComment.idRestaurantReview)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                         </TableCell>
                        <TableCell align="right">{restaurantComment.review}</TableCell>
                        <TableCell align="right">{restaurantComment.description}</TableCell>
                        <TableCell align="right">{restaurantComment.reply}</TableCell>
                        <TableCell align="right">{restaurantComment.idRestaurant.nameRestaurant}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            <Form onSubmit={this.onSubmit2} >
            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Obriši označene
            </Button>
            </Form>
            </Paper>

            <Paper className={classes.root}>
              <p><h2>Osvrti na narudžbe</h2></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Označeno</TableCell>
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Datum narudžbe</b></TableCell>
                    <TableCell align="right"><b>Vrijeme narudžbe</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell> 
                    <TableCell align="right"><b>Proizvodi</b></TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderComments.map(orderComment => {
                      const isSelected = this.isSelected(orderComment.idMealReview);
                    return (
                      <TableRow key={orderComment.idMealReview}
                        hover
                        onClick={event => this.handleClick(event, orderComment.idMealReview)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                         </TableCell>
                        <TableCell align="right">{orderComment.review}</TableCell>
                        <TableCell align="right">{orderComment.description}</TableCell>
                        <TableCell align="right">{orderComment.reply}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.dateOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.timeOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idTable}</TableCell>
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
            <Form onSubmit={this.onSubmit} >
            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Obriši označene
            </Button>
            </Form>
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
                    <TableCell>Označeno</TableCell>
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Datum narudžbe</b></TableCell>
                    <TableCell align="right"><b>Vrijeme narudžbe</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell> 
                    <TableCell align="right"><b>Proizvodi</b></TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderComments.map(orderComment => {
                      const isSelected = this.isSelected(orderComment.idMealReview);
                    return (
                      <TableRow key={orderComment.idMealReview}
                        hover
                        onClick={event => this.handleClick(event, orderComment.idMealReview)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                         </TableCell>
                        <TableCell align="right">{orderComment.review}</TableCell>
                        <TableCell align="right">{orderComment.description}</TableCell>
                        <TableCell align="right">{orderComment.reply}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.dateOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.timeOrder}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idRestaurant.nameRestaurant}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.idTable.idTable}</TableCell>
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
            <Form onSubmit={this.onSubmit} >
            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Obriši označene
            </Button>
            </Form>
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
                    <TableCell>Označeno</TableCell>
                    <TableCell align="right"><b>Ocjena</b></TableCell>
                    <TableCell align="right"><b>Opis</b></TableCell>
                    <TableCell align="right"><b>Odgovor</b></TableCell>
                    <TableCell align="right"><b>Naziv restorana</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.restaurantComments.map(restaurantComment => {
                      const isSelected = this.isSelected2(restaurantComment.idRestaurantReview);
                    return (
                      <TableRow key={restaurantComment.idRestaurantReview}
                        hover
                        onClick={event => this.handleClick2(event, restaurantComment.idRestaurantReview)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        selected={isSelected}>
                        <TableCell padding="checkbox">
                            <Checkbox checked={isSelected} />
                         </TableCell>
                        <TableCell align="right">{restaurantComment.review}</TableCell>
                        <TableCell align="right">{restaurantComment.description}</TableCell>
                        <TableCell align="right">{restaurantComment.reply}</TableCell>
                        <TableCell align="right">{restaurantComment.idRestaurant.nameRestaurant}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            <Form onSubmit={this.onSubmit2} >
            <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Obriši označene
            </Button>
            </Form>
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