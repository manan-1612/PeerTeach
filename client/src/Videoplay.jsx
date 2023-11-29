import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import VideoList from './videolist';

const VideoPlayer = () => {
    const { id } = useParams();
    const videoUrl = `http://localhost:3001/videos/${id}`;
    return (
        <div>
            <h2>Video Player</h2>
            <video controls width="640" height="360">
                <source src={videoUrl} type="video/mp4" /> {/* Update the content type as needed */}
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default VideoPlayer;
