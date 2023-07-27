import { combineReducers } from "redux";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: ["error"],
};

const rootReducer = combineReducers({
  user: userReducer,
  error: errorReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
