import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/post';
import PostLoadingComponent from './components/PostLoading';
import axiosInstance from './axios';
import NavHeader from './components/navbar/NavHeader';
import Footer from './components/footer/Footer';

function Admin() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    useEffect(() => {
        axiosInstance.get().then((res) => {
            const allPosts = res.data;
            setAppState({ loading: false, posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState]);

    return (
        <>
            <NavHeader />
            <div className="App">
                <h1>Author Dashboard</h1>
                <PostLoading isLoading={appState.loading} posts={appState.posts} />
            </div>
            <Footer />
        </>

    );
}
export default Admin;