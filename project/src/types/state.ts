import {store} from '../store/index.js';
//Будет соответствовать типу результата того, что возвращает store.getState (возвращает текущее состояние хранилища) из хранилища - автоматическая типизация
export type State = ReturnType<typeof store.getState>;
//Тип для метода Dispatch
export type AppDispatch = typeof store.dispatch;
