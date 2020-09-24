import { ApiPageResponse } from "../models/common";
import { User, UserSearchParam } from "../models/user";
import { IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    UserSearchRequested: "user/userSearchRequested",
    UserSearchSucceeded: "user/userSearchSucceeded",
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
};

export interface UserState {
    usersPage: ApiPageResponse<User>;
}

const initialState: UserState = {
    usersPage: null,
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
        default:
            return state;
    }
};
