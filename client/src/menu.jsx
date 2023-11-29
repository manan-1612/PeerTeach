import { useState } from "react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Home from "./Home";
import './home.css';
import App from "./App";
import { Link } from 'react-router-dom';
import './YouTubeHomePage.css'; // Create a CSS file for styling

function Menu() {
    return (
        <div className="youtube-homepage">
            {/* Navbar */}
            <div className="navbar">
                <div className="profile-icon">Profile Icon</div>
                <input type="text" placeholder="Search" className="search-bar" />
            </div>

            {/* Main Content */}
            <div className="main-content" style={{ flex: '100%' }}>
                {/* Left Sidebar */}
                <div className="left-sidebar" style={{ flex: '70%' }}>
                    {/* Filters */}
                    <div className="filter-section">
                        {/* Add filters for semester, subject, batchyear, branch, college, course */}
                        {/* Example: */}
                        <div className="filter">Semester Filter</div>
                        <div className="filter">Subject Filter</div>
                        {/* Add more filters here */}
                    </div>
                </div>

                {/* Video Section */}
                <div className="video-section" style={{ flex: '30%' }}>
                    {/* Display videos here */}
                    {/* Example video item */}
                    <div className="video-item">
                        <img src="video-thumbnail.jpg" alt="Video Thumbnail" />
                        <h3>Video Title</h3>
                        <p>Video Description</p>
                    </div>
                    {/* Add more video items here */}
                </div>
            </div>

            {/* Add Video Button */}
            <div className="add-video-button">
                <button>Add Video</button>
            </div>
        </div>
    );
}

export default Menu;
