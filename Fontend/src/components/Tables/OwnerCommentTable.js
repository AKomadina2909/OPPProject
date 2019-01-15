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
import TextField from '@material-ui/core/TextField';

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
  

class OwnerCommentTable extends Component{
    state={
        restaurantComments:[],
        orderComments:[],
        selectedRestaurantComment:'',
        selectedOrderComment:'',
        replyOrderflag:false,
        replyRestaurantflag:false,
        reply:'',
        error:'',
        success:'',
        buttonRestaurantdisable:true,
        buttonOrderdisable:true,

    };

    buttonRestaurantdisable(){
      return this.state.buttonRestaurantdisable;
    }

    buttonOrderdisable(){
      return this.state.buttonOrderdisable;
    }

    componentDidMount(){
        fetch(`/restaurantreviews/restaurant/${this.props.idRestaurant}`)
        .then(data=>data.json())
        .then(restaurantComments=>this.setState({restaurantComments:restaurantComments}));
        fetch(`/mealreviews/restaurant/${this.props.idRestaurant}`)
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


        
 
    restaurantReply=(e)=>{
      e.preventDefault();
      this.setState({replyRestaurantflag:true})
      
    };

    orderReply=(e)=>{
      e.preventDefault();
      this.setState({replyOrderflag:true})
    }

    onSubmit2=(e)=>{
      e.preventDefault();
        const data={
            idRestaurantReview:this.state.selectedRestaurantComment,
            reply:this.state.reply,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/restaurantreviews/update',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ error: ''});
                    this.setState({ success: 'Odgovor uspješno ostavljen'});
                    this.setState({ reply: ''});
                    this.setState({ description: ''});
                    this.setState({ replyRestaurantflag: false});
                    this.setState({ selectedRestaurantComment: ''});
                    this.setState({ buttonRestaurantdisable: true});
                    
                    this.componentDidMount();
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            })
      
    };

