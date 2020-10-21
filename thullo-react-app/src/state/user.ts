import { ApiPageResponse } from "../models/common";
import { User, UserSearchParam } from "../models/user";
import { IPayloadedAction, ITypedAction } from "./common";
import { actionTypes as boardActionTypes } from "./board";

export const actionTypes = {
    UserSearchRequested: "user/userSearchRequested",
    UserSearchSucceeded: "user/userSearchSucceeded",
    InviteToBoardRequested: "user/inviteToBoardRequested",
    RemoveFromBoardRequested: "user/removeFromBoardRequested",
    RemoveFromBoardSucceeded: "user/removeFromBoardSucceeded",
    InviteToCard: "user/inviteToCard",
    InviteToCardSucceeded: "user/inviteToCardSucceeded",
};

export const actionCreators = {
    UserSearchRequested: (searchParam: UserSearchParam, appendToExistingPage: boolean)
        : ITypedAction & IPayloadedAction<{ searchParam: UserSearchParam, appendToExistingPage: boolean }> => ({
            type: actionTypes.UserSearchRequested,
            payload: {
                searchParam,
                appendToExistingPage
            }
        }),
    UserSearchSucceeded: (page: ApiPageResponse<User>, appendToExistingPage: boolean)
        : ITypedAction & IPayloadedAction<{ page: ApiPageResponse<User>, appendToExistingPage: boolean }> => ({
            type: actionTypes.UserSearchSucceeded,
            payload: {
                page,
                appendToExistingPage,
            },
        }),
    InviteToBoardRequested: (userId: number, boardId: number): ITypedAction & IPayloadedAction<{ userId: number, boardId: number }> => ({
        type: actionTypes.InviteToBoardRequested,
        payload: {
            userId,
            boardId,
        }
    }),
    RemoveFromBoardRequested: (userId: number, boardId: number): ITypedAction & IPayloadedAction<{ userId: number, boardId: number }> => ({
        type: actionTypes.RemoveFromBoardRequested,
        payload: {
            userId,
            boardId,
        }
    }),
    RemoveFromBoardSucceeded: (userId: number, boardId: number): ITypedAction & IPayloadedAction<{ userId: number, boardId: number }> => ({
        type: actionTypes.RemoveFromBoardSucceeded,
        payload: {
            userId,
            boardId,
        }
    }),
    InviteToCard: (user: User, cardId: number): ITypedAction & IPayloadedAction<{ user: User, cardId: number }> => ({
        type: actionTypes.InviteToCard,
        payload: {
            user,
            cardId,
        }
    }),
    InviteToCardSucceeded: (user: User, cardId: number): ITypedAction & IPayloadedAction<{ user: User, cardId: number }> => ({
        type: actionTypes.InviteToCardSucceeded,
        payload: {
            user,
            cardId,
        }
    }),
};

export interface UserState {
    usersPage: ApiPageResponse<User>;
    boardUsers: User[];
}

const initialState: UserState = {
    usersPage: null,
    boardUsers: [],
};

export const reducer = (state: UserState = initialState, action: ITypedAction & IPayloadedAction): UserState => {
    switch (action.type) {
        case actionTypes.UserSearchSucceeded: {
            return {
                ...state,
                usersPage: {
                    ...action.payload.page,
                    items: action.payload.appendToExistingPage
                        ? [...state.usersPage.items, ...action.payload.page.items]
                        : action.payload.page.items
                }
            };
        }
        case actionTypes.RemoveFromBoardSucceeded: {
            return {
                ...state,
                boardUsers: state.boardUsers.filter(u => u.id !== action.payload.userId)
            };
        }
        case boardActionTypes.getBoardSucceeded: {
            return {
                ...state,
                boardUsers: action.payload.users,
            };
        }
        default:
            return state;
    }
};
