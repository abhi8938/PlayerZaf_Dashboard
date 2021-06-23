import React from 'react';
import TextField from '@material-ui/core/TextField';
import './App.css';
import { Row, Col } from 'reactstrap';
import { createUserToken } from './requests';
const title = {
  pageTitle: 'PlayerZaf Control Panel',
};

class Login extends React.Component {
  state={
    Email:'',
    password:''
  }
  
   
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  loginUser = (e) =>{
    e.preventDefault();
    console.log(this.props);
    createUserToken(this.state.Email, this.state.password)
                     .then(response =>{
                        if(response.status === 200){
                        localStorage.setItem('Token', response.data );
                        this.props.history.push('/home');
                      }else{
                         alert(response.data);
                      }
                     })
                     .catch(error =>{
                        console.log(`ERROR:${error}`);
                     })
  }
  render() {
    return (
      <div className='App' style={{ padding:20}}>
      <text style={{ margin:3,padding:3, fontWeight:'600', fontSize:24}}>{title.pageTitle}</text>
    <div className='firstContainer'>
    <Row>
    <text style={{margin:3,padding:3, fontWeight:'400', fontSize:26}}>Login Page</text>
    </Row>
    <Row className='firstContainer'>
        <form className="Message-form" onSubmit={this.loginUser}>
     <Row className='fields'> 
        <TextField
        style={{ width:220}}
       id="outlined-dense"
       variant="outlined"
       label="EMAIL"
       value={this.state.Email}
       onChange={this.handleChange('Email')}
     />
     </Row>
     <Row className='fields'> 
        <TextField
        type="password"
        style={{ width:220}}
       id="outlined-dense"
       variant="outlined"
       label="PASSWORD"
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
     borderRadius: 3}}
         >Login</button>
     </Row>
     </form>  
        </Row>     
    </div>  
    
   </div>
    )
  }
}
export default Login;