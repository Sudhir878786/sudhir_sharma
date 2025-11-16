import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  quickActions: {
    wifi: { enabled: true, label: 'WiFi' },
    bluetooth: { enabled: false, label: 'Bluetooth' },
    airplane: { enabled: false, label: 'Airplane Mode' },
    battery: { enabled: false, label: 'Battery Saver' },
    nightLight: { enabled: false, label: 'Night Light' },
    location: { enabled: true, label: 'Location' }
  },
  brightness: 80,
  volume: 60
};

const quickActionsSlice = createSlice({
  name: 'quickActions',
  initialState,
  reducers: {
    toggleQuickActions: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeQuickActions: (state) => {
      state.isOpen = false;
    },
    toggleAction: (state, action) => {
      const actionName = action.payload;
      if (state.quickActions[actionName]) {
        state.quickActions[actionName].enabled = !state.quickActions[actionName].enabled;
      }
    },
    setBrightness: (state, action) => {
      state.brightness = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    }
  }
});

export const { 
  toggleQuickActions, 
  closeQuickActions, 
  toggleAction, 
  setBrightness, 
  setVolume 
} = quickActionsSlice.actions;
export default quickActionsSlice.reducer;
