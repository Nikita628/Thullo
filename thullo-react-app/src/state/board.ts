import { Board, BoardSearchParam } from "../models/board";
import { ApiPageResponse } from "../models/common";
import { IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    searchBoardRequested: "board/searchBoardRequested",
    searchBoardSucceeded: "board/searchBoardSucceeded",
};

export const actionCreators = {
    SearchBoardRequested: (param: BoardSearchParam): IPayloadedAction<BoardSearchParam> & ITypedAction => ({
        type: actionTypes.searchBoardRequested,
        payload: param,
    }),
    SearchBoardSucceeded: (boards: ApiPageResponse<Board>): IPayloadedAction<ApiPageResponse<Board>> & ITypedAction => ({
        type: actionTypes.searchBoardSucceeded,
        payload: boards,
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
                    items: [...state.boardsPage.items, ...action.payload.items],
                    totalCount: action.payload.totalCount,
                }
            };
        }
        default:
            return state;
    }
};
