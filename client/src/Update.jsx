import React, { useState } from 'react';
import axios from 'axios';
import './list.css';
import { useNavigate } from "react-router-dom";
import profileImage from './assets/user.png';

const Update = ({ cancelUpdate }) => {

    const [videos, setVideos] = useState([]);
    const [update, setUpdate] = useState();
    let user = localStorage.getItem('userData');
    const [fetch_videos, Setfetch_videos] = useState(false);
    const userData = JSON.parse(user);
    const name = userData.name;
    const email = userData.email;
    console.log(userData);
    let my_videos;
    const [formData, setFormData] = useState({
        name: userData.name,
        email: userData.email,
        college: userData.college,
        course: userData.course,
        branch: userData.branch,
        currentSem: userData.currentSem,
        batchYear: userData.batchYear,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post('http://localhost:3001/UpdateDetails', { formData, userData })
            .then((response) => {
                // navigate('/videos');
                console.log(response.data);
                localStorage.setItem('userData', JSON.stringify(response.data));
                alert('Updated Successfully!');
                onClose();
                console.log('Uploaded');
            })
            .catch((error) => {
                console.error('Not Uploaded', error);
            });
    };

    function SetUpdate() {
        setUpdate(!update);
    }

    function onClose() {
        cancelUpdate();
    }

    return (
        <>
            <div className="popup-container" style={{ alignItems: 'center' }}>
                <div className="popup">
                    <div className='header'>
                        <img
                            src={profileImage}
                            alt="Profile"
                            style={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: 'linear-gradient(to bottom right, #ff4d4d, #007bff)',
                                borderRadius: '50%',
                                marginTop: '40px',
                                marginLeft: '2%',
                                marginRight: '10px',
                            }}
                        />
                    </div>
                    {/* <h3 style={{ textAlign: 'center', marginTop: '20px', fontFamily: 'league spartan' }}>{userData.name}</h3> */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <input type='text' name='name' style={{ textAlign: 'center', fontWeight: 1000, fontFamily: 'league spartan', marginTop: '20px', height: '40px' }} onChange={handleChange} value={formData.name} />
                    </div>
                    <hr />
                    <div style={{ marginTop: '50px', display: 'flex' }}>
                        <div className='prof_left' style={{ width: 'fit-content' }}>
                            {/* <p>Email: {userData.email}</p> */}

                            <div style={{ display: 'flex' }}>
                                <p style={{ marginRight: '7px' }}>College:</p><input name='college' style={{ height: '20px', width: '50%' }} onChange={handleChange} value={formData.college} type='text' />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ marginRight: '7px' }}>Course:</p><input name='course' style={{ height: '20px', width: '50%' }} onChange={handleChange} value={formData.course} type='text' />
                            </div>
                        </div>
                        <div className='v1' style={{ borderLeft: '1px solid grey', height: '100px', marginLeft: '20px', marginRight: '20px' }} />
                        <div className='prof_right'>
                            <div style={{ display: 'flex' }}>
                                <p style={{ marginRight: '10px' }}>Branch:</p><input name='branch' style={{ height: '20px', width: '50%' }} onChange={handleChange} value={formData.branch} type='text' />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ marginRight: '10px' }}>Sem:</p><input name='currentSem' style={{ height: '20px', width: '50%' }} onChange={handleChange} value={formData.currentSem} type='text' />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ marginRight: '10px' }}>Year:</p><input name='batchYear' style={{ height: '20px', width: '50%' }} onChange={handleChange} value={formData.batchYear} type='text' />
                            </div>
                        </div>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>

                        <button className="update-button" onClick={handleSubmit} >
                            Save
                        </button>
                        <button className="close-button" onClick={onClose}>
                            Close
                        </button>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Update;