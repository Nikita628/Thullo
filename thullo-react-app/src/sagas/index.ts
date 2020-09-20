import { SagaMiddleware } from "redux-saga";

import { watchAuth } from "./auth";
import { watchCommon } from "./common";

const runSagas = (sagaMiddleware: SagaMiddleware<any>): void => {
    sagaMiddleware.run(watchAuth);
    sagaMiddleware.run(watchCommon);
};

export default runSagas;