    onSubmit3=(e)=>{
      e.preventDefault();
        const data={
            idMealReview:this.state.selectedOrderComment,
            reply:this.state.reply,
        };
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        };
        return fetch('/mealreviews/update',options)
            .then(response=>{
                if(response.ok){
                    this.setState({ error: ''});
                    this.setState({ success: 'Odgovor uspješno ostavljen'});
                    this.setState({ reply: ''});
                    this.setState({ description: ''});
                    this.setState({ selectedOrderComment: ''});
                    this.setState({ replyOrderflag: false});
                    this.setState({ buttonOrderdisable: true});
                    this.componentDidMount();
                }
                if (response.status === 400) {
                    this.setState({ error: 'Podaci su neispravni'});
                    this.setState({ success: ''});
                } 
            })
      
    };

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };


    

      handleClickRestaurant = (event, idRestaurant) => {  
        this.setState({ selectedRestaurantComment: idRestaurant });
        console.log(idRestaurant);
        this.setState({ buttonRestaurantdisable: false });
      };

      handleClickOrder = (event, idOrder) => {  
        this.setState({ selectedOrderComment: idOrder });
        console.log(idOrder);
        this.setState({ buttonOrderdisable: false });
      };

      isSelected2 = id => this.state.selectedRestaurantComment === id;
      isSelected = id => this.state.selectedOrderComment === id;

    render(){
        const { classes } = this.props;
        if(!this.isOrderCommentsEmpty() && !this.isRestaurantCommentsEmpty() && !this.state.replyOrderflag && !this.state.replyRestaurantflag){
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
                    <TableCell align="right"><b>Korisničko ime klijenta</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.restaurantComments.map(restaurantComment => {
                      const isSelected = this.isSelected2(restaurantComment.idRestaurantReview);
                    return (
                      <TableRow key={restaurantComment.idRestaurantReview}
                        hover
                        onClick={event => this.handleClickRestaurant(event, restaurantComment.idRestaurantReview)}
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
                        <TableCell align="right">{restaurantComment.idUser.userName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            <Form onSubmit={this.restaurantReply} >
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.buttonRestaurantdisable()}>
                  Odgovori na osvrt
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
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell> 
                    <TableCell align="right"><b>Proizvodi</b></TableCell> 
                    <TableCell align="right"><b>Korisničko ime klijenta</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderComments.map(orderComment => {
                      const isSelected = this.isSelected(orderComment.idMealReview);
                    return (
                      <TableRow key={orderComment.idMealReview}
                        hover
                        onClick={event => this.handleClickOrder(event, orderComment.idMealReview)}
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
                        <TableCell align="right">{orderComment.idOrder.idTable.idTable}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.meals.map(meal => {
                         return (
                             <text>{meal.mealName}, </text>
                        );
                         })}
                        </TableCell>
                        <TableCell align="right">{orderComment.idUser.userName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            <Form onSubmit={this.orderReply} >
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.buttonOrderdisable()}>
                  Odgovori na osvrt
            </Button>
            </Form>
            </Paper>
            </div>
          ); 
          }
          else if(!this.isOrderCommentsEmpty() && this.isRestaurantCommentsEmpty() && !this.state.replyOrderflag && !this.state.replyRestaurantflag){
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
                    <TableCell align="right"><b>Jedinstveni broj stola</b></TableCell> 
                    <TableCell align="right"><b>Proizvodi</b></TableCell> 
                    <TableCell align="right"><b>Korisničko ime klijenta</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.orderComments.map(orderComment => {
                      const isSelected = this.isSelected(orderComment.idMealReview);
                    return (
                      <TableRow key={orderComment.idMealReview}
                        hover
                        onClick={event => this.handleClickOrder(event, orderComment.idMealReview)}
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
                        <TableCell align="right">{orderComment.idOrder.idTable.idTable}</TableCell>
                        <TableCell align="right">{orderComment.idOrder.meals.map(meal => {
                         return (
                             <text>{meal.mealName}, </text>
                        );
                         })}
                        </TableCell>
                        <TableCell align="right">{orderComment.idUser.userName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            <Form onSubmit={this.orderReply} >
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.buttonOrderdisable()}>
                  Odgovori na osvrt
            </Button>
            </Form>
            </Paper>
            );


          }
          else if(this.isOrderCommentsEmpty() && !this.isRestaurantCommentsEmpty() && !this.state.replyOrderflag && !this.state.replyRestaurantflag){
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
                    <TableCell align="right"><b>Korisničko ime klijenta</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.restaurantComments.map(restaurantComment => {
                      const isSelected = this.isSelected2(restaurantComment.idRestaurantReview);
                    return (
                      <TableRow key={restaurantComment.idRestaurantReview}
                        hover
                        onClick={event => this.handleClickRestaurant(event, restaurantComment.idRestaurantReview)}
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
                        <TableCell align="right">{restaurantComment.idUser.userName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            <Form onSubmit={this.restaurantReply} >
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.buttonRestaurantdisable()}>
                  Odgovori na osvrt
            </Button>
            </Form>
            </Paper>
            );

          }
          else if(this.state.replyOrderflag){
            return(
            <div>
              <p><b>Unesite tekst odgovora</b></p>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Odgovor"
                    multiline
                    rowsMax="5"
                    value={this.state.reply}
                    onChange={this.handleChange('reply')}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                />
                <Form onSubmit={this.onSubmit3} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Odgovori
                </Button>
                </Form>
                </div>
            );
            
          }
          else if(this.state.replyRestaurantflag){
            return(
              <div>
                <p><b>Unesite tekst odgovora</b></p>
                  <TextField
                      id="outlined-multiline-flexible"
                      label="Odgovor"
                      multiline
                      rowsMax="5"
                      value={this.state.reply}
                      onChange={this.handleChange('reply')}
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                  />
                  <Form onSubmit={this.onSubmit2} >
                  <Button type="submit" variant="contained" color="primary" className={classes.button}>
                    Odgovori
                  </Button>
                  </Form>
                  </div>
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

OwnerCommentTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OwnerCommentTable);