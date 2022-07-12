import React, { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Contact.css';
import NavHeader from "../../components/navbar/NavHeader";
import emailjs from 'emailjs-com';
import Footer from "../../components/footer/Footer";

export default function Contact() {
    const [state, setState] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const { name, email, subject, message } = state;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
            toast.error("Please provide value in each input field");
        } else {
            emailjs.sendForm(
                "service_gzdpdgn",
                "template_url4hzf",
                e.target,
                "LTMgLLANoUM4fWcXc"
            ).then(res => {
                console.log(res);
            }).catch(
                err => console.log(err)
            );
            setState({ name: "", email: "", subject: "", message: "" });
            toast.success("Form Submitted Successfully");
        }
        console.log("Subitted Succcesfully.")
    };

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <>
            <NavHeader />
            <div className="contact-section" style={{ padding: '7em 0', backgroundColor: '#000' }}>
                <div className="container">
                    {/* <ToastContainer position="top-center" /> */}
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="wrapper">
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <div className="contact-wrap w-100 p-lg-5 p-4">
                                            <h3 className="mb-4" style={{ color: '#fff' }}>Send us a Feedback Message</h3>
                                            <form
                                                id="contactForm"
                                                className="contactForm"
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: '16px' }}
                                                                name="name"
                                                                placeholder="Name"
                                                                onChange={handleInputChange}
                                                                value={name}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                style={{ fontSize: '16px' }}
                                                                name="email"
                                                                placeholder="Email"
                                                                onChange={handleInputChange}
                                                                value={email}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: '16px' }}
                                                                name="subject"
                                                                placeholder="Subject"
                                                                onChange={handleInputChange}
                                                                value={subject}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea
                                                                type="text"
                                                                className="form-control"
                                                                style={{ fontSize: '16px' }}
                                                                name="message"
                                                                placeholder="Message"
                                                                cols="30"
                                                                rows="6"
                                                                onChange={handleInputChange}
                                                                value={message}
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="submit"
                                                                value="Send Message"
                                                                className="btn btn-primary"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-stretch" style={{ color: "#fff" }}>
                                        <div className="info-wrap w-100 p-lg-5 p-4 img">
                                            <h3 style={{ color: "#fff" }}>Contact us</h3>
                                            <p className="mb-4">
                                                We're open for any suggestion or just to have a chat
                                            </p>
                                            <div className="dbox w-100 d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center pt-1 mx-2">
                                                    <span className="fa fa-map-marker"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span style={{ fontWeight: 'bold' }}>Address:</span> Tokha-3, Kathmandu, Nepal
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center mx-2">
                                                    <span className="fa fa-phone"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p className="mt-3">
                                                        <span style={{ fontWeight: 'bold' }}>Phone:</span>
                                                        <a href="tel://123456789"> +977 9869343956</a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center mx-2">
                                                    <span className="fa fa-paper-plane"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p className="mt-3">
                                                        <span style={{ fontWeight: 'bold' }}>Email: </span>
                                                        <a href="mailto:info@yoursite.com">
                                                            info@nepEbook.com
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox w-100 d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center mx-2">
                                                    <span className="fa fa-globe"></span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p className="mt-3">
                                                        <span style={{ fontWeight: 'bold' }}>Website: </span>
                                                        <a href="/">nepEbook.com</a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}