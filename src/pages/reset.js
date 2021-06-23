import React, { Component } from 'react';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import * as qs from 'query-string';
import axios from 'axios';

const title = {
  pageTitle: 'PlayerZaf Password Reset',
};

const loading = {
  margin: '1em',
  fontSize:'24px'
}
class App extends Component {
  state ={
    userName:'',
    password:'',
    confirmPassword:'',
    updated:false,
    isLoading:false,
    error:false
  }
  async componentDidMount(){
    console.log(this.props.location.search);
    const parsed = qs.parse(this.props.location.search,{ ignoreQueryPrefix: true }).token;
console.log(parsed);
    await axios.get('https://playerzaf.herokuapp.com/api/reset',{
      params:{
        resetPasswordToken:parsed
      }
    })
    .then(response => {
      console.log(response);
      if(response.data.message === 'reset link ok'){
        this.setState({
          userName:response.data.userName,
          updated:false,
          isLoading:false,
          error:false
        });
      }else{
        this.setState({
          userName:response.data.userName,
          updated:false,
          isLoading:false,
          error:true
        });
      }
    })
    .catch(error =>{
      console.log(error.data);
    })
  }
   handleChange = name => event => {
     this.setState({
       [name]: event.target.value
     });
   };
  updatePassword = (e) => {
    e.preventDefault();
    if(this.state.password === this.state.confirmPassword){
    axios.put('https://playerzaf.herokuapp.com/api/users/resetPassword',{
      userName: this.state.userName,
      password: this.state.password
    })
    .then(response => {
      console.log('response:'+ response);
      if(response.data.message === 'password updated'){
        this.setState({
          updated:true,
          error: false
        });
      }else{
        this.setState({
          updated: false,
          error:true
        });
      }
    })
    .catch(error =>{
      console.log('error:' + error.data);
    });
  }else{
    this.setState({
      updated: false,
      error:true
    });
  }
  }
  render() {
    const { password, error, isLoading, updated,confirmPassword} = this.state;
    if(error){
      return(
        <div className='App'>
          <text style={{ margin:3,padding:3, fontWeight:'500', fontSize:22}}>{title.pageTitle}</text>
          <div style={loading}>
           <h4>Problem resetting password. please send another reset link.</h4>
          </div>
        </div>
      )
    }else if(isLoading){
      return(
        <div className='App'>
          <text style={{ margin:3,padding:3, fontWeight:'500', fontSize:22}}>{title.pageTitle}</text>
          <div style={loading}>Loading User Data....</div>
        </div>

      )
    }else {
      return(
        <div className='App' style={{ padding:20}}>
          <text style={{ margin:3,padding:3, fontWeight:'500', fontSize:22}}>{title.pageTitle}</text>
          <form className="password-form" onSubmit={this.updatePassword}>
           <div style={{ borderBottomWidth:5, borderColor:'#A9A9A9',flex:1}}>
            <TextField
            style={{margin:5,width:220}}
              id="password"
              label="Password"
              onChange={this.handleChange('password')}
              value={password}
              type="password"
            />
           </div>
            <div style={{ borderWidth:5, borderColor: '#A9A9A9', padding:5,flex:1}}>
             <TextField
             style={{ margin:5, width:220}}
              id="confirmPassword"
              label="Confirm Password"
              onChange={this.handleChange('confirmPassword')}
              value={confirmPassword}
              type="password"
            />
            </div>
            <button
            style={{  flex: 1,
        width: 80,
        height: 36,
        marginTop:5,
        marginRight: 15,
        backgroundColor: 'transparent',
        borderColor: '#206398',
        borderWidth: 2,
        justifyContent: 'center',
        borderRadius: 3,}}
              title='submit'
            >Reset</button>
          </form>
          {updated && (
            <div>
            <p>
              Your password has been successfully reset, please try logging in again.
            </p>
            </div>
          )}
        </div>
      )
    }
  }
}

export default App;
