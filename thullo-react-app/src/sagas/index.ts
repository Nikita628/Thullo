import { SagaMiddleware } from "redux-saga";

import { watchAuth } from "./auth";
import { watchCommon } from "./common";
import { watchBoard } from "./board";
import { watchUser } from "./user";
import { watchBoardList } from "./boardList";
import { watchCard } from "./card";

const runSagas = (sagaMiddleware: SagaMiddleware<any>): void => {
    sagaMiddleware.run(watchAuth);
    sagaMiddleware.run(watchCommon);
    sagaMiddleware.run(watchBoard);
    sagaMiddleware.run(watchUser);
    sagaMiddleware.run(watchBoardList);
    sagaMiddleware.run(watchCard);
};

export default runSagas;