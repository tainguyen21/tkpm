import { Auth } from '@Model'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { defaultActions } from '@Utils'

const authAdapter = createEntityAdapter<Auth>({
  selectId: (auth) => auth._id,
})

const authSlice = createSlice({
  name: 'auth',
  initialState: authAdapter.getInitialState(),
  reducers: {
    ...defaultActions(authAdapter),
  },
})

const authReducer = authSlice.reducer

export default authReducer

export const {
  addOne: addOneAuth,
  updateOne: updateOneAuth,
  removeOne: removeOneAuth,
  removeAll: removeAllAuth,
} = authSlice.actions

// export const {
//   selectById: selectAuthById,
//   selectIds: selectAuthIds,
//   selectEntities: selectAuthEntities,
//   selectAll: selectAllAuths,
//   selectTotal: selectTotalAuths,
// } = authAdapter.getSelectors((state: RootState) => state.auth)
