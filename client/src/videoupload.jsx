import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const VideoUploadForm = () => {
    const navigate = useNavigate();
    let user = localStorage.getItem('userData');
    const userData = JSON.parse(user);
    const [formData, setFormData] = useState({
        title: '',
        college: '',
        course: '',
        branch: '',
        semester: '',
        subject: '',
        email: '',
        name: '',
        batch: '',
        otherDetails: '',
        video: null,
        notes: '',
        lickec: 0,
        dislikec: 0,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, video: file });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        const newErrors = {};
        if (!formData.title) newErrors.title = 'Title is required';
        /*
        if (!formData.otherDetails) newErrors.otherDetails = 'Description is required';
        if (!formData.college) newErrors.college = 'College is required';
        if (!formData.course) newErrors.course = 'Course is required';
        if (!formData.branch) newErrors.branch = 'Branch is required';
        if (!formData.semester) newErrors.semester = 'Semester is required';
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.name) newErrors.name = 'Name is required';*/
        setErrors(newErrors);
        console.log("Hello");
        if (Object.keys(newErrors).length === 0) {
            // All fields are valid, proceed with form submission

            const formDataToSend = new FormData();
            formDataToSend.append('video', formData.video);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('college', formData.college);
            formDataToSend.append('course', formData.course);
            formDataToSend.append('branch', formData.branch);
            formDataToSend.append('semester', formData.semester);
            formDataToSend.append('subject', formData.subject);
            formDataToSend.append('email', userData.email);
            formDataToSend.append('name', userData.name);
            formDataToSend.append('otherDetails', formData.otherDetails);
            formDataToSend.append('notes', formData.notes);
            formDataToSend.append('batch', userData.batchYear);

            // Send the formData to your server using a POST request

            console.log("Hello");
            axios
                .post('http://localhost:3001/VideoUpload', formDataToSend)
                .then((response) => {
                    navigate('/videos');
                    console.log('Uploaded');
                })
                .catch((error) => {
                    console.error('Not Uploaded', error);
                });
        }
    };

    return (
        <div style={{ background: 'rgba(0, 0, 0, 0.5)', height: '50rem', display: 'grid', justifyContent: 'center' }}>
            <div className='uploadBox' style={{ marginTop: '3%', width: '110%' }}>
                <div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <h3 style={{ textAlign: 'center', fontWeight: '550' }}>Upload Video</h3>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    onChange={handleChange}
                                    value={formData.title}
                                    required
                                />
                                {errors.title && <div>{errors.title}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="otherDetails">Description</label>
                                <input
                                    type="text"
                                    id="otherDetails"
                                    name="otherDetails"
                                    onChange={handleChange}
                                    value={formData.otherDetails}
                                    required
                                />
                                {errors.otherDetails && <div>{errors.otherDetails}</div>}
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    onChange={handleChange}
                                    value={formData.subject}
                                    required
                                />
                                {errors.subject && <div>{errors.subject}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="college">College</label>
                                <input
                                    type="text"
                                    id="college"
                                    name="college"
                                    onChange={handleChange}
                                    value={formData.college}
                                    required
                                />
                                {errors.college && <div>{errors.college}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="course">Course</label>
                                <input
                                    type="text"
                                    id="course"
                                    name="course"
                                    onChange={handleChange}
                                    value={formData.course}
                                    required
                                />
                                {errors.course && <div>{errors.course}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="branch">Branch</label>
                                <input
                                    type="text"
                                    id="branch"
                                    name="branch"
                                    onChange={handleChange}
                                    value={formData.branch}
                                    required
                                />
                                {errors.branch && <div>{errors.branch}</div>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="semester">Semester</label>
                                <input
                                    type="number"
                                    id="semester"
                                    name="semester"
                                    onChange={handleChange}
                                    value={formData.semester}
                                    required
                                />
                                {errors.semester && <div>{errors.semester}</div>}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="video">Upload Video</label>
                                <input
                                    type="file"
                                    id="video"
                                    name="video"
                                    accept="video/*"
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.video && <div>{errors.video}</div>}
                            </div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="notes">Google drive link for notes*</label>
                            <input
                                type="text"
                                id="notes"
                                name="notes"
                                onChange={handleChange}
                                value={formData.notes}
                            />
                            {errors.notes && <div>{errors.notes}</div>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <button type="submit">Upload </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default VideoUploadForm;