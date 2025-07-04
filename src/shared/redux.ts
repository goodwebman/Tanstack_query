import type {
  ThunkAction,
  UnknownAction
} from '@reduxjs/toolkit'
import {
  combineSlices,
  configureStore,
  createSelector,
} from "@reduxjs/toolkit"
import type { TypedUseSelectorHook } from 'react-redux'
import {
  useDispatch,
  useSelector,
  useStore,
} from "react-redux"

// Корректно объединяем слайсы
export const rootReducer = combineSlices();

// Получаем тип состояния из rootReducer
export type AppState = ReturnType<typeof rootReducer>;

// Создаём store
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware()
});

// Типизированный dispatch
export type AppDispatch = typeof store.dispatch;

// Типизированный thunk
export type AppThunk<R = void> = ThunkAction<R, AppState, unknown, UnknownAction>;

// Хуки с типами:

// useSelector с типом состояния приложения
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

// useDispatch с типом dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// useStore с типами
export const useAppStore = () => useStore<typeof store>();

// createSelector уже типизирован сам по себе, но можно указать тип состояния, если нужно (обычно не обязательно)
export const createAppSelector = createSelector;
