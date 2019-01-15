import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from "../Card/Card";
import TextField from '@material-ui/core/TextField';
import Form from "../Form/Form";
import Button from '@material-ui/core/Button';

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
  

class UsersTable extends Component{
    state={
        users:[],
        hireusername:'',
        hireerror:'',
        hiresuccess:'',
        fireerror:'',
        firesuccess:'',
        fireusername:'',
    };
    componentDidMount(){
        fetch(`/users/restaurant/${this.props.idRestaurant}`)
        .then(data=>data.json())
        .then(users=>this.setState({users:users}))
    };
    isUsersEmpty(){
      if(this.state.users.length>0) return false;
      else return true;

    };
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    onSubmit = (e) => {
      if(this.state.hireusername==this.props.ownername){
        e.preventDefault();
        this.setState({ hireerror: 'Ne možete promijeniti svoju ulogu'});
        return;
      }
      e.preventDefault();
      const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: ''
      };
      fetch(`/users/hire/${this.state.hireusername}`,options)
      .then(response=>{
        if(response.ok){
          this.setState({ hiresuccess: 'Korisnik uspješno zaposlen'});
          this.setState({ hireerror: ''});
          this.setState({ hireusername: ''});
          this.componentDidMount();
        }else{
          this.setState({ hireerror: 'Korisnik ne postoji'});
          this.setState({ hiresuccess: ''});
        }
      });
    };

    onSubmit2 = (e) => {
      if(this.state.fireusername==this.props.ownername){
        e.preventDefault();
        this.setState({ hireerror: 'Ne možete otpustiti sebe'});
        return;
      }
      e.preventDefault();
      const options={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: ''
      };
      fetch(`/users/fire/${this.state.fireusername}`,options)
      .then(response=>{
        if(response.ok){
          this.setState({ firesuccess: 'Korisnik uspješno otpušten'});
          this.setState({ fireerror: ''});
          this.setState({ fireusername: ''});
          this.componentDidMount();
        }else{
          this.setState({ fireerror: 'Korisnik ne postoji'});
          this.setState({ firesuccess: ''});
        }
      });
    };

    render(){
        const { classes } = this.props;
        if(this.isUsersEmpty()){
          return(
            <Card>
            <p><b>Trenutno nema zaposlenika</b></p>
              <div>
                <TextField
                  id="standard-name"
                  label="Korisničko ime"
                  value={this.state.hireusername}
                  onChange={this.handleChange('hireusername')}
                  margin="normal"
                 />
              </div>
            </Card>
            );
        }
        else{
          return (
            <div>
            <Paper className={classes.root}>
              <p><b>Popis zaposlenika</b></p>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Korisničko ime</b></TableCell>
                    <TableCell align="right"><b>Ime</b></TableCell>
                    <TableCell align="right"><b>Prezime</b></TableCell>
                    <TableCell align="right"><b>Uloga</b></TableCell>
                    <TableCell align="right"><b>Broj mobitela</b></TableCell>
                    <TableCell align="right"><b>Grad</b></TableCell>
                    <TableCell align="right"><b>Adresa stanovanja</b></TableCell>
                    <TableCell align="right"><b>Email</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map(user => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell align="left">{user.userName}</TableCell>
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell align="right">{user.surname}</TableCell>
                        <TableCell align="right">{user.role}</TableCell>
                        <TableCell align="right">{user.mobilePhone}</TableCell>
                        <TableCell align="right">{user.city}</TableCell>
                        <TableCell align="right">{user.adress}</TableCell>
                        <TableCell align="right">{user.email}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </Paper>
              
            <p> </p>
            <Paper>
              <div>
                <p><b>Dodaj zaposlenika</b></p>
                <TextField
                  id="standard-name"
                  label="Korisničko ime"
                  value={this.state.hireusername}
                  onChange={this.handleChange('hireusername')}
                  margin="normal"
                 />
              </div>
              <div className='error'><font color="red" size="3">{this.state.hireerror}</font></div>
              <div className='error'><font color="green" size="3">{this.state.hiresuccess}</font></div>
              <Form onSubmit={this.onSubmit} >
                <Button type="submit" variant="contained" color="primary" className={classes.button}>
                  Zaposli
                </Button>
              </Form>
            </Paper>
            <p>  </p>
              <Paper>
              <div>
                <p><b>Otpusti zaposlenika</b></p>
                <TextField
                  id="standard-name"
                  label="Korisničko ime"
                  value={this.state.fireusername}
                  onChange={this.handleChange('fireusername')}
                  margin="normal"
                 />
              </div>
              <div className='error'><font color="red" size="3">{this.state.fireerror}</font></div>
              <div className='error'><font color="green" size="3">{this.state.firesuccess}</font></div>
              <Form onSubmit={this.onSubmit2} >
                <Button type="submit" variant="contained" color="secondary" className={classes.button}>
                  Otpusti
                </Button>
              </Form>
            </Paper>
            </div>
          ); 
        }
        
    }
    
}

UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);