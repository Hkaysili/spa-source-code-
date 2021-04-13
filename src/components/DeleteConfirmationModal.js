import React from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'  
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'; 

const customStyles = {
    content: {
        maxHeight: '80vh',
        overflowY: 'auto',
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '35%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: {
        zIndex: 10
    }
};

const ErrorText = styled.p`
    font-family: Verdana, sans-serif;
    font-weight: 100;
`

const IconContainer = styled.div`
    margin-top: 25px;
    margin-left: 10px;
`

function DeletePermissionModal(props) {  
    return (
       <div id="test">
            <Modal
            isOpen={props.isOpen}
            style={customStyles}
            onRequestClose={props.onClose}
            contentLabel="delete-modal"
        >
            <div className="row">
                <div className="col col-sm-3">
                    <IconContainer>
                        <Button className="removeBtnFrame" onClick={props.onClose}><CloseIcon className="removeBtn" fontSize="inherit" /></Button>
                    </IconContainer> 
                </div>
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12">
                    <h3 className="popupTitle">Remove Link </h3>
                    <div className="form-group popupContentFrame">
                        <div className="popupContent">
                           Do you want to remove :
                        </div>
                    </div>
                    <br/>
                    <div className="d-block linkName_Frame"><span className="linkName_">{props.item}</span></div>  
                </div> 

                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 btn_frame"> 
                        <button className="btn btn-danger mr-20" style={{ marginLeft: '5px' }} onClick={() => props.delete()}>OK</button>
                        <button className="btn btn-secondary" onClick={props.onClose}>CANCEL</button>
                </div>
            </div>
        </Modal>
       </div>
    )
}

export default DeletePermissionModal