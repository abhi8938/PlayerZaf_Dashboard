import  React  from 'react';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import { Row, Col } from 'reactstrap';
import { createMatch } from './../requests';
import ResponseModal from './ResponseModal';

class HostMatch extends React.Component {
   state={
    matchIdLeft:'',
    matchTitle:'',
    matchTime:'',
    matchDate:'',
    matchWinPrize:'',
    matchPerKill:'',
    matchEntryFee:'',
    matchType:'',
    matchVersion:'',
    matchMap:'',
    show:false,
    response:'',
    title:''
   }
  handleClose =() => {
    this.setState({ show: false });
  }

   handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  postMatches = (e) => {
    e.preventDefault();
    const { matchIdLeft,
    matchTitle,
    matchTime,
    matchDate,
    matchWinPrize,
    matchPerKill,
    matchEntryFee,
    matchType,
    matchVersion,
    matchMap
   } = this.state;


    createMatch(
      matchIdLeft,
    matchTitle,
    matchTime,
    matchDate,
    matchWinPrize,
    matchPerKill,
    matchEntryFee,
    matchType,
    matchVersion,
    matchMap
    ).then(response =>{
        console.log(`response:${response}`);
        if(response.status === 200){
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
      console.log(`error:${error}`);
      this.setState({
        show:true,
        response:error,
        title:'ERROR'
      })
    })
  }

    render(){
    return (
        <Col className='col-match'>
        <form className="Host-form" onSubmit={this.postMatches}>
        <Row>
         <text style={{margin:3,padding:3, fontWeight:'400', fontSize:26}}>HOST MATCHES</text>
         </Row>
         <Row className='fields'>
         <Col className='input'> 
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchId"
        value={this.state.matchIdLeft}
        onChange={this.handleChange('matchIdLeft')}
      />
      </Col>
      <Col className='input'>
       <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchTitle"
        value={this.state.matchTitle}
        onChange={this.handleChange('matchTitle')}
      />
      </Col>
      </Row>
      <Row className='fields'> 
      <Col>
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchTime"
        value={this.state.matchTime}
        onChange={this.handleChange('matchTime')}
      />
      </Col>
      <Col>
       <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchDate"
        value={this.state.matchDate}
        onChange={this.handleChange('matchDate')}
      />
      </Col>
      </Row>
      <Row className='fields'>
      <Col> 
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchWinPrize"
        value={this.state.matchWinPrize}
        onChange={this.handleChange('matchWinPrize')}
      />
      </Col>
      <Col>
       <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchPerKill"
        value={this.state.matchPerKill}
        onChange={this.handleChange('matchPerKill')}
       />
      </Col>
      </Row>
      <Row className='fields'> 
      <Col>
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchEntryFee"
        value={this.state.matchEntryFee}
        onChange={this.handleChange('matchEntryFee')}
      />
      </Col>
      <Col>
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchType"
        value={this.state.matchType}
        onChange={this.handleChange('matchType')}
      />
      </Col>
      </Row>
      <Row className='fields'> 
      <Col>
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchVersion"
        value={this.state.matchVersion}
        onChange={this.handleChange('matchVersion')}
      />
      </Col>
      <Col>
         <TextField
        id="outlined-adornment-weight"
        variant="outlined"
        label="MatchMap"
        value={this.state.matchMap}
        onChange={this.handleChange('matchMap')}
      />
      </Col>
      </Row>
      <Row>
      <button
          style={{ 
      width: 80,
      height: 36,
      marginTop:5,
      marginRight: 15,
      backgroundColor: 'transparent',
      borderColor: '#2d2727',
      borderWidth: 2,
      justifyContent: 'center',
      borderRadius: 3}}
            title='submit'
          >Submit</button>
      </Row>
      </form>
      <ResponseModal show={this.state.show} title={this.state.title} error={this.state.response} onHide={this.handleClose} onClick={this.handleClose} />
        </Col>
    )
    }

}

export default HostMatch;