import axios from "axios";

import config from "../common/config";
import { BoardList } from "../models/boardList";
import { ApiResponse } from "../models/common";

export class BoardListApiClient {
    static create(list: BoardList) {
        return axios.post<ApiResponse<number>>(`${config.apiUrl}/boardList/create`, list);
    }

    static updateTitle(listId: number, title: string) {
        return axios.put<ApiResponse<number>>(`${config.apiUrl}/boardList/updateTitle`, {
            boardListId: listId,
            title,
        });
    }

    static delete(listId: number) {
        return axios.delete<ApiResponse<number>>(`${config.apiUrl}/boardList/delete/${listId}`);
    }
}