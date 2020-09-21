import axios from "axios";

import { ApiPageResponse } from "../models/common";
import config from "../common/config";
import { Board, BoardSearchParam } from "../models/board";

export class BoardApiClient {
    static search(searchParam: BoardSearchParam) {
        return axios.post<ApiPageResponse<Board>>(`${config.apiUrl}/board/search`, searchParam);
    }
}