import axios from "axios";

import { ApiResponse } from "../models/common";
import config from "../common/config";
import { Card, CardLabel } from "../models/card";

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

    static updateTitle(cardId: number, title: string) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/card/updateTitle`, {
            title,
            cardId
        });
    }

    static updateDescription(cardId: number, description: string) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/card/updateDescription`, {
            description,
            cardId
        });
    }

    static updateCoverUrl(cardId: number, coverUrl: string) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/card/updateCoverUrl`, {
            coverUrl,
            cardId
        });
    }

    static addLabel(cardId: number, label: CardLabel) {
        return axios.post<ApiResponse<number>>(`${config.apiUrl}/cardLabel/createLabelAndAddOnCard`, {
            cardId,
            label
        });
    }
}