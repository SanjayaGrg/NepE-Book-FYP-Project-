import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../../components/navbar/NavHeader';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogInScreen() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            e.preventDefault();
            // e.stopPropagation();
            console.log(formData);
            axiosInstance
                .post(`user/login/`, {
                    email: formData.email,
                    password: formData.password,
                })
                .then((res) => {
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axiosInstance.defaults.headers['Authorization'] =
                        'JWT ' + localStorage.getItem('access_token');

                    toast.success("Logged in Successfully!");
                    navigate('/app');
                    //console.log(res);
                    //console.log(res.data);

                });
        }
        setValidated(true);
    };

    return (
        <React.Fragment>
            <NavHeader />
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left', marginTop: '20px' }}>
                <ToastContainer position="top-center" />
                <Form noValidate validated={validated} onSubmit={handleSubmit}
                    style={{
                        width: '450px',
                        margin: 'auto',
                        background: '#ffffff',
                        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
                        padding: '40px 55px 45px 55px',
                        borderRadius: '15px',
                        transition: 'all o.3s'

                    }}>
                    <h3 style={{
                        textAlign: 'center',
                        margin: '0',
                        lineHeight: '1',
                        paddingBottom: '20px'
                    }}>Log In With your Account</h3>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            id='email'
                            required
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter email"
                            style={{ borderColor: '#167bff', backgroundColor: '#a29bfe', borderRadius: '20px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid details.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            id='password'
                            required
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter Password"
                            style={{ borderColor: '#167bff', borderRadius: '20px', backgroundColor: '#ff7675' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button
                        // onClick={handleSubmit} 
                        type="submit"
                        variant='success'>
                        Log In
                    </Button>
                    <div className="text-center d-flex justify-content-between mt-4" style={{ textAlign: 'right', fontSize: '13px', paddingTop: '10px', marginTop: '5px' }}>
                        <p>Don't have a account. Register <a href="/register" className="font-italic">
                            <u>here..</u></a></p>
                    </div>
                </Form>
            </div>
        </React.Fragment >
    )
}
