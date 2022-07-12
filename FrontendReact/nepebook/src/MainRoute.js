import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import RegisterScreen from './screens/authscreen/registerScreen';
import LogInScreen from './screens/authscreen/logInScreen';
import LogOutScreen from './screens/authscreen/logOutScreen';
import Details from './components/Details';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';
import Genre from './components/genre/Genre';
import GoogleBooks from './config/app';
import Book from './components/landingcomponent/Book';
import LandingScreen from "./screens/landingScreen/LandingScreen";
import Contact from "./screens/contact/Contact";
import NotFound from './components/notFound/NotFound';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import About from "./screens/about/About";
import Search from "./components/search/Search";
import BookDetails from "./components/bookdetails/BookDetails";
import { AuthProvider } from "./context/AuthContext";


export default function MainRoute() {
    return (
        <>
            <Router>
                <ToastContainer />
                <AuthProvider>
                    <Routes>
                        <Route exact path="/app" element={<App />} />
                        <Route exact path="/book" element={<Book />} />
                        <Route exact path="/" element={<LandingScreen />} />
                        <Route exact path="/about" element={<About />} />
                        <Route exact path="/contact" element={<Contact />} />
                        <Route exact path="*" element={<NotFound />} />
                        <Route exact path="/google" element={<GoogleBooks />} />
                        <Route exact path="/admin" element={<Admin />} />
                        <Route exact path="/admin/create" element={<Create />} />
                        <Route exact path="/admin/edit/:id" element={<Edit />} />
                        <Route exact path="/admin/delete/:id" element={<Delete />} />
                        <Route exact path='/genre' element={<Genre />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/login" element={<LogInScreen />} />
                        <Route path="/logout" element={<LogOutScreen />} />
                        <Route path="/post/:slug" element={<Details />} />
                        <Route path="/p-:title-:id" element={<BookDetails />} />
                        <Route exact path="/search" element={<Search />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </>
    );
} 