import axios from "axios";

import { ApiPageResponse } from "../models/common";
import config from "../common/config";
import { User, UserSearchParam } from "../models/user";

export class UserApiClient {
    static search(searchParam: UserSearchParam) {
        return axios.post<ApiPageResponse<User>>(`${config.apiUrl}/user/search`, searchParam);
    }
}