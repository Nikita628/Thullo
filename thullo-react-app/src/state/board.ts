import { Board, BoardSearchParam } from "../models/board";
import { ApiPageResponse } from "../models/common";
import { ICallbackAction, IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    searchBoardRequested: "board/searchBoardRequested",
    searchBoardSucceeded: "board/searchBoardSucceeded",
    createBoardRequested: "board/createBoardRequested",
};

export const actionCreators = {
    SearchBoardRequested: (param: BoardSearchParam, appendToExistingBoardPage: boolean)
        : IPayloadedAction<{ param: BoardSearchParam, appendToExistingBoardPage: boolean }> & ITypedAction => ({
            type: actionTypes.searchBoardRequested,
            payload: {
                param: param,
                appendToExistingBoardPage: appendToExistingBoardPage,
            },
        }),
    SearchBoardSucceeded: (boards: ApiPageResponse<Board>, appendToExistingBoardPage: boolean)
        : IPayloadedAction<{ boards: ApiPageResponse<Board>, appendToExistingBoardPage: boolean }> & ITypedAction => ({
            type: actionTypes.searchBoardSucceeded,
            payload: {
                boards: boards,
                appendToExistingBoardPage: appendToExistingBoardPage,
            },
        }),
    CreateBoardRequested: (board: Board, callback: () => void): ITypedAction & IPayloadedAction<Board> & ICallbackAction => ({
        type: actionTypes.createBoardRequested,
        payload: board,
        callback: callback
    }),
};

export interface BoardState {
    boardsPage: ApiPageResponse<Board>;
}

const initialState: BoardState = {
    boardsPage: new ApiPageResponse<Board>(),
};

export const reducer = (state: BoardState = initialState, action: ITypedAction & IPayloadedAction): BoardState => {
    switch (action.type) {
        case actionTypes.searchBoardSucceeded: {
            return {
                ...state,
                boardsPage: {
                    ...state.boardsPage,
                    items: action.payload.appendToExistingBoardPage
                        ? [...state.boardsPage.items, ...action.payload.boards.items]
                        : action.payload.boards.items,
                    totalCount: action.payload.boards.totalCount,
                }
            };
        }
        default:
            return state;
    }
};
