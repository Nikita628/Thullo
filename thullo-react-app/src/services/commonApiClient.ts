import axios from "axios";

import config from "../common/config";
import { ApiPageResponse, PexelsPhoto, PexelsSearchParam } from "../models/common";

export class CommonApiClient {
    static searchPexels(searchParam: PexelsSearchParam) {
        return axios.post<ApiPageResponse<PexelsPhoto>>(`${config.apiUrl}/common/searchPexels`, searchParam);
    }
}