import  { createSlice } from '@reduxjs/toolkit';
import { generateCardNumberPairs } from '../../utilities/GenerateCardData';
import { CARD_PAIRS_VALUE } from '../../Config';

const initialState = {
    moveCount: 0,
    totalSteps: 0,
    data: [],
    isWin: false,
}

const GameSlice = createSlice({
    name: 'card-game',
    initialState,
    reducers: {
        gameStarted: (state, action) => {
            const { payload } = action;
            state.moveCount = 0;
            state.totalSteps = 0;
            state.data = payload;
            state.isWin = false;
        },
        itemSelected: (state, action) => {
            const { payload } = action;
            state.data = state.data.map((item) => item.id === payload ? { ...item, selected: true} : item);
            state.moveCount++;
            state.totalSteps++;
        },
        itemMatched: (state, action) => {
            const { payload } = action;
            state.data = state.data.map((item) => item.value === payload ? { ...item, selected: false, matched: true} : { ...item, selected: false });
            state.moveCount = 0;
            state.totalSteps++;
            if (state.data.every((item) => item.matched)) state.isWin = true;
        },
        itemNotMatched: (state) => {
            state.moveCount = 0;
            state.totalSteps++;
            state.data = state.data.map((item) => ({ ...item, selected: false}));
        }
    }
});

export const { gameStarted, itemSelected, itemMatched, itemNotMatched } = GameSlice.actions;
export default GameSlice.reducer;


const isValidCardPair = Number.isInteger(CARD_PAIRS_VALUE) && CARD_PAIRS_VALUE >=1 && CARD_PAIRS_VALUE <= 100;

export const startGame = () => (dispatch) => {
    if(!isValidCardPair) return console.error('unknow error -> err', new Date())

    const data =  generateCardNumberPairs(CARD_PAIRS_VALUE);
    return dispatch(gameStarted(data));
}

export const selectItem = (item) => (dispatch, getState) => {
    const { moveCount, data } = getState().game;
    const currentSelected = data.find((item) => item.selected);

    if(currentSelected && currentSelected.id === item.id) return;
    if(moveCount === 0) return dispatch(itemSelected(item.id));
    if(currentSelected && currentSelected.value === item.value) return dispatch(itemMatched(item.value));
    return dispatch(itemNotMatched());
}