import { Auth } from '@Model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Auth = {
  _id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  phone: '',
  fullName: '',
  accessToken: '',
  isAdmin: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    set(_, action: PayloadAction<Auth>) {
      return action.payload
    },
    update(state, action: PayloadAction<Auth>) {
      return {
        ...state,
        ...action.payload,
      }
    },
    reset() {
      return initialState
    },
  },
})

const authReducer = authSlice.reducer

export default authReducer

export const { reset: resetAuth, set: setAuth, update: updateAuth } = authSlice.actions
