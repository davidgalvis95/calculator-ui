import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: ["error"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
