import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Genre = (props) => {
    const [books, setBooks] = useState([]);
    const [currentGenre, setCurrentGenre] = useState('');

    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    // useEffect(() => {
    //     const genre = props.match.params.id;
    //     setCurrentGenre(capitalizeFirstLetter(genre));

    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     };

    //     const fetchData = async () => {
    //         try {
    //             const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/`, { genre }, config);
    //             setBooks(res.data);
    //         }
    //         catch (err) {

    //         }
    //     };
    //     fetchData();
    // },
    //     [props.match.params.id]
    // );

    const getGenreBooks = () => {
        let list = [];
        let result = [];

        books.map(post => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(post.genre)}</strong>
                        <h3 className="mb-0">{post.title}</h3>
                        {/* <div className="mb-1 text-muted">{post.month} {post.day}</div> */}
                        <p className="card-text mb-auto">{post.excerpt}</p>
                        <Link to={`/ebook/${post.slug}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={post.image} alt='thumbnail' />
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i + 1] ? list[i + 1] : null}
                    </div>
                </div>
            )
        }

        return result;
    };
    return (
        <div className='container mt-3'>
            <h3 className='display-4'>{currentGenre} Genre</h3>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 text-muted" to='/genre/fantasy'>Fantasy</Link>
                    <Link className="p-2 text-muted" to='/genre/action'>Action</Link>
                    <Link className="p-2 text-muted" to='/genre/sci_fi'>Sci_Fi</Link>
                    <Link className="p-2 text-muted" to='/genre/Mystery'>Mystery</Link>
                    <Link className="p-2 text-muted" to='/genre/horror'>Horror</Link>
                    <Link className="p-2 text-muted" to='/genre/thriller'>Thriller</Link>
                    <Link className="p-2 text-muted" to='/genre/poetry'>Poetry</Link>
                    <Link className="p-2 text-muted" to='/genre/nonfiction'>Nonfiction</Link>
                    <Link className="p-2 text-muted" to='/genre/adventure'>Adventure</Link>
                    <Link className="p-2 text-muted" to='/genre/drama'>Drama</Link>
                    <Link className="p-2 text-muted" to='/genre/media'>Media</Link>
                    <Link className="p-2 text-muted" to='/genre/romance'>Romance</Link>
                    <Link className="p-2 text-muted" to='/genre/western'>Westerns</Link>
                    <Link className="p-2 text-muted" to='/genre/contemporary'>Contemporary</Link>
                </nav>
            </div>
            {getGenreBooks()}
        </div>
    );
};
export default Genre;