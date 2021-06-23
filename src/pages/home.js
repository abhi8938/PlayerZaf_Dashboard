import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import HostMatch from './../components/HostMatch';
import Message from './../components/message';

const title = {
  pageTitle: 'PlayerZaf Control Panel',
};
const loading = {
  margin: '1em',
  fontSize:'24px',
  padding:15
};
class Home extends React.Component {
  state={
    isLoading:false,
    error:false,
  }
  componentDidMount(){
    const token = localStorage.getItem('Token');
    console.log(token);

    if(token != null){
      this.setState({
        isLoading:false,
        error:false
      });
    }else{
      this.setState({
        isLoading:false,
        error:true
    });
  }
  }
  render() {
    console.log(this);
    if(this.state.error){
      return(
        <div className='App'>
          <div style={loading}>
           <h4>Not Authorised. Please Login Again</h4>
          </div>
        </div>
      )
    }else{
    return (
         <div className='App' style={{ padding:20}}>
            <text style={{ margin:3,padding:3, fontWeight:'600', fontSize:24}}>{title.pageTitle}</text>
            <Row className="NavBar">
            <Col>
               <Row className="NavLeft">
               <Col style={ {padding:10}}>
               <NavLink to="/home" style={{  fontSize:20}} activeClassName="Active">
                Home
               </NavLink>
               </Col>
               <Col style={ {padding:10}}>
               <NavLink to="/result" style={{ fontSize:20}} activeClassName="Active">
                Result
               </NavLink>
               </Col>
               </Row> 
            </Col>
            <div className="NavLeft">
            <Col className="NavRight">
            <div style={{padding:10}}>
            <Link to="/" style={{ color:'#000', fontSize:20}} onClick={() =>{
              localStorage.clear();
            }}>Log Out</Link>
            </div>
            </Col>
            </div>
          </Row>
          <Row className='Container'>
          <HostMatch/>
          <Message />
          </Row>  
         </div>
    )
  }
  }
}
export default Home;