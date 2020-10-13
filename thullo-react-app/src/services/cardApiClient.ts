import axios from "axios";

import { ApiResponse } from "../models/common";
import config from "../common/config";
import { Card } from "../models/card";

export class CardApiClient {
    static moveCard(cardId: number, listId: number) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/card/moveCardToList`, {
            cardId,
            listId
        });
    }

    static createCard(card: Card) {
        return axios.post<ApiResponse<number>>(`${config.apiUrl}/card/create`, card);
    }

    static getCard(cardId: number) {
        return axios.get<ApiResponse<Card>>(`${config.apiUrl}/card/get/${cardId}`);
    }
}