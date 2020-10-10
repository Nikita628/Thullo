import axios from "axios";

import { ApiResponse } from "../models/common";
import config from "../common/config";

export class CardApiClient {
    static moveCard(cardId: number, listId: number) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/card/moveCardToList`, {
            cardId,
            listId
        });
    }
}