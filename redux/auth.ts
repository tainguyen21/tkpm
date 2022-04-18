import { Auth } from '@Model'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StateAuth extends Auth {
  isLoaded?: boolean
}

const initialState: StateAuth = {
  _id: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  phone: '',
  fullName: '',
  accessToken: '',
  isAdmin: false,
  isLoaded: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    set(_, action: PayloadAction<StateAuth>) {
      return action.payload
    },
    update(state, action: PayloadAction<Partial<StateAuth>>) {
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
