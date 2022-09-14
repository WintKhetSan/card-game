import { combineReducers } from "@reduxjs/toolkit";
import GameSlice from './slices/GameSlice';

const rootReducer = combineReducers({
   game: GameSlice,
});

export default rootReducer;

