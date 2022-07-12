import React, { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../../config/app";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const BookName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const BookInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.5;
  }
`;
const Close = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
  background: lightgray;
  height: fit-content;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
`;
const BookInfoComponent = (props) => {
    const [BookInfo, setBookInfo] = useState();
    const { selectedBook } = props;

    useEffect(() => {
        Axios.get(
            `https://www.omdbapi.com/?i=${selectedBook}&apikey=${API_KEY}`,
        ).then((response) => setBookInfo(response.data));
    }, [selectedBook]);
    return (
        <Container>
            {BookInfo ? (
                <>
                    <CoverImage src={BookInfo?.Poster} alt={BookInfo?.Title} />
                    <InfoColumn>
                        <BookName>
                            {BookInfo?.Type}: <span>{BookInfo?.Title}</span>
                        </BookName>
                        <BookInfo>
                            IMDB Rating: <span>{BookInfo?.imdbRating}</span>
                        </BookInfo>
                        <BookInfo>
                            Year: <span>{BookInfo?.Year}</span>
                        </BookInfo>
                        <BookInfo>
                            Language: <span>{BookInfo?.Language}</span>
                        </BookInfo>
                        <BookInfo>
                            Rated: <span>{BookInfo?.Rated}</span>
                        </BookInfo>
                        <BookInfo>
                            Released: <span>{BookInfo?.Released}</span>
                        </BookInfo>
                        <BookInfo>
                            Runtime: <span>{BookInfo?.Runtime}</span>
                        </BookInfo>
                        <BookInfo>
                            Genre: <span>{BookInfo?.Genre}</span>
                        </BookInfo>
                        <BookInfo>
                            Director: <span>{BookInfo?.Director}</span>
                        </BookInfo>
                        <BookInfo>
                            Actors: <span>{BookInfo?.Actors}</span>
                        </BookInfo>
                        <BookInfo>
                            Plot: <span>{BookInfo?.Plot}</span>
                        </BookInfo>
                    </InfoColumn>
                    <Close onClick={() => props.onBookSelect()}>X</Close>
                </>
            ) : (
                "Loading..."
            )}
        </Container>
    );
};
export default BookInfoComponent;