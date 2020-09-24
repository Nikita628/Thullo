import { Board, BoardSearchParam } from "../models/board";
import { ApiPageResponse } from "../models/common";
import { ICallbackAction, IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    searchBoardRequested: "board/searchBoardRequested",
    searchBoardSucceeded: "board/searchBoardSucceeded",
    createBoardRequested: "board/createBoardRequested",
    getBoardRequested: "board/getBoardRequested",
    getBoardSucceeded: "board/getBoardSucceeded",
    updateBoardVisibilityRequested: "board/updateBoardVisibilityRequested",
    updateBoardVisibilitySucceeded: "board/updateBoardVisibilitySucceeded",
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
    GetBoardRequested: (boardId: number): ITypedAction & IPayloadedAction<number> => ({
        type: actionTypes.getBoardRequested,
        payload: boardId,
    }),
    GetBoardSucceeded: (board: Board): ITypedAction & IPayloadedAction<Board> => ({
        type: actionTypes.getBoardSucceeded,
        payload: board,
    }),
    UpdateBoardVisibilityRequested: (boardId: number, isPrivate: boolean)
        : ITypedAction & IPayloadedAction<{ boardId: number, isPrivate: boolean }> => ({
            type: actionTypes.updateBoardVisibilityRequested,
            payload: {
                boardId,
                isPrivate,
            }
        }),
    UpdateBoardVisibilitySucceeded: (isPrivate: boolean): ITypedAction & IPayloadedAction<boolean> => ({
        type: actionTypes.updateBoardVisibilitySucceeded,
        payload: isPrivate
    }),
};

export interface BoardState {
    boardsPage: ApiPageResponse<Board>;
    board: Board;
}

const initialState: BoardState = {
    boardsPage: new ApiPageResponse<Board>(),
    board: null,
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
        case actionTypes.getBoardSucceeded: {
            return {
                ...state,
                board: action.payload,
            };
        }
        case actionTypes.updateBoardVisibilitySucceeded: {
            return {
                ...state,
                board: {
                    ...state.board,
                    isPrivate: action.payload
                }
            };
        }
        default:
            return state;
    }
};
