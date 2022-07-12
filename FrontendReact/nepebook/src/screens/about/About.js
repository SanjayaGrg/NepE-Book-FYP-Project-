import React from 'react';
import Footer from '../../components/footer/Footer';
import NavHeader from '../../components/navbar/NavHeader';
import './About.css';


export default function About() {
    return (
        <>
            <NavHeader />
            <div className='about'>
                <h1 style={{ color: '#fff' }}>About Us</h1>
                <p>Hello, wishes from Nep E-Book</p>
                <br />
                <p>
                    Nep E-Book site is a online books product posted by authors/users.
                    There are so many books you may like in this website. There are some
                    trending books and recommended books.
                </p>
                <br />
                <p>
                    In this site, it is user friendly because user can also be authors as
                    they can also add books and contents they like.They can also be authors
                    for their own book. You can contact the owner through contact us form as
                    it sends email directly to the owner of this site.
                </p>
                <br />
            </div>
            <Footer />
        </>
    )
}
