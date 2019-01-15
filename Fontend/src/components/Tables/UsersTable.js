import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        users:[]
    };
    componentDidMount(){
        fetch('/users')
        .then(data=>data.json())
        .then(users=>this.setState({users:users}))
    };
    render(){
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Username</b></TableCell>
                    <TableCell align="right"><b>Password</b></TableCell>
                    <TableCell align="right"><b>Name</b></TableCell>
                    <TableCell align="right"><b>Surname</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.users.map(user => {
                    return (
                      <TableRow key={user.id}>
                        <TableCell align="left">{user.userName}</TableCell>
                        <TableCell align="right">{user.password}</TableCell>
                        <TableCell align="right">{user.name}</TableCell>
                        <TableCell align="right">{user.surname}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          ); 
    }
    
}

UsersTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UsersTable);