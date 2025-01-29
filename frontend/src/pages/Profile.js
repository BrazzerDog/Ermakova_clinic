import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          throw new Error('Unauthorized');
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        history.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [history]);

  if (loading) return <div className="container">Загрузка...</div>;

  return (
    <div className="container">
      <div className="form-container">
        <h1>Личный кабинет</h1>
        <div className="profile-info">
          <p><strong>Имя:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Телефон:</strong> {userData.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile; 