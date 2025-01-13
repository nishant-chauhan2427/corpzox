// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Import your slices
import { composeWithDevTools } from "redux-devtools-extension";
import appSlice from "./slices/appSlice";
import businessPageSlice from "./slices/businessPageSlice";
import dashboardReducer from "./slices/dashboardSlice";
import profileReducer from "./slices/profileSlice";
import userAuthSlice from "./slices/userAuth-slice";
import userSlice from "./slices/userLoginSlice";
import userUtilitySlice from "./slices/utillitySlice";
// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  blacklist :['service','serviceDetails','wishlist','document','profile','user']
};

// Combine all slices into a single root reducer
const rootReducer = combineReducers({
  app: appSlice,
  auth: userAuthSlice,
  userUtility: userUtilitySlice,
  user: userSlice,
  profile: profileReducer,
  dashboard : dashboardReducer,
  businessList : businessPageSlice, 
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore(
  {
    reducer: persistedReducer,
  },
  composeWithDevTools()
);

// Create a persistor
export const persistor = persistStore(store);
