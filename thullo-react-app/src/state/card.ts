import { Card, CardAttachment, CardComment, CardLabel } from "../models/card";
import { IPayloadedAction, ITypedAction } from "./common";
import { actionTypes as boardActionTypes } from "./board";
import { BoardList } from "../models/boardList";
import {  actionTypes as userActionTypes } from "./user";

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
    updateCardCoverUrlSucceeded: "card/updateCardCoverUrlSucceeded",
    addLabel: "card/addLabel",
    addLabelSucceeded: "card/addLabelSucceeded",
    createComment: "card/createComment",
    createCommentSucceeded: "card/createCommentSucceeded",
    updateCommentText: "card/editCommentText",
    updateCommentTextSucceeded: "card/editCommentTextSucceeded",
    deleteComment: "card/deleteComment",
    deleteCommentSucceeded: "card/deleteCommentSucceeded",
    createAttachment: "card/createAttachment",
    createAttachmentSucceeded: "card/createAttachmentSucceeded",
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
    AddLabel: (cardId: number, label: CardLabel): ITypedAction & IPayloadedAction<{cardId: number, label: CardLabel}> => ({
        type: actionTypes.addLabel,
        payload: {
            cardId,
            label,
        }
    }),
    AddLabelSucceeded: (cardId: number, label: CardLabel): ITypedAction & IPayloadedAction<{cardId: number, label: CardLabel}> => ({
        type: actionTypes.addLabelSucceeded,
        payload: {
            cardId,
            label,
        }
    }),
    CreateComment: (comment: CardComment): ITypedAction & IPayloadedAction<CardComment> => ({
        type: actionTypes.createComment,
        payload: comment
    }),
    CreateCommentSucceeded: (comment: CardComment): ITypedAction & IPayloadedAction<CardComment> => ({
        type: actionTypes.createCommentSucceeded,
        payload: comment
    }),
    UpdateCommentText: (commentId: number, text: string): ITypedAction & IPayloadedAction<{commentId: number, text: string}> => ({
        type: actionTypes.updateCommentText,
        payload: {
            commentId,
            text,
        }
    }),
    UpdateCommentTextSucceeded: (commentId: number, text: string): ITypedAction & IPayloadedAction<{commentId: number, text: string}> => ({
        type: actionTypes.updateCommentTextSucceeded,
        payload: {
            commentId,
            text,
        }
    }),
    DeleteComment: (commentId: number, cardId: number): ITypedAction & IPayloadedAction<{commentId: number, cardId: number}> => ({
        type: actionTypes.deleteComment,
        payload: {
            commentId,
            cardId
        }
    }),
    DeleteCommentSucceeded: (commentId: number, cardId: number): ITypedAction & IPayloadedAction<{commentId: number, cardId: number}> => ({
        type: actionTypes.deleteCommentSucceeded,
        payload: {
            commentId,
            cardId
        }
    }),
    CreateAttachment: (cardId: number, file: File): ITypedAction & IPayloadedAction<{cardId: number, file: File}> => ({
        type: actionTypes.createAttachment,
        payload: {
            cardId,
            file
        }
    }),
    CreateAttachmentSucceeded: (attachment: CardAttachment): ITypedAction & IPayloadedAction<CardAttachment> => ({
        type: actionTypes.createAttachmentSucceeded,
        payload: attachment
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
        case actionTypes.addLabelSucceeded: {
            return {
                ...state,
                card: { 
                    ...state.card, 
                    labels: [...state.card.labels, action.payload.label]
                },
                boardCards: state.boardCards.map(bc => {
                    if (bc.id === action.payload.cardId) {
                        return { 
                            ...bc,
                            labels: [...bc.labels, action.payload.label]
                        };
                    }
                    return bc;
                })
            };
        }
        case userActionTypes.InviteToCardSucceeded: {
            const updatedState = {
                ...state,
                boardCards: state.boardCards.map(bc => {
                    if (bc.id === action.payload.cardId) {
                        return {
                            ...bc,
                            users: [...bc.users, action.payload.user]
                        };
                    }
                    return bc;
                }),
            };
            if (state.card && state.card.id === action.payload.cardId) {
                updatedState.card = {
                    ...state.card,
                    users: [...state.card.users, action.payload.user]
                };
            }
            return updatedState;
        }
        case actionTypes.createCommentSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    comments: [...state.card.comments, action.payload]
                },
                boardCards: state.boardCards.map(bc =>
                    bc.id === action.payload.cardId
                        ? { ...bc, comments: [...bc.comments, action.payload] }
                        : bc
                )
            };
        }
        case actionTypes.updateCommentTextSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    comments: state.card.comments.map(c =>
                        c.id === action.payload.commentId
                            ? { ...c, text: action.payload.text }
                            : c
                    )
                }
            };
        }
        case actionTypes.deleteCommentSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    comments: state.card.comments.filter(c => c.id !== action.payload.commentId)
                },
                boardCards: state.boardCards.map(bc =>
                    bc.id === action.payload.cardId
                        ? { ...bc, comments: bc.comments.filter(c => c.id !== action.payload.commentId) }
                        : bc
                )
            };
        }
        case actionTypes.createAttachmentSucceeded: {
            return {
                ...state,
                card: {
                    ...state.card,
                    attachments: [...state.card.attachments, action.payload]
                },
                boardCards: state.boardCards.map(bc =>
                    bc.id === action.payload.cardId
                        ? { ...bc, attachments: [...bc.attachments, action.payload] }
                        : bc
                )
            }
        }
        default:
            return state;
    }
};
