import axios from "axios";

import { ApiPageResponse, ApiResponse } from "../../models/common";
import config from "../../common/config";
import { Board, BoardSearchParam } from "../../models/board";

export class BoardApiClient {
    static search(searchParam: BoardSearchParam) {
        return axios.post<ApiPageResponse<Board>>(`${config.apiUrl}/board/search`, searchParam);
    }

    static create(board: Board) {
        return axios.post<ApiResponse<number>>(`${config.apiUrl}/board/create`, board);
    }

    static get(boardId: number) {
        return axios.get<ApiResponse<Board>>(`${config.apiUrl}/board/get/${boardId}`);
    }

    static updateVisibility(boardId: number, isPrivate: boolean) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/board/updateVisibility`, {
            boardId: boardId,
            isPrivate: isPrivate
        });
    }

    static updateTitle(boardId: number, title: string) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/board/updateTitle`, {
            boardId: boardId,
            title: title
        });
    }

    static updateDescription(boardId: number, description: string) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/board/updateDescription`, {
            boardId: boardId,
            description: description
        });
    }
}