import {createStore, applyMiddleware, combineReducers} from "redux";
import logger from "redux-logger";
import thunk from  "redux-thunk";
import axios from "axios";


// create constant of action name
// const init = "account/init";
const inc = "account/increment";
const dec ="account/decrement";
const incByAmt ="account/incrementByAmount";
const getAccUserPending = "account/getUser/pending";
const getAccUserFulFilled = "account/getUser/fulfilled";
const getAccUserRejected = "account/getUser/rejected";
const incBonus = "bonus/increment"


// create store
const store = createStore (
    combineReducers({
        account:accountReducer,
        bonus:bonusReducer
    }), 
    applyMiddleware(logger.default, thunk.default));
// const histry = []



// create reducer function
function accountReducer (state={amount:1},action){
    switch(action.type){
        case getAccUserFulFilled:
            return {amount: action.payload, pending:false};
        case getAccUserRejected:
            return {...state, error:action.error, pending:false};
        case getAccUserPending:
            return {...state, pending:true};
        case inc:
            return {amount: state.amount + 1}
        case dec:
            return {amount: state.amount - 1};
        case incByAmt:
            return {amount: state.amount+action.payload};
        default:
            return state;
    }
}

function bonusReducer (state={points:0},action){
    switch(action.type){
        case incBonus:
           return {points: state.points + 1}
        case incByAmt:
           if (action.payload >= 100) 
            return {points: state.points + 1};
        default:
            return state;
    }
}



//global state
// store.subscribe(()=>{
//     histry.push(store.getState());
//     console.log(histry);
// })

//Async API CALL
// async function getUser() {
//   const {data} = await axios.get('http://localhost:3000/account/1');
//   console.log(data);
// }
// getUser()

//action creator
 function getUserAccount(id){
    return async(dispatch,getState) => {
        try {
            dispatch(getAccountUserPending())
            const {data} = await axios.get(`http://localhost:3000/account/${id}`);
            dispatch(getAccountUserFulFilled(data.amount))
        } catch (error) {
            dispatch(getAccountUserRejected(error.message));
        }
    }
}

function getAccountUserFulFilled(value) {
   return {type:getAccUserFulFilled, payload:value}
}

function getAccountUserRejected(error) {
    return {type:getAccUserRejected, error:error}
 }

function getAccountUserPending() {
    return {type:getAccUserPending }
 }

function incrementFun() {
    return {type:inc}
}

function decrementFun() {
    return {type:dec}
}

function incrementByAmountFun(value) {
    return {type:incByAmt, payload:value}
}

function incrementBonus() {
    return {type:incBonus}
}

setTimeout(()=>{
    //dispatch the action
    // store.dispatch({type:'decrement'});
    //   store.dispatch(decrementFun());
    //   store.dispatch(incrementByAmountFun(100))
      store.dispatch(getUserAccount(2))
    // store.dispatch(incrementFun());
    // store.dispatch(incrementBonus())

},2000)
// create action
