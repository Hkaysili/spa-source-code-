import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import {useHistory}  from 'react-router-dom';
import localStorageKeys from '../../localStorageKeys';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse'; 
import CloseIcon from '@material-ui/icons/Close'; 


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  pageTitle: {
      fontSize: "1.75em",
      marginLeft: "20px",
      marginTop: "20px"
  },
  fr:{
      float: "right"
  }
}));

export default function AddLink() { 
  const classes = useStyles(); 
  var history = useHistory();
  var processAddStatus = false;   

  const [linkObject, setLinkObject] = useState({}) 
  const [open, setOpen] = useState(true);
  const [openW, setOpenW] = useState(true);
  const [addName, setAddName] = useState('');  

  const handleChange = (event) =>{
    var name = event.target.name;
    var value = event.target.value;  
    setLinkObject({
        ...linkObject,
        [name] : value 
    });
  } 

  const validateInput = () => {
    var fadeName= false
    var fadeUrl=false 
     if (linkObject.name == "" || linkObject.name == null)
     {    
          fadeName=true 
    }
      if (linkObject.url == "" || linkObject.url == null)
    { 
         fadeUrl=true  
    }
    if(fadeName==true||fadeUrl==true){ 
        setLinkObject({
            ...linkObject,
            fadename:fadeName,
            fadeurl:fadeUrl
        }) 
    }
    if(linkObject.name != "" && linkObject.name != null && linkObject.url != "" && linkObject.url != null ){ 
       processAddStatus = true;
       return true
    }
   
  }

  const addLink = () => {  
      if(validateInput())
       {
            console.log(" add process true")
            processAddStatus = true; 
            setOpen(true);
            setOpenW(true);
            setAddName(linkObject.name);  
            linkObject.points = 0;
            var links= localStorage.getItem(localStorageKeys.linkArray)  
            if(links ==null){
                linkObject.id = 1;
                var array =[]
                array.push(linkObject)
            }else{
                var array =JSON.parse(localStorage.getItem(localStorageKeys.linkArray))
                linkObject.id = array.length + 1;
                array.push(linkObject)
            }     
            localStorage.setItem(localStorageKeys.linkArray, JSON.stringify(array)) 
            setLinkObject({
                ...linkObject,
                name: '',
                url: '', 
                process : processAddStatus 
            })    
            console.log(links);  
            document.getElementsByClassName('wframe')[0].style.setProperty("display", "none"); 
        }
        else{ 
            console.log(" add process false")  
            setOpen(false);    
            setOpenW(false);    
            processAddStatus= false;   
            console.log(linkObject);
        }
  }

  useEffect(() => {  
      console.log(linkObject.process);
      console.log(processAddStatus);
  }, [])

  return (
   <div className="container">
        <div className="ml_5_y" id="addLinkFrame">
            <div className="row ml_15">
                <Link
                    component="button"
                    variant="body2" 
                    onClick={() => history.push("/")}
                    >
                    <ArrowBackIcon/>
                    Return to List
                </Link>
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <h1 className={classes.pageTitle}>
                    Add New Link
                </h1>
                <div className="row ln_frame">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"> 
                         <TextField name="name" value={linkObject.name} id="standard-basic" label="Link Name" onChange={handleChange} />   
                    </div>
                </div>
                <div className="row lu_frame mt-10">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12"> 
                        <TextField name="url" value={linkObject.url} id="standard-basic" label="Link Url" onChange={handleChange} /> 
                    </div>
                </div>


                <div className="wframe"> 
                    <div>
                        {(linkObject.fadename == true ||linkObject.name == "") && (processAddStatus == false)   ?  <div className="wframe_name">
                                                            <Alert severity="error" className="alert">The name field cannot be empty!</Alert>
                                                    </div> : null}  
                    </div>
                    <div>
                        {(linkObject.fadeurl == true ||linkObject.url == "") && (processAddStatus == false)  ?  <div className="wframe_url">
                                                            <Alert severity="error" className="alert">The url field cannot be empty!</Alert>
                                                    </div> : null}  
                    </div>
                </div>

                <div className="row">
                   <div className="container mt-10">
                        <Button variant="contained" color="primary" className={classes.fr} onClick={() => addLink()}>
                            Add
                        </Button>
                   </div>
                </div>

                { 
                     (linkObject.process == true) ? (  
                        <div className="alertFrame"> 
                            <Collapse in={open}>
                                <Alert
                                    action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                        >
                                        <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                }
                                >
                                <span className="alertSpan">{addName}</span> added.
                                </Alert>
                                </Collapse>  
                        </div>
                     ) : null
                }

                 
            </form> 
        </div>
   </div>
  );
}