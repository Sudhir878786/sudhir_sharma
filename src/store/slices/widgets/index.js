import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  widgets: {
    calendar: true,
    weather: true,
    todo: true,
    powered: true
  },
  todos: [
    { id: 1, text: 'Check out my projects', completed: false, priority: 'high' },
    { id: 2, text: 'Connect on LinkedIn', completed: false, priority: 'medium' },
    { id: 3, text: 'Read my blog posts', completed: false, priority: 'low' }
  ],
  weather: {
    location: 'Loading...',
    temp: '--',
    condition: 'Loading...',
    humidity: '--',
    uv: 'Loading...'
  }
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleWidgets: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeWidgets: (state) => {
      state.isOpen = false;
    },
    toggleWidget: (state, action) => {
      const widget = action.payload;
      if (state.widgets[widget] !== undefined) {
        state.widgets[widget] = !state.widgets[widget];
      }
    },
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority || 'medium'
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
    setWeather: (state, action) => {
      state.weather = { ...state.weather, ...action.payload };
    }
  }
});

export const { 
  toggleWidgets, 
  closeWidgets, 
  toggleWidget, 
  addTodo, 
  toggleTodo, 
  removeTodo,
  setWeather 
} = widgetsSlice.actions;
export default widgetsSlice.reducer;
