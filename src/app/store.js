import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { journalSlice } from './journal'

export const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    journal:journalSlice.reducer
  },
})