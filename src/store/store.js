import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true, immutableCheck: { warnAfter: 128 }, serializableCheck: false }),
})
export default store;