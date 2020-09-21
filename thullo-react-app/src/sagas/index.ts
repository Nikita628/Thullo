import { SagaMiddleware } from "redux-saga";

import { watchAuth } from "./auth";
import { watchCommon } from "./common";
import { watchBoard } from "./board";

const runSagas = (sagaMiddleware: SagaMiddleware<any>): void => {
    sagaMiddleware.run(watchAuth);
    sagaMiddleware.run(watchCommon);
    sagaMiddleware.run(watchBoard);
};

export default runSagas;