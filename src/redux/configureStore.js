import {createStore,combineReducers,applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { Comments } from './comments';
import { Promotions } from './promotions';
import { Leaders } from './leaders';
import { Dishes} from './dishes';
import thunk from "redux-thunk";
import { InitialFeedback } from './forms';
import logger from "redux-logger";


export const ConfigureStore =() =>{
    const store= createStore(
             combineReducers({
                 dishes:Dishes,
                 comments:Comments,
                 leaders:Leaders,
                 promotions:Promotions,
                 ...createForms({
                    feedback: InitialFeedback
                })
             }), applyMiddleware(thunk,logger)
    );
    return store;
}