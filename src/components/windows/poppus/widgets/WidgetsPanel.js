import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleWidgets, closeWidgets, addTodo, toggleTodo, removeTodo, setWeather } from '../../../../store/slices/widgets';
import './widgets.css';

const WidgetsPanel = () => {
  const dispatch = useDispatch();
  const { isOpen, widgets, todos, weather } = useSelector(state => state.widgets);
  const [newTodo, setNewTodo] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch weather data
    if (isOpen && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          // Default to a location if geolocation fails
          dispatch(setWeather({
            location: 'Your Location',
            temp: '72',
            condition: 'Sunny',
            humidity: '45',
            uv: 'Strong UV Today'
          }));
        }
      );
    }
  }, [isOpen, dispatch]);

  const fetchWeather = async (lat, lon) => {
    try {
      // Use OpenWeatherMap API (you'll need to add your API key)
      const API_KEY = 'your_api_key_here';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
      );
      const data = await response.json();
      
      dispatch(setWeather({
        location: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        humidity: data.main.humidity,
        uv: 'Moderate'
      }));
    } catch (error) {
      console.error('Weather fetch error:', error);
    }
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo({ text: newTodo, priority: 'medium' }));
      setNewTodo('');
    }
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  if (!isOpen) return null;

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <div className="widgets-overlay" onClick={() => dispatch(closeWidgets())} />
      <div className="widgets-panel">
        <div className="widgets-header">
          <h2>Widgets</h2>
          <button className="close-btn" onClick={() => dispatch(closeWidgets())}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="widgets-content">
          {/* Calendar Widget */}
          {widgets.calendar && (
            <div className="widget calendar-widget">
              <div className="widget-header">
                <i className="fas fa-calendar-alt"></i>
                <h3>Calendar</h3>
              </div>
              <div className="calendar">
                <div className="calendar-header">
                  <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                </div>
                <div className="calendar-grid">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="calendar-day-name">{day}</div>
                  ))}
                  {getDaysInMonth().map((day, index) => (
                    <div 
                      key={index} 
                      className={`calendar-day ${day === currentDate.getDate() ? 'today' : ''} ${!day ? 'empty' : ''}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Weather Widget */}
          {widgets.weather && (
            <div className="widget weather-widget">
              <div className="widget-header">
                <i className="fas fa-cloud-sun"></i>
                <h3>Weather</h3>
              </div>
              <div className="weather-content">
                <div className="weather-location">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{weather.location}</span>
                </div>
                <div className="weather-temp">
                  <span className="temp-value">{weather.temp}°F</span>
                  <span className="temp-condition">{weather.condition}</span>
                </div>
                <div className="weather-details">
                  <div className="weather-detail">
                    <i className="fas fa-sun"></i>
                    <span>{weather.uv}</span>
                  </div>
                  <div className="weather-detail">
                    <i className="fas fa-tint"></i>
                    <span>{weather.humidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* To-Do Widget */}
          {widgets.todo && (
            <div className="widget todo-widget">
              <div className="widget-header">
                <i className="fas fa-check-circle"></i>
                <h3>My Day</h3>
              </div>
              <form onSubmit={handleAddTodo} className="todo-form">
                <input
                  type="text"
                  placeholder="Add a task..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  className="todo-input"
                />
                <button type="submit" className="add-todo-btn">
                  <i className="fas fa-plus"></i>
                </button>
              </form>
              <div className="todos-list">
                {todos.map(todo => (
                  <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => dispatch(toggleTodo(todo.id))}
                      className="todo-checkbox"
                    />
                    <span className="todo-text">{todo.text}</span>
                    <button
                      onClick={() => dispatch(removeTodo(todo.id))}
                      className="todo-delete"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Powered By Widget */}
          {widgets.powered && (
            <div className="widget powered-widget">
              <div className="widget-header">
                <i className="fas fa-code"></i>
                <h3>Powered by</h3>
              </div>
              <div className="powered-content">
                <div className="powered-item">
                  <i className="fab fa-react"></i>
                  <span>React</span>
                </div>
                <div className="powered-item">
                  <i className="fab fa-js"></i>
                  <span>JavaScript</span>
                </div>
                <div className="powered-item">
                  <i className="fas fa-paint-brush"></i>
                  <span>Styled Components</span>
                </div>
              </div>
              <div className="copyright">
                <span>🇮🇳 Handcrafted by Sudhir © 2024</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WidgetsPanel;
