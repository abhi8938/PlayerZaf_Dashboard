import axios from 'axios';


export const fetchParticipants= async (
    matchId
) => {
    const token = localStorage.getItem('Token');
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': token,
                   'matchid':matchId },
        data:{}
    };
   return axios.get('https://playerzaf.herokuapp.com/api/participants',config)
    .then( response =>{
    return response.data;
    })
    .catch( error => {
       return error.response.data;
    })
}

export const addResult = async (
    matchId,
    playerResults
) => {
    console.log(playerResults);
    const token = localStorage.getItem('Token');
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': token},
        data:{}
    };
   return axios.post('https://playerzaf.herokuapp.com/api/results',{
         matchId: matchId,
         playerResults:playerResults
    },config)
    .then( response =>{
    return response;
    })
    .catch( error => {
       return error.response;
    })
}



export const createUserToken = async (
    emailAddress,
    password
) => {
    console.log(emailAddress, password);
   return axios.post('https://playerzaf.herokuapp.com/api/auth',{
         emailAddress: emailAddress,
         password: password
    })
    .then( response =>{
        // console.log(response.data);
    return response;
    })
    .catch( error => {
       return error.response;
    } )
}

export const createMatch = async (
    matchIdLeft,
    matchTitle,
    matchTime,
    matchDate,
    matchWinPrize,
    matchPerKill,
    matchEntryFee,
    matchType,
    matchVersion,
    matchMap,
) => {
    const token = localStorage.getItem('Token');
    
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': token},
        data:{}
    };
   return axios.post('https://playerzaf.herokuapp.com/api/matchDetails',{
    "matchId":matchIdLeft,
    "matchTitle": matchTitle,
    "matchTime": matchTime,
    "matchDate": matchDate,
    "matchWinPrize": parseInt(matchWinPrize),
    "matchPerkill": parseInt(matchPerKill),
    "matchEntryFee": parseInt(matchEntryFee),
    "matchType": matchType,
    "matchVersion": matchVersion,
    "matchMap": matchMap
    },config)
    .then( response =>{
        // console.log(response);
    return response
    })
    .catch( error => {
       return error.response;
    } )
}

export const sendMessage = async (
    matchIdRight,
    password,
    roomId
) => {
    const token = localStorage.getItem('Token');
    
    var config = {
        headers: {'Content-Type': 'application/json',
                   'x-auth-token': token},
        data:{}
    }
   return axios.post('https://playerzaf.herokuapp.com/api/sendMessage',{
    matchId:matchIdRight,
    password:password,
    roomId:roomId
    },config)
    .then( response =>{
        // console.log(response.data);
    return response;
    })
    .catch( error => {
       return error.response;
    } )
}