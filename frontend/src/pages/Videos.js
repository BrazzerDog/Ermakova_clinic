import React, { useState, useEffect } from 'react';

function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('http://localhost:5000/videos');
      const data = await response.json();
      setVideos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container">Загрузка...</div>;
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1>Видеоматериалы</h1>
        <p>Полезные видео о мануальной терапии и здоровье позвоночника</p>
      </div>
      
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <div className="video-card-content">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <button onClick={() => window.open(video.url, '_blank')}>
                Смотреть видео
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videos; 