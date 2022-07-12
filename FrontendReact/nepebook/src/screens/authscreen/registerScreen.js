import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import NavHeader from '../../components/navbar/NavHeader';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterScreen() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const initialFormData = Object.freeze({
        email: '',
        username: '',
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
                .post(`user/register/`, {
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                })
                .then((res) => {
                    toast.success("Registered Successfully!");
                    navigate('/login');
                    console.log(res);
                    console.log(res.data);
                });
        }
        setValidated(true);
    };



    return (
        <React.Fragment>
            <NavHeader />

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'left', marginTop: '20px' }}>
                <ToastContainer position="top-center" />
                <Form noValidate validated={validated}
                    onSubmit={handleSubmit}
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
                    }}>Register your Account</h3>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
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
                            Please provide a valid email.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="username"
                            name='username'
                            id='inputUsername'
                            required
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter Username"
                            style={{ borderColor: '#167bff', backgroundColor: '#a29bfe', borderRadius: '20px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid username.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            id='password'
                            required
                            onChange={handleChange}
                            autoFocus
                            placeholder="Enter Password"
                            style={{ borderColor: '#167bff', backgroundColor: '#ff7675', borderRadius: '20px' }}
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant='success'>
                        Sign Up
                    </Button>
                    <div className="text-center d-flex justify-content-between mt-4" style={{ color: "#000" }}>
                        <p>Already have a account? <a href="/login" className="font-italic">
                            <u>Login</u></a></p>
                    </div>
                </Form>
            </div>
        </React.Fragment >
    )
}
