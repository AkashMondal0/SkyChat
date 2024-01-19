import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CurrentTheme } from '../../../types/theme';
import { DarkTheme, LightTheme } from '../../../constants/theme-data';
export type Theme = "light" | "dark" | "system"

export interface Theme_Toggle_State {
  Theme: Theme
  currentTheme: CurrentTheme
  StatusBar: "dark-content" | "light-content"
}


const initialState: Theme_Toggle_State = {
  Theme: "system",
  StatusBar: "dark-content",
  currentTheme: LightTheme
}

export const Theme_Toggle_Slice = createSlice({
  name: 'Theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      if (action.payload === "light") {
        state.currentTheme = LightTheme
        state.StatusBar = "dark-content"
      } else if (action.payload === "dark") {
        state.currentTheme = DarkTheme
        state.StatusBar = "light-content"
      }
      state.Theme = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  changeTheme
} = Theme_Toggle_Slice.actions

export default Theme_Toggle_Slice.reducer