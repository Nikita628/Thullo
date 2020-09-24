import { SagaMiddleware } from "redux-saga";

import { watchAuth } from "./auth";
import { watchCommon } from "./common";
import { watchBoard } from "./board";
import { watchUser } from "./user";

const runSagas = (sagaMiddleware: SagaMiddleware<any>): void => {
    sagaMiddleware.run(watchAuth);
    sagaMiddleware.run(watchCommon);
    sagaMiddleware.run(watchBoard);
    sagaMiddleware.run(watchUser);
};

export default runSagas;