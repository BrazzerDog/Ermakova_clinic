import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = token ? 'http://localhost:5000/api/home' : 'http://localhost:5000/';
        const options = token ? {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } : {};

        const response = await fetch(url, options);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        {!data.isAuthenticated && (
          <div className="cta-buttons">
            <Link to="/register" className="button primary">Зарегистрироваться</Link>
            <Link to="/login" className="button secondary">Войти</Link>
          </div>
        )}
      </div>
      
      <div className="features">
        {data.features.map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      {data.isAuthenticated && (
        <div className="personal-section">
          <h2>Добро пожаловать, {data.user.name}!</h2>
          <div className="recommendations">
            <h3>Ваши рекомендации:</h3>
            <ul>
              {data.personalRecommendations.map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home; 