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
    updateBoardTitleRequested: "board/updateBoardTitleRequested",
    updateBoardTitleSucceeded: "board/updateBoardTitleSucceeded",
    updateBoardDescriptionRequested: "board/updateBoardDescriptionRequested",
    updateBoardDescriptionSucceeded: "board/updateBoardDescriptionSucceeded",
    deleteBoardFromState: "board/DeleteBoardFromState",
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
    UpdateBoardTitleRequested: (boardId: number, title: string)
        : ITypedAction & IPayloadedAction<{ boardId: number, title: string }> => ({
            type: actionTypes.updateBoardTitleRequested,
            payload: {
                boardId,
                title,
            }
        }),
    UpdateBoardTitleSucceeded: (title: string): ITypedAction & IPayloadedAction<string> => ({
        type: actionTypes.updateBoardTitleSucceeded,
        payload: title
    }),
    UpdateBoardDescriptionRequested: (boardId: number, description: string)
        : ITypedAction & IPayloadedAction<{ boardId: number, description: string }> => ({
            type: actionTypes.updateBoardDescriptionRequested,
            payload: {
                boardId,
                description,
            }
        }),
    UpdateBoardDescriptionSucceeded: (description: string): ITypedAction & IPayloadedAction<string> => ({
        type: actionTypes.updateBoardDescriptionSucceeded,
        payload: description
    }),
    DeleteBoardFromState: (): ITypedAction => ({
        type: actionTypes.deleteBoardFromState,
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
                board: {
                    ...action.payload,
                    boardLists: null,
                    users: null,
                }
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
        case actionTypes.updateBoardTitleSucceeded: {
            return {
                ...state,
                board: {
                    ...state.board,
                    title: action.payload
                }
            };
        }
        case actionTypes.updateBoardDescriptionSucceeded: {
            return {
                ...state,
                board: {
                    ...state.board,
                    description: action.payload
                }
            };
        }
        case actionTypes.deleteBoardFromState: {
            return {
                ...state,
                board: null,
            };
        }
        default:
            return state;
    }
};
