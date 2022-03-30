import request from 'axios';
import { store } from '../store';
import { setError } from '../store/action';
import { clearErrorAction } from '../store/api-actions';
import { ErrorType } from '../types/types';
import { HTTP_CODE } from '../const';

export const handleError = (error: ErrorType): void => {
  if (!request.isAxiosError(error)) {
    throw error;
  }

  const dispatchError = (message: string) => {
    store.dispatch(setError(message));
    store.dispatch(clearErrorAction());
  };

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HTTP_CODE.BAD_REQUEST:
        dispatchError(response.data.error);
        break;
      case HTTP_CODE.UNAUTHORIZED:
        dispatchError(response.data.error);
        break;
      case HTTP_CODE.NOT_FOUND:
        dispatchError(response.data.error);
        break;
    }
  }
};
