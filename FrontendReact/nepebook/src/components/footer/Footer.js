import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted' >
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span style={{ color: '#fff' }}>Get connected with us on social networks:</span>
                </div>

                <div style={{ color: '#fff' }}>
                    <a href='https://www.facebook.com/profile.php?id=100012621338088' className='me-4 text-reset'>
                        <i className='fab fa-facebook-f'></i>
                    </a>
                    <a href='https://twitter.com/Sanjgrg155' className='me-4 text-reset'>
                        <i className='fab fa-twitter'></i>
                    </a>
                    <a href='https://www.instagram.com/sunj_grg/' className='me-4 text-reset'>
                        <i className='fab fa-instagram'></i>
                    </a>
                    <a href='https://www.linkedin.com/in/sanjaykumargurung' className='me-4 text-reset'>
                        <i className='fab fa-linkedin'></i>
                    </a>
                    <a href='https://github.com/SanjayaGrg' className='me-4 text-reset'>
                        <i className='fab fa-github'></i>
                    </a>
                </div>
            </section>

            <section className=''>
                <div className='container text-center text-md-start mt-5'>
                    <div className='row mt-3'>
                        <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ color: '#fff' }}>
                                <i className='fas fa-gem me-3'></i>Nep E-Book
                            </h6>
                            <p style={{ color: '#fff' }}>
                                You can browse some books. You may like the books.
                            </p>
                        </div>

                        <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4' style={{ color: '#fff' }}>
                            <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Trending Books
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Recommended Books
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Latest Releases
                                </a>
                            </p>
                        </div>

                        <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4' style={{ color: '#fff' }}>
                            <h6 className='text-uppercase fw-bold mb-4'>Nav links</h6>
                            <p>
                                <a href='/app' className='text-reset'>
                                    Home
                                </a>
                            </p>
                            <p>
                                <a href='/about' className='text-reset'>
                                    About Us
                                </a>
                            </p>
                            <p>
                                <a href='/contact' className='text-reset'>
                                    Contact Us
                                </a>
                            </p>
                        </div>

                        <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4' style={{ color: '#fff' }}>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                            <p>
                                <i className='fas fa-home me-3'></i> Tokha-3, Kathmandu, Nepal
                            </p>
                            <p>
                                <i className='fas fa-envelope me-3'></i>
                                info@nepEbook.com
                            </p>
                            <p>
                                <i className='fas fa-phone me-3'></i>+977 9869343956
                            </p>
                            <p>
                                <i className='fas fa-print me-3'></i> + 01 234 567 89
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', color: '#fff' }}>
                © 2022 Copyright: <a className='text-reset fw-bold' href='https://mdbootstrap.com/'> NepEBook.com</a>
            </div>
        </MDBFooter>
    );
}