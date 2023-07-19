import {  createStore,applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

// create acrion name constants

const getPostPending = "posts/pending";
const getPostFulFilled = "posts/fulfilled";
const getPostRejected = "posts/rejected";

// create store
const store = createStore(
    reducer, 
    applyMiddleware(logger.default, thunk.default));


// create reducer function

function reducer(state={posts:[]},action) {
    switch (action.type) {
        case getPostFulFilled:
            return{posts:action.payload, pending:false};
        case getPostRejected:
            return{...state, error:action.error, pending:false}
        case getPostPending:
            return{...state, pending:true}
        default:
            return state;
    }
}


// action creator

async function getPost(dispatch,getState){
    try {
        dispatch(getPostPendingF())
        const {data} =await axios.get(`https://jsonplaceholder.typicode.com/posts/1`)
        dispatch(getPostFulFilledF(data));

    } catch (error) {
        dispatch(getPostRejectedF(error.message));
    }
   }


function getPostFulFilledF(value) {
    return {type:getPostFulFilled, payload:value}
 }
 
 function getPostRejectedF(error) {
     return {type:getPostRejected, error:error}
  }
 
 function getPostPendingF() {
     return {type:getPostPending }
  }


  setTimeout(()=>{
  store.dispatch(getPost); 
  },2000)




