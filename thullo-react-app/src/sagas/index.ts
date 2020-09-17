import { SagaMiddleware } from "redux-saga";

import { watchAuth } from "./auth";

const runSagas = (sagaMiddleware: SagaMiddleware<any>): void => {
    sagaMiddleware.run(watchAuth);
};

export default runSagas;