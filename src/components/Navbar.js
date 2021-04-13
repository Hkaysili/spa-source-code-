import React  from 'react';
import {useHistory}  from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'; 
import IconButton from '@material-ui/core/IconButton'; 
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

function Navbar() {
  const classes = useStyles();
  var history = useHistory();

  return (
    <div className={classes.root} id="navbar">  
        <div className="example example-grow"> 
          <div className="example-content"> 
            <div className="parent">
              <div className="item"></div>
              <div className="item"> 
                <AppBar position="relative">
                  <Toolbar>
                      <Button onClick={() => history.push("/addlink")}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                          <Fab color="primary" aria-label="add">
                              <AddIcon className="submitFrame" />
                          </Fab>
                        </IconButton>
                      </Button>
                      <Typography variant="h6" className={classes.title}>
                          Submit A Link
                      </Typography> 
                  </Toolbar>
                </AppBar> 
              </div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
            </div> 
          </div>
        </div>  
    </div>
  );
}

export default Navbar
