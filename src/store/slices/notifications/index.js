import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  notifications: [
    {
      id: 1,
      title: 'Welcome!',
      message: 'Thanks for visiting my portfolio',
      time: 'Just now',
      icon: '👋',
      read: false
    }
  ]
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotifications: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeNotifications: (state) => {
      state.isOpen = false;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        ...action.payload,
        id: Date.now(),
        time: 'Just now',
        read: false
      });
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    clearAll: (state) => {
      state.notifications = [];
    }
  }
});

export const { 
  toggleNotifications, 
  closeNotifications, 
  addNotification, 
  markAsRead, 
  clearAll 
} = notificationsSlice.actions;
export default notificationsSlice.reducer;
