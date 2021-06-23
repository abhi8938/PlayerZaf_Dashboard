import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { addResult, fetchParticipants } from '../requests';
import { Button } from '@material-ui/core';
import ResponseModal from '../components/ResponseModal';

const title = {
  pageTitle: 'PlayerZaf Control Panel',
};
const loading = {
  margin: '1em',
  fontSize:'24px',
  padding:15
};


const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class Result extends React.Component {
  state={
    showTable:false,
    isLoading:false,
    error:false,
    matchId:'',
    show:false,
    response:'',
    title:'',
    playerTable: []
  }
  handleClose =() => {
    this.setState({ show: false });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  componentDidMount(){
    const token = localStorage.getItem('Token');

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

  getParticipants = (e) =>{
    e.preventDefault();

    fetchParticipants(this.state.matchId)
    .then(response =>{
      const participants = response;
      participants.forEach( participant =>{
        console.log(participant);
            const index = participants.indexOf(participant) + 1;
            this.state.playerTable.push({
              id: index,
              matchId:participant.matchId,
              playerName:participant.playerName,
              totalKills:0,
              winner:false,
              rank:0,
              mobileNumber:participant.mobileNumber
            });
          });
      
      this.setState({
        showTable:true
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  postResult = (e) => {
    e.preventDefault();
  
    const playerResults = this.state.playerTable;
    addResult(this.state.matchId, playerResults)
    .then(response => {
      if(response.staus === 200){
        this.setState({
          show:true,
          response: response.data,
          title:'RESPONSE'
        })
      }else{
        this.setState({
          show:true,
          response: response.data,
          title:'ERROR'
        })
      }
    })
    .catch(error => {
     
      this.setState({
        show:true,
        response:error,
        title:'ERROR'
      })
    })
  }
  render() {
    if(this.state.error){
      return(
        <div className='App'>
          <div style={loading}>
           <h4>Not Authorised. Please Login Again</h4>
          </div>
        </div>
      )
    }else{
      if(this.state.showTable === true){
    return (
      <div className='App2' style={{ padding:20, flex:1, height:4000}}>
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
          <Row className='firstContainer'>
          <div>
          <Row>
            <text style={{margin:3,padding:15, fontWeight:'400', fontSize:26}}>Post Result</text>
          </Row>
          <Row style={{ padding:15}}>
          <Button
          style={{
            opacity:0.9,
            backgroundColor:'#d3d3d3',
            padding:5,
        width: 145,
        height: 40,
        borderRadius:4,
        marginTop:5,
        marginRight: 15,
        fontWeight:'bold',
        color:'#000'
          }} onClick={() => {
            this.setState({
               showTable:false,
               isLoading:false,
               error:false,
               matchId:'',
               show:false,
               response:'',
               title:'',
               playerTable: []
          })}}>Change MatchId</Button>
          </Row>
          </div>
          <div>
         <BootstrapTable containerStyle={{ backgroundColor:'#ffffff'}} data={this.state.playerTable} version='4' cellEdit={ cellEditProp }>
           <TableHeaderColumn isKey dataField='id'>Index</TableHeaderColumn>
           <TableHeaderColumn editable={false} dataField='matchId'>MatchId</TableHeaderColumn>
           <TableHeaderColumn editable={false} dataField='playerName'>PlayerName</TableHeaderColumn>
           <TableHeaderColumn dataField='totalKills'>Total Kills</TableHeaderColumn>
           <TableHeaderColumn dataField='winner'>Winner</TableHeaderColumn>
           <TableHeaderColumn dataField='rank'>Rank</TableHeaderColumn>
           <TableHeaderColumn dataField='mobileNumber'>Number</TableHeaderColumn>
         </BootstrapTable>
         </div>
         <button  style={{
            opacity:0.9,
            background:'transparent',
            padding:5,
        width: 110,
        height: 40,
        borderColor: '#206398',
        borderWidth: 2,
        borderRadius:4,
        marginTop:5,
        marginRight: 15,
        fontWeight:'bold',
        color:'#000'
          }} onClick={this.postResult} >submit</button> 
          </Row>
          <ResponseModal show={this.state.show} title={this.state.title} error={this.state.response} onHide={this.handleClose} onClick={this.handleClose} /> 
         </div>
    )
  }else{
    return(
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
      <Row>
            <text style={{margin:3,padding:15, fontWeight:'400', fontSize:26}}>Get Participants</text>
          </Row>
          <Row style={{ borderWidth:5, borderColor: '#A9A9A9', padding:5,flex:1}}>
             <TextField
             style={{ margin:5, width:220}}
              id="matchId"
              label="MatchID"
              onChange={this.handleChange('matchId')}
              value={this.state.matchId}
            />
            </Row>
      <Row>
          <Button
          style={{
            opacity:0.9,
            backgroundColor:'#d3d3d3',
            padding:5,
        width: 145,
        height: 40,
        borderRadius:4,
        marginTop:5,
        marginRight: 15,
        fontWeight:'bold',
        color:'#000'
          }} onClick={this.getParticipants}
             >Load</Button>
          </Row>
      </div>
    )
  }
  }
}
}
export default Result;