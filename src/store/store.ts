import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { listSlice } from './articleSlice'
import { setupListeners } from '@reduxjs/toolkit/query'


const rootReducer = combineReducers({
  [listSlice.reducerPath]: listSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
