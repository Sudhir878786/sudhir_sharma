import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: typeof window !== 'undefined' 
    ? localStorage.getItem('theme') || 'light' 
    : 'light',
  accentColor: typeof window !== 'undefined'
    ? localStorage.getItem('accentColor') || '#0078d4'
    : '#0078d4'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode);
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode);
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
    setAccentColor: (state, action) => {
      state.accentColor = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accentColor', action.payload);
        document.documentElement.style.setProperty('--accent-color', action.payload);
      }
    }
  }
});

export const { toggleTheme, setTheme, setAccentColor } = themeSlice.actions;
export default themeSlice.reducer;
