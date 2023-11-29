import { useState } from "react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Home from "./Home";
import './home.css';
import App from "./App";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import './list.css';

function Signin() {
    const [email, setMail] = useState();
    const [password, setPass] = useState();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result); // Log the response data
                if (result.data.mes == "Success") {
                    const loggedin = true;
                    console.log(result.data.userData);
                    console.log(result.data.videos);

                    localStorage.setItem('userData', JSON.stringify(result.data.userData));
                    localStorage.setItem('loggedin', JSON.stringify(loggedin));
                    navigate('/videos');
                }
                else {
                    alert("Incorrect credentials");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <header>
                <a style={{
                    fontWeight: 'bold',
                    fontSize: '40px',
                    color: 'transparent',
                    background: 'linear-gradient(to bottom right, #ff4d4d, #007bff)',
                    WebkitBackgroundClip: 'text', // Enable background clipping for text
                    textDecoration: 'none', // Remove underline
                    textAlign: 'center'
                }} href="/">PeerTeach</a>
                <p>
                    <a class="nav-link active" style={{ marginBottom: '-1%', marginTop: '5px', color: '#C8C8C8', fontSize: '17px', }} aria-current="page" href="/videos">Home</a>
                </p>

            </header>

            <section style={{ height: '100%' }} className="hero" >
                <form style={{ marginTop: '-5%', marginBottom: '-1%' }} onSubmit={handleSubmit} >
                    <div className="container-fluid d-flex justify-content-center align-items-center vh-900">
                        <div className="card text-black m-5" style={{ borderRadius: '25px', maxWidth: '800px', height: '60%' }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
                                        <p style={{ marginTop: '7%', marginBottom: '7%' }} ><b>Sign In</b></p>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-envelope me-3" style={{ fontSize: '24px' }}></i>
                                            <input
                                                className="form-control"
                                                placeholder="Your Email"
                                                type="email"
                                                name="email"
                                                onChange={(e) => setMail(e.target.value)}
                                            />
                                        </div>
                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <i className="fas fa-lock me-3" style={{ fontSize: '24px' }}></i>
                                            <input
                                                className="form-control"
                                                placeholder="Password"
                                                type="password"
                                                name="password"
                                                onChange={(e) => setPass(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-primary mb-4" type="submit">Sign In</button>
                                        <p style={{ marginBottom: '-1%' }}>
                                            Don't have an account? &nbsp;<Link to="/register">Sign up here</Link>
                                        </p>
                                    </div>
                                    <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="Registration" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            <footer style={{ marginTop: '-4%', marginBottom: '-3%' }}>
                <p>&copy; 2023 PeerTeach. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Signin;
