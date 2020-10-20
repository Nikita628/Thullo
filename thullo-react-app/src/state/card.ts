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
    updateCardTitle: "card/updateCardTitle",
    updateCardTitleSucceeded: "card/updateCardTitleSucceeded",
    updateCardDescription: "card/updateCardDescription",
    updateCardDescriptionSucceeded: "card/updateCardDescriptionSucceeded",
    updateCardCoverUrl: "card/updateCardCoverUrl",
    updateCardCoverUrlSucceeded: "cart/updateCardCoverUrlSucceeded",
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
    }),
    UpdateCardTitle: (cardId: number, title: string): ITypedAction & IPayloadedAction<{ cardId: number, title: string }> => ({
        type: actionTypes.updateCardTitle,
        payload: {
            cardId,
            title
        }
    }),
    UpdateCardTitleSucceeded: (cardId: number, title: string): ITypedAction & IPayloadedAction<{ cardId: number, title: string }> => ({
        type: actionTypes.updateCardTitleSucceeded,
        payload: {
            cardId,
            title
        }
    }),
    UpdateCardDescription: (cardId: number, description: string): ITypedAction & IPayloadedAction<{ cardId: number, description: string }> => ({
        type: actionTypes.updateCardDescription,
        payload: {
            cardId,
            description
        }
    }),
    UpdateCardDescriptionSucceeded: (cardId: number, description: string): ITypedAction & IPayloadedAction<{ cardId: number, description: string }> => ({
        type: actionTypes.updateCardDescriptionSucceeded,
        payload: {
            cardId,
            description
        }
    }),
    UpdateCardCoverUrl: (cardId: number, coverUrl: string): ITypedAction & IPayloadedAction<{ cardId: number, coverUrl: string }> => ({
        type: actionTypes.updateCardCoverUrl,
        payload: {
            cardId,
            coverUrl
        }
    }),
    UpdateCardCoverUrlSucceeded: (cardId: number, coverUrl: string): ITypedAction & IPayloadedAction<{ cardId: number, coverUrl: string }> => ({
        type: actionTypes.updateCardCoverUrlSucceeded,
        payload: {
            cardId,
            coverUrl
        }
    }),
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
        case actionTypes.updateCardTitleSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    title: action.payload.title,
                },
                boardCards: state.boardCards.map(bc =>
                    bc.id === action.payload.cardId
                        ? { ...bc, title: action.payload.title }
                        : bc
                ),
            };
        }
        case actionTypes.updateCardDescriptionSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    description: action.payload.description,
                },
                boardCards: state.boardCards.map(bc =>
                    bc.id === action.payload.cardId
                        ? { ...bc, description: action.payload.description }
                        : bc
                ),
            };
        }
        case actionTypes.updateCardCoverUrlSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    coverUrl: action.payload.coverUrl,
                },
                boardCards: state.boardCards.map(bc =>
                    bc.id === action.payload.cardId
                        ? { ...bc, coverUrl: action.payload.coverUrl }
                        : bc
                ),
            };
        }
        default:
            return state;
    }
};
