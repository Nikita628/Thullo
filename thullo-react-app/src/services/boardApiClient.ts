import axios from "axios";

import { ApiPageResponse, ApiResponse } from "../models/common";
import config from "../common/config";
import { Board, BoardSearchParam } from "../models/board";

export class BoardApiClient {
    static search(searchParam: BoardSearchParam) {
        return axios.post<ApiPageResponse<Board>>(`${config.apiUrl}/board/search`, searchParam);
    }

    static create(board: Board) {
        return axios.post<ApiResponse<number>>(`${config.apiUrl}/board/create`, board);
    }
}