import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../utils/api';

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/about');
        const data = await response.json();
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) return <div className="container">Загрузка...</div>;

  return (
    <div className="about-page">
      <div className="hero">
        <h1>{aboutData.title}</h1>
        <p>{aboutData.description}</p>
      </div>

      <div className="container">
        <div className="about-section">
          <h2>Образование</h2>
          <ul>
            {aboutData.education.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="about-section">
          <h2>Опыт работы</h2>
          <p>{aboutData.experience}</p>
        </div>

        <div className="about-section">
          <h2>Методики лечения</h2>
          <ul>
            {aboutData.methods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
        </div>

        <div className="videos-section">
          <h2>Видео о методиках лечения</h2>
          <div className="video-grid">
            {aboutData.videos.map(video => (
              <div key={video.id} className="video-card">
                <h3>{video.title}</h3>
                <div className="video-container">
                  <iframe
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p>{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 