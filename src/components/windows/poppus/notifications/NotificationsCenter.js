import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNotifications, closeNotifications, markAsRead, clearAll } from '../../../../store/slices/notifications';
import { toggleQuickActions } from '../../../../store/slices/quickActions';
import QuickActions from './QuickActions';
import './notifications.css';

const NotificationsCenter = () => {
  const dispatch = useDispatch();
  const { isOpen, notifications } = useSelector(state => state.notifications);
  const quickActionsOpen = useSelector(state => state.quickActions.isOpen);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <>
      <div className="notifications-overlay" onClick={() => dispatch(closeNotifications())} />
      <div className="notifications-panel">
        <div className="notifications-header">
          <div className="header-tabs">
            <button 
              className={`tab ${!quickActionsOpen ? 'active' : ''}`}
              onClick={() => quickActionsOpen && dispatch(toggleQuickActions())}
            >
              <i className="fas fa-bell"></i> Notifications ({unreadCount})
            </button>
            <button 
              className={`tab ${quickActionsOpen ? 'active' : ''}`}
              onClick={() => !quickActionsOpen && dispatch(toggleQuickActions())}
            >
              <i className="fas fa-sliders-h"></i> Quick Actions
            </button>
          </div>
          <button 
            className="close-btn"
            onClick={() => dispatch(closeNotifications())}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {!quickActionsOpen ? (
          <div className="notifications-content">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <i className="fas fa-bell-slash"></i>
                <h3>No new notifications</h3>
                <p>You're all caught up!</p>
              </div>
            ) : (
              <>
                <div className="notifications-actions">
                  <button onClick={() => dispatch(clearAll())} className="clear-btn">
                    Clear all
                  </button>
                </div>
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`notification-item ${notification.read ? 'read' : ''}`}
                      onClick={() => dispatch(markAsRead(notification.id))}
                    >
                      <div className="notification-icon">{notification.icon}</div>
                      <div className="notification-content">
                        <h4>{notification.title}</h4>
                        <p>{notification.message}</p>
                        <span className="notification-time">{notification.time}</span>
                      </div>
                      {!notification.read && <div className="unread-indicator"></div>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <QuickActions />
        )}
      </div>
    </>
  );
};

export default NotificationsCenter;
