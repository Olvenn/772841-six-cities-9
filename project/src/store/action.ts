import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const setError = createAction<string>('main/setError');
export const redirectToRoute = createAction<AppRoute>('game/redirectToRoute');
