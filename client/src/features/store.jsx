import { configureStore } from "@reduxjs/toolkit";
import refreshSidebar from "./refreshSidebar";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from "react-redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { rootPersistConfig, rootReducer } from "../redux/rootReducer";

// Combine the reducers
const combinedReducers = combineReducers({
  refreshKey: refreshSidebar,
  persistedRoot: persistReducer(rootPersistConfig, rootReducer),
});
const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);
const { dispatch } = store;
const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
