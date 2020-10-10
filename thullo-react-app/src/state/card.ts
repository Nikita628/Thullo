import { Card } from "../models/card";
import { IPayloadedAction, ITypedAction } from "./common";
import { actionTypes as boardActionTypes } from "./board";
import { BoardList } from "../models/boardList";

export const actionTypes = {
    moveCardToList: "card/moveCardToList",
    moveCardToListSucceeded: "card/moveCardToListSucceeded"
};

export const actionCreators = {
    MoveCardToList: (cardId: number, futureListId: number): ITypedAction & IPayloadedAction<{ cardId: number, futureListId: number }> => ({
        type: actionTypes.moveCardToList,
        payload: {
            cardId,
            futureListId
        },
    }),
    MoveCardToListSucceeded: (cardId: number, futureListId: number): ITypedAction & IPayloadedAction<{ cardId: number, futureListId: number }> => ({
        type: actionTypes.moveCardToListSucceeded,
        payload: {
            cardId,
            futureListId
        },
    }),
};

export interface CardState {
    boardCards: Card[];
}

const initialState: CardState = {
    boardCards: [],
};

export const reducer = (state: CardState = initialState, action: ITypedAction & IPayloadedAction): CardState => {
    switch (action.type) {
        case boardActionTypes.getBoardSucceeded: {
            const boardLists: BoardList[] = action.payload.boardLists;
            const cards: Card[] = [];
            boardLists.forEach(bl => cards.push(...bl.cards));
            return {
                ...state,
                boardCards: cards,
            };
        }
        case actionTypes.moveCardToListSucceeded: {
            return {
                ...state,
                boardCards: state.boardCards.map(c => {
                    if (c.id === action.payload.cardId) {
                        return { ...c, boardListId: action.payload.futureListId };
                    }
                    return c;
                })
            }
        }
        default:
            return state;
    }
};
