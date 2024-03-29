import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { ILoginResponce, IRegisterResponce } from "../interfaces/auth.interface";
import axios, { AxiosError } from "axios";
import { PREFIX } from "../helpers/API";
import { IProfileResponce } from "../interfaces/profile.interface";
import { TRootState } from "./store";

export const JWT_PERSISTENT_STATE = 'userData';

export interface IUserPersistentState {
   jwt: string | null;
}

export interface IUserState {
   jwt: string | null;
   loginErrorMessage?: string;
   registerErrorMessage?: string;
   profile?: IProfileResponce;
}

const initialState: IUserState = {
   jwt: loadState<IUserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login',
   async (params: {email: string, password: string}) => {
      try {
         const {data} = await axios.post<ILoginResponce>(`${PREFIX}/auth/login`, {
            email: params.email,
            password: params.password
         });
        return data;
      }
      catch (e) {
         if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message);
         }}
});

export const loadProfile = createAsyncThunk<IProfileResponce, void, {state: TRootState}>('user/loadProfile',
   async (_, thunkApi) => {
      const jwt = thunkApi.getState().user.jwt;
      const {data} = await axios.get<IProfileResponce>(`${PREFIX}/user/profile`, {
         headers: {
            Authorization: `Bearer ${jwt}`
         }
      });
      return data;
});

export const register = createAsyncThunk('user/register',
   async (params: {email: string, password: string, name: string}) => {
      try {
         const {data} = await axios.post<IRegisterResponce>(`${PREFIX}/auth/register`, {
            email: params.email,
            password: params.password,
            name: params.name
         });
        return data;
      }
      catch (e) {
         if (e instanceof AxiosError) {
            throw new Error(e.response?.data.message);
         }}
});

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      logout: (state) => {
         state.jwt = null;
      },
      clearLoginError: (state) => {
         state.loginErrorMessage = undefined;
      },
      clearRegisterError: (state) => {
         state.registerErrorMessage = undefined;
      }
   },
   extraReducers(builder) {
      builder.addCase(login.fulfilled, (state, action) => {
         if (!action.payload) {
            return;
         }
         state.jwt = action.payload.access_token;
      });
      builder.addCase(login.rejected, (state, action) => {
         state.loginErrorMessage = action.error.message;
      });
      builder.addCase(loadProfile.fulfilled, (state, action) => {
         if (!action.payload) {
            return;
         }
         state.profile = action.payload;
      });
      builder.addCase(register.fulfilled, (state, action) => {
         if (!action.payload) {
            return;
         }
         state.jwt = action.payload.access_token;
      });
      builder.addCase(register.rejected, (state, action) => {
         state.registerErrorMessage = action.error.message;
      });
   }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;