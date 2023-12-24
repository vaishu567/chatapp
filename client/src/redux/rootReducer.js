import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import audioCallReducer from "./slices/audioCall";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  //whitelist:[],
  // blacklist: [],
};

const rootReducer = combineReducers({
  audioCall: audioCallReducer,
});

export { rootPersistConfig, rootReducer };
