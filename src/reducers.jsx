import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

export  function user_data(state = {isAuth:false,auth_user:null,hasData:false,data:[]},action)
{
    switch(action.type){
      case "ADD_USER":
       return {...state,hasData:true,data: [...state.data, action.payload]}
     case "AUTH_USER":
      return {...state,isAuth:true,auth_user: action.payload}
     case "LOGOUT_USER":
       return {...state,isAuth:false,auth_user: {}}
     default:
        return state;
    }
}



const rootReducer  = combineReducers({
    form            : formReducer,
    user_data      : user_data
});

export default rootReducer;
