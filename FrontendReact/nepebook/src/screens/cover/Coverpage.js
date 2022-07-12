import React from "react";
import '../../styles/cover.css';

const Coverpage = () => {
    return (
        <div className="d-flex text-center text-white bg-dark bgd-image">

            <div className="cover-container d-flex p-3 mx-auto mt-3 flex-column">
                <header className="mb-5">
                    <div>
                        <h3 className="float-md-start mb-0">Nep E-Book</h3>
                        <nav className="nav nav-masthead justify-content-center float-md-end">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                            <a className="nav-link" href="/home">Features</a>
                            <a className="nav-link" href="/contact">Contact</a>
                        </nav>
                    </div>
                </header>

                <div className="px-4 my-5">
                    <h1>Welcome to Online E-Book Store</h1>
                    <p className="lead mt-4">Nep E-Book Store is the ebook store which contains many online books. Here you can read different categories books.</p>
                    <p className="lead">
                        <a href="/google" className="btn btn-lg btn-secondary fw-bold border-white bg-white mt-5">Explore Now</a>
                    </p>
                </div>

                <footer className="mt-5 mb-3 text-white-50">
                    <p>Nep <a href="https://google.com/" className="text-white">E-Book</a>, by <a
                        href="https://twitter.com/sunjgrg115" className="text-white">@sanjaya</a>.</p>
                </footer>
            </div>

        </div>
    );
}
export default Coverpage;