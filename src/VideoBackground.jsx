import React, { useRef, useEffect } from 'react';
import './VideoBackground.css';

const VideoBackground = ({ children }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Adjust the playback rate as needed
    }
  }, []);

  return (
    <div className="video-background">
      <video ref={videoRef} autoPlay loop muted>
        <source src="/fit.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content">
        <div className="header">
          <h1>MATISI GYM</h1>
        </div>
        <div className="form-div">
          {children}
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
