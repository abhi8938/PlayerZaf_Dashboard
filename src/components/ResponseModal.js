import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import '../App.css';

class ResponseModal extends React.Component{
 state={
   show:false
 }
      render(){
        console.log(this.props);
          return(
            <Modal show={this.props.show}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ padding:10, alignItems:'center', justifyContent:'center', textAlign:'start' }}>
                <text>
                  {this.props.error}
                </text>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.onClick}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
          )
      }
    
}
export default ResponseModal;