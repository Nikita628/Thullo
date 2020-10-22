import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/card";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { CardApiClient } from "../services/api/cardApiClient";
import { Card, CardComment, CardLabel } from "../models/card";

function* moveCard(action: IPayloadedAction<{ cardId: number, futureListId: number }> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.moveCard(action.payload.cardId, action.payload.futureListId);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Card has been moved"], NotificationType.success));
        yield put(actionCreators.MoveCardToListSucceeded(action.payload.cardId, action.payload.futureListId));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* createCard(action: IPayloadedAction<Card> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<number>> = yield CardApiClient.createCard(action.payload);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Card has been created"], NotificationType.success));
        action.payload.id = res.data.item;
        yield put(actionCreators.CreateCardSucceeded(action.payload));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* getCard(action: IPayloadedAction<number> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<Card>> = yield CardApiClient.getCard(action.payload);

    if (!res.data.errors.length) {
        yield put(actionCreators.GetCardSucceeded(res.data.item));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* updateTitle(action: IPayloadedAction<{cardId: number, title: string}> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.updateTitle(action.payload.cardId, action.payload.title);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Title has been updated"], NotificationType.success));
        yield put(actionCreators.UpdateCardTitleSucceeded(action.payload.cardId, action.payload.title));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* updateDescription(action: IPayloadedAction<{cardId: number, description: string}> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.updateDescription(action.payload.cardId, action.payload.description);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Description has been updated"], NotificationType.success));
        yield put(actionCreators.UpdateCardDescriptionSucceeded(action.payload.cardId, action.payload.description));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* updateCoverUrl(action: IPayloadedAction<{cardId: number, coverUrl: string}> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.updateCoverUrl(action.payload.cardId, action.payload.coverUrl);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Cover has been updated"], NotificationType.success));
        yield put(actionCreators.UpdateCardCoverUrlSucceeded(action.payload.cardId, action.payload.coverUrl));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* addLabel(action: IPayloadedAction<{cardId: number, label: CardLabel}> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<number>> = yield CardApiClient.addLabel(action.payload.cardId, action.payload.label);

    if (!res.data.errors.length) {
        action.payload.label.id = res.data.item;
        yield put(commonActionCreators.CreateNotificationsRequested(["Label has been added"], NotificationType.success));
        yield put(actionCreators.AddLabelSucceeded(action.payload.cardId, action.payload.label));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* createComment(action: IPayloadedAction<CardComment> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<CardComment>> = yield CardApiClient.createComment(action.payload);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Comment has been added"], NotificationType.success));
        yield put(actionCreators.CreateCommentSucceeded(res.data.item));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* updateCommentText(action: IPayloadedAction<{commentId: number, text: string}> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.updateCommentText(action.payload.commentId, action.payload.text);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Comment has been edited"], NotificationType.success));
        yield put(actionCreators.UpdateCommentTextSucceeded(action.payload.commentId, action.payload.text));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* deleteComment(action: IPayloadedAction<{commentId: number, cardId: number}> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.deleteComment(action.payload.commentId);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Comment has been deleted"], NotificationType.success));
        yield put(actionCreators.DeleteCommentSucceeded(action.payload.commentId, action.payload.cardId));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchCard() {
    yield takeLatest(actionTypes.moveCardToList, moveCard);
    yield takeLatest(actionTypes.createCard, createCard);
    yield takeLatest(actionTypes.getCard, getCard);
    yield takeLatest(actionTypes.updateCardTitle, updateTitle);
    yield takeLatest(actionTypes.updateCardDescription, updateDescription);
    yield takeLatest(actionTypes.updateCardCoverUrl, updateCoverUrl);
    yield takeLatest(actionTypes.addLabel, addLabel);
    yield takeLatest(actionTypes.createComment, createComment);
    yield takeLatest(actionTypes.updateCommentText, updateCommentText);
    yield takeLatest(actionTypes.deleteComment, deleteComment);
}