import React, { useEffect, useState } from "react";
import './App.css';
import Posts from "./components/Posts";
import PostLoadingComponent from "./components/PostLoading";
import { Link } from "react-router-dom";
import NavHeader from "./components/navbar/NavHeader";
import Notify from './Notify';
import Slider from "./components/slider/Slider";
import { Container } from '@mui/material';
import TrendingBooks from "./components/trendingbooks/TrendingBooks";
import RecommendBooks from "./components/recommend/RecommendBooks";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from './components/darkmode/DarkMode';
import Footer from "./components/footer/Footer";

const styledApp = styled.div`
color: ${props => props.theme.fontColor};
`

function App() {
  const [theme, setTheme] = useState("light");
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });
  useEffect(() => {
    setAppState({ loading: true });
    const apiUrl = `http://127.0.0.1:8000/api/`;
    fetch(apiUrl)
      .then((data) => data.json())
      .then((posts) => {
        setAppState({ loading: false, posts: posts });
      });
  }, [setAppState]);

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }
  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <Notify />
        <styledApp className="App">
          <NavHeader />
          <Slider />
          <button onClick={() => themeToggler()} className={theme === "light" ? "btn btn-dark" : "btn btn-light"}>{theme === "light" ? "Dark Mode" : "Light Mode"}</button>
          <Container>
            <div className="container mt-5" style={{ color: "#6c5ce7" }}>
              <div className="jumbotron">
                <h1 className="display-4" style={{ color: "#6c5ce7" }}>Welcome to Nep E-Book Store</h1>
                <p className="lead">Find amazing, exciting, and rated books.</p>
                <hr className="my-4" />
                <p>Find exiting books here and there.</p>
              </div>
            </div>
            <TrendingBooks />


            <hr className="my-5" />
            <h1 className="mt-5">Read Books here....</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
            <RecommendBooks />
          </Container>
          <Footer />
        </styledApp>
      </ThemeProvider>
    </>

  )
}
export default App;

