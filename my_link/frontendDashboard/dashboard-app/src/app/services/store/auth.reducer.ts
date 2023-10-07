// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.action';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({ ...state, isLoggedIn: true, user })),
  on(logout, (state) => ({ ...state, isLoggedIn: false, user: null })),
);
