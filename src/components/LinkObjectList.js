import React, { useEffect, useState } from 'react'
import LinkObject from './LinkObject';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select'; 
import localStorageKeys from '../localStorageKeys';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { Collapse, IconButton } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'; 
import CloseIcon from '@material-ui/icons/Close'; 
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({ 
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    } 
  }));


const testObjectList = [
    {
        "id": "1",
        "name" : "stackoverflow",
        "url" : "http://stackoverflow.com/",
        "points" : "6" 
    },
    {
        "id": "2",
        "name" : "youtube",
        "url" : "https://www.youtube.com/",
        "points" : "9" 
    },
    {
        "id": "3",
        "name" : "linkedin",
        "url" : "https://www.linkedin.com/notifications/",
        "points" : "7" 
    } 
]
 
 
function LinkObjectList() { 
    const [links, setLinks] = useState(testObjectList);  
    const classes = useStyles();
    const [order, setOrder] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [isDeleteConfimationOpen, setIsDeleteConfimationOpen] = useState(false);
    const [deleteCandidateItem, setdeleteCandidateItem] = useState({})
    const [deleteItem, setDeleteItem] = useState("") 

    const [page, setPage] = useState(1)
    const [maxPageCount, setmaxPageCount] = useState(1)
    var link = ""; 


    // this cdm 
    useEffect(() => {
       getPaginatedList(1,0)
       
    }, []) // statelerden hangisi değişirse render işlemi yapılsın ---> []

    const getPaginatedList =(pageIndex,order)=>{
        var links= localStorage.getItem(localStorageKeys.linkArray) 
      
        if(links ==null){
          return
        }
        else{
          var array =JSON.parse(localStorage.getItem(localStorageKeys.linkArray)) 
          array = filterPaginatedList(array,order)
          var pageCount= array.length<=5 ? 1: Math.ceil(array.length/5)   
          var sliceIndex = (pageIndex-1)*5  
          var slicedArray= array.slice(sliceIndex,sliceIndex+5) 
          setmaxPageCount(pageCount)
          setLinks(slicedArray) 
        }     
    }

    const compareAsc = ( a, b ) => { 
      if ( a.points < b.points ){
        return -1;
      }
      if ( a.points > b.points ){
        return 1;
      }
      return 0;
    }

    const compareDesc = ( a, b ) => {
      if ( a.points < b.points ){
        return 1;
      }
      if ( a.points > b.points ){
        return -1;
      }
      return 0;
    }

    const filter = (val) => { 
        var filterArray = [...links]; 
        if (val == 0 )     
        {  
            filterArray.sort(compareDesc)
        }
        else if(val == 1){ 
            filterArray.sort(compareAsc)
        }
        setLinks(filterArray);
    }

    const filterPaginatedList = (filterArray,orderVal)=>{
     
      if (orderVal == 0 )     
      {  
          filterArray.sort(compareDesc)
      }
      else if(orderVal == 1){ 
          filterArray.sort(compareAsc)
      }

      return filterArray
    }
    const handleChange = (event) => {
      filter(event.target.value)
      setOrder(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };

    const setStorage = (array) => {
      localStorage. setItem(localStorageKeys.linkArray, JSON.stringify(array))
    }

    const openDeleteModal=(link)=>{  
      console.log("delete modal open " + link);
      setDeleteItem(links.filter(x => x.id == link.id).map(x => x.name))
      setdeleteCandidateItem(link)
      console.log(deleteCandidateItem);
      setIsDeleteConfimationOpen(true)  
      console.log(deleteItem)
    }
 

    const onDeleteLink = () => { 
        link = deleteCandidateItem   
        var filtered = links.filter(function(value, index, arr){ 
            return value.id != link.id;
        });
        console.log(filtered);
        setStorage(filtered);
        setLinks({
          ...filtered,
          deleteProcessStatus : true
        });  
        // window.location.reload() 
        setIsDeleteConfimationOpen(false)  
        setTimeout(function() {
          window.location.href = window.location;
       }, 1000);
    }

       
    const handlePageChange =(e,page)=>{
      getPaginatedList(page,order)
      setPage(page)
    }
 

    return (
        <div className="ml_5_y">  
           <DeleteConfirmationModal  
            isOpen={isDeleteConfimationOpen}    
            onClose={()=> setIsDeleteConfimationOpen(false)}                
            delete ={() => onDeleteLink()}  
            item = {deleteItem}
           />
           
              { (links.deleteProcessStatus === true) ?
                <div className="alertDeleteFrame" style={{zIndex:"10000000"}}> 
                         <div>
                            <span className="alertDeleteSpan">{deleteItem}</span> removed.
                         </div>
                 </div>   : null
              } 

           <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Order By</InputLabel>
                <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={order}
                onChange={handleChange}
                > 
                <MenuItem value={-1} disabled>Order By</MenuItem>
                <MenuItem value={0}>Most Voted</MenuItem>
                <MenuItem value={1}>Less Voted</MenuItem> 
                </Select>
            </FormControl>

            {links.length > 0 ? links.map((link, index) => {
                return(
                    <LinkObject updateLinkList={()=>getPaginatedList(page,order)} filter={()=>filter(order)} key={index} defaultLink = {link} deleteLink = {(link)=>openDeleteModal(link)} />
                )
            }) : null } 

            <div> 
              <Pagination count={maxPageCount} page={page} onChange={handlePageChange} color="primary" /> 
            </div>
        </div>
    )
}

export default LinkObjectList
