import axios from "axios";

import { ApiPageResponse, ApiResponse } from "../models/common";
import config from "../common/config";
import { User, UserSearchParam } from "../models/user";

export class UserApiClient {
    static search(searchParam: UserSearchParam) {
        return axios.post<ApiPageResponse<User>>(`${config.apiUrl}/user/search`, searchParam);
    }

    static inviteToBoard(userId: number, boardId: number) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/user/inviteToBoard`, {
            userId: userId,
            boardId: boardId
        });
    }

    static removeFromBoard(userId: number, boardId: number) {
        return axios.delete<ApiResponse<boolean>>(`${config.apiUrl}/user/${userId}/deleteFromBoard/${boardId}`);
    }
}