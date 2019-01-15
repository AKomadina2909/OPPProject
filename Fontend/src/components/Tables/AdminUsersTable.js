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
  

class AdminUsersTable extends Component{
  constructor(props) {
    super(props)
    this.end = this.end.bind(this)
}
    state={
        users:[],
        selectedUser: '',
        error:'',
        buttondisable:true,
        change:false,
        delete:false,

    };
    componentDidMount(){
        fetch('/users')
        .then(data=>data.json())
        .then(users=>this.setState({users:users}))
    };

    change=(e)=>{
      if(this.state.selectedUser.role=='administrator'){
        e.preventDefault();
        this.setState({error:'Administratoru nije moguće promijeniti prava.'}) 
      }else{
        e.preventDefault();
        this.setState({ change: true});
      }
    };

    delete=(e)=>{
      if(this.state.selectedUser.role=='administrator'){
        e.preventDefault();
        this.setState({error:'Administratora nije moguće ukloniti.'}) 
      }else{
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
      fetch(`/users/id/${this.state.selectedUser.idUser}`,options)
          .then(response=>{
              if(response.ok){
                this.componentDidMount();
                this.setState({ selectedUser: ''});
                this.setState({ delete: false});
                this.setState({ buttondisable: true});
              }
          })
        }
    };

    getRestaurant(user){
      if(user.idRestaurant==null) return '';
      else return user.idRestaurant.nameRestaurant;
    }
    
    end(){
      this.setState({ selectedUser: ''});
      this.setState({ change: false});
      this.setState({ buttondisable: true});
      this.componentDidMount();
    }
  

        
    

    handleClick = (event, user) => {  
        this.setState({ selectedUser: user });
        this.state.buttondisable=false;
        this.setState({error:''})
      };

      isSelected = (id) => this.state.selectedUser.idUser===id;

  

    render(){
        const { classes } = this.props;
        if(!this.state.change){
        return (
            <Paper className={classes.root}>
            <p><b>Popis korisnika</b></p>
            <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="right"><b>Korisničko ime</b></TableCell>
                      <TableCell align="right"><b>Ime</b></TableCell>
                      <TableCell align="right"><b>Prezime</b></TableCell>
                      <TableCell align="right"><b>Lozinka</b></TableCell>
                      <TableCell align="right"><b>Broj telefona</b></TableCell>
                      <TableCell align="right"><b>Grad stanovanja</b></TableCell>
                      <TableCell align="right"><b>Adresa stanovanja</b></TableCell>
                      <TableCell align="right"><b>Razina ovlasti</b></TableCell>
                      <TableCell align="right"><b>Ime restorana</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.users.map(user => {
                        const isSelectedUser = this.isSelected(user.idUser);
                      return (
                        <TableRow key={user.idUser}
                          hover
                          onClick={event => this.handleClick(event, user)}
                          role="checkbox"
                          tabIndex={-1}
                          selected={isSelectedUser}>
                          <TableCell align="right">{user.userName}</TableCell>
                          <TableCell align="right">{user.name}</TableCell>
                          <TableCell align="right">{user.surname}</TableCell>
                          <TableCell align="right">{user.password}</TableCell>
                          <TableCell align="right">{user.mobilePhone}</TableCell>
                          <TableCell align="right">{user.city}</TableCell>
                          <TableCell align="right">{user.adress}</TableCell>
                          <TableCell align="right">{user.role}</TableCell>
                          <TableCell align="right">{this.getRestaurant(user)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              <Form onSubmit={this.delete} >
                <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={this.state.buttondisable}>
                  Ukloni korisnika
                </Button>
              </Form>
              <div className='error'><font color="red" size="3">{this.state.error}</font></div>
              <Form onSubmit={this.change} >
                <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={this.state.buttondisable}>
                  Promijeni razinu ovlasti
                </Button>
              </Form>

            </Paper>
          ); 
          }
          else if(this.state.change){
            return(
              <ChangeRoleForm user={this.state.selectedUser} end={this.end}></ChangeRoleForm>
              
            );

          }
          else{
            return(<p>Pojavila se greška</p>);

          }
    }
    
}

AdminUsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminUsersTable);