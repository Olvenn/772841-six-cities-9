import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from '../types/state';
//Типизируем хуки useAppDispatch и useAppSelector и будем использовать наши обертки, чтобы не типизировать вручную
//Отправка - чтобы хранилище изменилось
export const useAppDispatch = () => useDispatch<AppDispatch>();
//Для получения данных из хранилища - его мы определили в sate.ts
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
