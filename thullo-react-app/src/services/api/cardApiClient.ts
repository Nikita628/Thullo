import axios from "axios";

import { ApiResponse } from "../../models/common";
import config from "../../common/config";
import { Card, CardAttachment, CardComment, CardLabel } from "../../models/card";

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

    static createComment(comment: CardComment) {
        return axios.post<ApiResponse<CardComment>>(`${config.apiUrl}/cardComment/create`, comment);
    }

    static updateCommentText(commentId: number, text: string) {
        return axios.put<ApiResponse<boolean>>(`${config.apiUrl}/cardComment/updateText`, {
            cardCommentId: commentId,
            text
        });
    }

    static deleteComment(commentId: number) {
        return axios.delete<ApiResponse<boolean>>(`${config.apiUrl}/cardComment/delete/${commentId}`);
    }

    static createAttachment (cardId: number, file: File) {
        const form = new FormData();
        form.append("attachment", file);
        form.append("cardId", cardId.toString());
        return axios.post<ApiResponse<CardAttachment>>(`${config.apiUrl}/cardAttachment/create`, form);
    }

    static deleteAttachment(attachmentId: number) {
        return axios.delete<ApiResponse<boolean>>(`${config.apiUrl}/cardAttachment/delete/${attachmentId}`);
    }
}