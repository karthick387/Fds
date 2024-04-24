// import { configureStore } from '@reduxjs/toolkit';
// import loaderSlice from '../redux/features/auth-slice';
// import userSlice from '../redux/features/user-slice';
// import { TypedUseSelectorHook, useSelector } from 'react-redux';


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = configureStore({
//     reducer: {
//         user:loaderSlice,
//         hello:userSlice},
// devTools: true,
// enhancers: [composeEnhancers]
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type useDispatch = typeof store.dispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


import { configureStore, compose } from '@reduxjs/toolkit';
import loaderSlice from '../redux/features/auth-slice';
import userSlice from '../redux/features/user-slice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
// We'll use redux-logger just as an example of adding another middleware
// import logger from 'redux-logger'
import { thunk } from 'redux-thunk';

export const store = configureStore({
    reducer: {
        loaderSlice,
        userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type useDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
