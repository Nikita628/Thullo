import { Card } from "../models/card";
import { IPayloadedAction, ITypedAction } from "./common";
import { actionTypes as boardActionTypes } from "./board";
import { BoardList } from "../models/boardList";

export const actionTypes = {
    moveCardToList: "card/moveCardToList",
    moveCardToListSucceeded: "card/moveCardToListSucceeded",
    createCard: "card/createCard",
    createCardSucceeded: "card/createCardSucceeded",
    getCard: "card/getCard",
    getCardSucceeded: "card/getCardSucceeded",
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
    CreateCard: (card: Card): ITypedAction & IPayloadedAction<Card> => ({
        type: actionTypes.createCard,
        payload: card,
    }),
    CreateCardSucceeded: (card: Card): ITypedAction & IPayloadedAction<Card> => ({
        type: actionTypes.createCardSucceeded,
        payload: card,
    }),
    GetCard: (cardId: number): ITypedAction & IPayloadedAction<number> => ({
        type: actionTypes.getCard,
        payload: cardId,
    }),
    GetCardSucceeded: (card: Card): ITypedAction & IPayloadedAction<Card> => ({
        type: actionTypes.getCardSucceeded,
        payload: card,
    })
};

export interface CardState {
    boardCards: Card[];
    card: Card;
}

const initialState: CardState = {
    boardCards: [],
    card: null,
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
            };
        }
        case actionTypes.createCardSucceeded: {
            return {
                ...state,
                boardCards: [...state.boardCards, action.payload],
            };
        }
        case actionTypes.getCardSucceeded: {
            return {
                ...state,
                card: action.payload,
            };
        }
        default:
            return state;
    }
};
