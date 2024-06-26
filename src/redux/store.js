import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// import from './slides/...';
import userReducer from './slides/userSlide';
import productReducer from './slides/productSlide';
import orderReducer from './slides/orderSlide';
import adminReducer from './slides/adminSlide';
import commentReducer from './slides/commentSlide';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['product', 'comment'],
};
const rootReducer = combineReducers({
    user: userReducer,
    admin: adminReducer,
    product: productReducer,
    comment: commentReducer,
    orderProduct: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
