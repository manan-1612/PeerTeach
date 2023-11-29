import { useState } from "react";
import React from 'react';
import './home.css';

function Home() {

    return (
        <div className="full-screen">
            <header>
                <nav>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
                <a style={{
                    fontWeight: 'bold',
                    fontSize: '40px',
                    color: 'transparent',
                    background: 'linear-gradient(to bottom right, #ff4d4d, #007bff)',
                    WebkitBackgroundClip: 'text', // Enable background clipping for text
                    textDecoration: 'none', // Remove underline
                    textAlign: 'center'
                }} class="navbar-brand" href="/">PeerTeach</a>
                <nav>
                    <ul>
                        <li></li>
                    </ul>
                </nav>
            </header>

            <section className="hero" style={{ height: '40%' }}>
                <div className="hero-content" style={{ marginTop: '2%' }}>
                    <h2>Peer-to-Peer Learning Made Easy</h2>
                    <p>Join PeerTeach and start sharing your knowledge with others.</p>
                    {/* <a href="/Signin">Sign In Now as Student</a><br /><br />
                    <a href="/Signin">Sign In Now as Businessman</a> */}
                    <a style={{ marginTop: '5%', marginBottom: '10%' }} href="/videos">Get Started!</a>
                </div>
            </section>

            {/* Add other sections as per your requirements */}

            <footer>
                <p>&copy; 2023 PeerTeach. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home