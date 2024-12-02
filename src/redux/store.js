// redux/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage

// Import your slices
import userAuthSlice from "./slices/userAuth-slice";
import userUtilitySlice from "./slices/utillitySlice";
import appSlice from "./slices/appSlice";
import serviceListingSlice from "./slices/serviceListingSlice";
import businessSlice from './slices/businessSlice';
import { composeWithDevTools } from "redux-devtools-extension";
import userSlice from "./slices/userLoginSlice";
import profileReducer from "./slices/profileSlice"
import settingsReducer from "./slices/settingsSlice"
import wishListReducer from "./slices/wishlistSlice"
import serviceDetailsReducer from "./slices/serviceDetailsSlice"
import documentSlice from "./slices/documentSlice";
import offerSlice from "./slices/offerSlice"


// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Combine all slices into a single root reducer
const rootReducer = combineReducers({
  app: appSlice,
  auth: userAuthSlice,
  userUtility: userUtilitySlice,
  user: userSlice,
  service:serviceListingSlice,
  business:businessSlice,
  profile: profileReducer,
  settings : settingsReducer,
  wishlist : wishListReducer,
  serviceDetails : serviceDetailsReducer,
  document : documentSlice,
  offers: offerSlice,
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
