import React, { useEffect, useState } from 'react'  
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import localStorageKeys from '../localStorageKeys';


const useStyles = makeStyles((theme) => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    }, 
    button2: {
      margin: theme.spacing(1),
    },
  }));
  

function LinkObject({defaultLink, deleteLink,updateLinkList}) { 
    const classes = useStyles();
    const [link, setLink] = useState({})  
    useEffect(() => {  
       setLink(defaultLink) 
    }, [defaultLink])

    const deleteLinkSelf = () => {
      deleteLink(link)
    }
    
    const syncLocalStorage = (newPoints) =>{
      var links= localStorage.getItem(localStorageKeys.linkArray)
      console.log(links);
      if(links ==null){  
          return
      }else{
          var array =JSON.parse(localStorage.getItem(localStorageKeys.linkArray))  

          var newArray=array.map((item)=>{
            if(item.id==link.id){
              return{
                ...item,
                points:newPoints
              }
            }else{
              return item
            }
          })
          
          localStorage.setItem(localStorageKeys.linkArray,JSON.stringify(newArray))
          // filter()
          updateLinkList()
          console.log(newArray)
      }     
    }
 

    function downVoteTest(){
      if(link.points > 0)
        setLink({
          ...link,
          points : link.points - 1
        })   
        syncLocalStorage(link.points-1)
    }
    function upVoteTest(){  
      setLink({
        ...link,
        points : link.points + 1
      })    
      syncLocalStorage(link.points+1)
    }
  
    return (
        <div>  
            <div className="row mt-20 mb-20 object-list--frame">
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 object-list">
                    <div className="col-lg-1 col-md-3 col-xs-12 col-sm-2 float-left object-list-left">
                        <div className="points-frame">
                          <div className="point-count">{link?.points}</div>
                          <div className="point-span">POINTS</div>
                        </div>
                    </div>
                    <div className="col-lg-11 col-md-9 col-xs-12 col-sm-10 float-left  object-list-right">
                        <div className="object-list-rt">
                          <div className="object-title">{link?.name}</div>
                          <div className="object-link">({link?.url})</div>
                        </div>
                        <div className="object-list-rb">
                            <div className="object-list-rb-frame">
                                <div className="object-list-rb-left">
                                  <Button onClick={() => upVoteTest()}><ArrowUpwardIcon className="ud-icon"/><span className="ud-span">Up Vote</span></Button> 
                                </div> 
                                <div className="object-list-rb-right">
                                  <Button onClick={() => downVoteTest()} disabled = {link.points == 0}><ArrowDownwardIcon className="ud-icon"/><span className="ud-span">Down Vote</span></Button> 
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="remove-button-frame">
                        <div className="remove-button">
                          <Button
                              onClick = {() => deleteLinkSelf()}
                              variant="contained"
                              color="secondary"
                              className={classes.button}  
                              startIcon={<DeleteIcon />}
                            > 
                        </Button>
                        </div>
                    </div>
                </div>
            </div>

 
        </div>
    )
}

export default LinkObject
