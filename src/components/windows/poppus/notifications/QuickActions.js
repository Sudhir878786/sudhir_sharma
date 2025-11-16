import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAction, setBrightness, setVolume } from '../../../../store/slices/quickActions';
import './notifications.css';

const QuickActions = () => {
  const dispatch = useDispatch();
  const { quickActions, brightness, volume } = useSelector(state => state.quickActions);

  const actions = [
    { key: 'wifi', icon: 'wifi', label: 'WiFi' },
    { key: 'bluetooth', icon: 'bluetooth-b', label: 'Bluetooth' },
    { key: 'airplane', icon: 'plane', label: 'Airplane Mode' },
    { key: 'battery', icon: 'battery-half', label: 'Battery Saver' },
    { key: 'nightLight', icon: 'moon', label: 'Night Light' },
    { key: 'location', icon: 'map-marker-alt', label: 'Location' }
  ];

  return (
    <div className="quick-actions-content">
      <div className="quick-actions-grid">
        {actions.map(action => (
          <button
            key={action.key}
            className={`quick-action-btn ${quickActions[action.key]?.enabled ? 'active' : ''}`}
            onClick={() => dispatch(toggleAction(action.key))}
          >
            <i className={`fas fa-${action.icon}`}></i>
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      <div className="sliders-section">
        <div className="slider-group">
          <div className="slider-label">
            <i className="fas fa-sun"></i>
            <span>Brightness</span>
            <span className="slider-value">{brightness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => dispatch(setBrightness(parseInt(e.target.value)))}
            className="slider"
          />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <i className="fas fa-volume-up"></i>
            <span>Volume</span>
            <span className="slider-value">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => dispatch(setVolume(parseInt(e.target.value)))}
            className="slider"
          />
        </div>
      </div>

      <div className="battery-info">
        <i className="fas fa-battery-three-quarters"></i>
        <span>77% available</span>
        <span className="battery-time">3h 22m remaining</span>
      </div>
    </div>
  );
};

export default QuickActions;
