import { useState } from "react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

function Login() {
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="card text-black m-5" style={{ borderRadius: '25px', maxWidth: '800px' }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10 col-lg-6 order-2 order-lg-1 d-flex flex-column align-items-center">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-envelope me-3" style={{ fontSize: '24px' }}></i>
                                <input className="form-control" placeholder="Your Email" type="email" />
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="fas fa-lock me-3" style={{ fontSize: '24px' }}></i>
                                <input className="form-control" placeholder="Password" type="password" />
                            </div>
                            <button className="btn btn-primary mb-4" type="button">Login</button>
                        </div>
                        <div className="col-md-10 col-lg-6 order-1 order-lg-2 d-flex align-items-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" alt="Registration" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;