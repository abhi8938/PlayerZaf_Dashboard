import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import { Row, Col } from 'reactstrap';
import { sendMessage} from './../requests';
import LoadingScreen from 'react-loading-screen'
import ResponseModal from './ResponseModal';
class Message extends React.Component {
   state={
    matchIdRight:'',
    password:'',
    roomId:'',
    show:false,
    response:'',
    title:'',
    loading:false
   }
   handleClose =() => {
    this.setState({ show: false });
  }
   handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
   postMessage = (e) => {
      e.preventDefault();
      this.setState({ loading:true});
      sendMessage(this.state.matchIdRight, this.state.password, this.state.roomId)
      .then(response =>{
        console.log(response);
       if(response.status === 200){
          this.setState({
            show:true,
            response: response.data,
            title:'RESPONSE',
            loading:false
          })
        }else{
          this.setState({
            show:true,
            response: response.data,
            title:'ERROR',
            loading:false
          })
        }
      })
      .catch(error =>{
        console.log(`error:${error}`);
      this.setState({
        show:true,
        response:error,
        title:'ERROR',
        loading:false
      })
      })
   }
    render(){
    return (
        <Col className='col-message'>
        <form className="Message-form" onSubmit={this.postMessage}>
        <Row>
          <text style={{margin:3,padding:3, fontWeight:'400', fontSize:24}}>SEND ROOM ID AND PASSWORD</text>   
          </Row>
     <Row className='fields'> 
        <TextField
       id="outlined-adornment-weight"
       variant="outlined"
       label="MatchId"
       value={this.state.matchIdRight}
       onChange={this.handleChange('matchIdRight')}
     />
     </Row>
     <Row className='fields'> 
        <TextField
       id="outlined-adornment-weight"
       variant="outlined"
       label="roomId"
       value={this.state.roomId}
       onChange={this.handleChange('roomId')}
     />
     </Row>
     <Row className='fields'> 
        <TextField
       id="outlined-adornment-weight"
       variant="outlined"
       label="password"
       value={this.state.password}
       onChange={this.handleChange('password')}
     />
     </Row>
     <Row className='fields'>
     <button
         style={{ 
     width: 130,
     height: 36,
     marginTop:5,
     marginRight: 15,
     backgroundColor: 'transparent',
     borderColor: '#2d2727',
     borderWidth: 2,
     justifyContent: 'center',
     borderRadius: 3,}}
           title='submit'
         >Send Message</button>
     </Row>
     </form>
     <LoadingScreen
    loading={this.state.loading}
    bgColor={'transparent'}
    spinnerColor='#9ee5f8'
       /> 
     <ResponseModal show={this.state.show} title={this.state.title} error={this.state.response} onHide={this.handleClose} onClick={this.handleClose} />  
        </Col>     
    )
    }

}

export default Message;