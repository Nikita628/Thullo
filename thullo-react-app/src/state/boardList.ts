import { BoardList } from "../models/boardList";
import { IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    createBoardList: "boardList/createBoardList",
    createBoardListSuccceded: "boardList/createBoardListSucceeded",
    updateBoardListTitle: "boardList/updateBoardListTitle",
    updateBoardListTitleSucceeded: "boardList/updateBoardListTitleSucceeded",
    deleteBoardList: "boardList/deleteBoardList",
    deleteBoardListSucceeded: "boardList/deleteBoardListSucceeded",
};

export const actionCreators = {
    CreateBoardList: (list: BoardList): ITypedAction & IPayloadedAction<BoardList> => ({
        type: actionTypes.createBoardList,
        payload: list,
    }),
    CreateBoardListSucceeded: (list: BoardList): ITypedAction & IPayloadedAction<BoardList> => ({
        type: actionTypes.createBoardListSuccceded,
        payload: list,
    }),
    UpdateBoardListTitle: (listId: number, title: string): ITypedAction & IPayloadedAction<{listId: number, title: string}> => ({
        type: actionTypes.updateBoardListTitle,
        payload: {
            listId,
            title
        },
    }),
    UpdateBoardListTitleSucceeded: (listId: number, title: string): ITypedAction & IPayloadedAction<{listId: number, title: string}> => ({
        type: actionTypes.updateBoardListTitleSucceeded,
        payload: {
            listId,
            title
        }
    }),
    DeleteBoardList: (listId: number): ITypedAction & IPayloadedAction<number> => ({
        type: actionTypes.deleteBoardList,
        payload: listId,
    }),
    DeleteBoardListSucceeded: (listId: number): ITypedAction & IPayloadedAction<number> => ({
        type: actionTypes.deleteBoardListSucceeded,
        payload: listId
    }),
};

export interface BoardListState {
    
}

const initialState: BoardListState = {
    
};

export const reducer = (state: BoardListState = initialState, action: ITypedAction & IPayloadedAction): BoardListState => {
    switch (action.type) {
        default:
            return state;
    }
};
