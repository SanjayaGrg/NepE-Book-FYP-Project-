import React, { useState } from "react";
import styled from "styled-components";
import BookComponent from '../components/BookComponent/BookComponent';
import BookInfoComponent from '../components/BookComponent/BookInfoComponent';
import axios from "axios";

export const API_KEY = "a9118a3a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: black;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const BookImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const BookListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;;
`;
const Placeholder = styled.img`
  width: 120px;
  height: 120px;
  margin: 150px;
  opacity: 50%;
`;

const GoogleBooks = () => {

  const [search, setSearch] = useState("");
  const [bookData, setData] = useState([]);

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      axios.get('https://www.googleapis.com/books/v1/volumes?q=' + search + '&key=AIzaSyA2hbPBN6_K1rAaV-GqwWMMhLQt4RCOnfA')
        .then(res => console.log(res.data.items))
        .catch(err => console.log(err))
    }
  }
  return (
    <Container>
      <Header>
        <AppName>
          Nep E-Book
        </AppName>
        <SearchBox>
          <SearchInput
            placeholder="Search Book"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyPress={searchBook}
          />
        </SearchBox>
      </Header>
      <BookListContainer>
        {
          <BookComponent book={bookData} />
        }
      </BookListContainer>
    </Container>
  );
}

export default GoogleBooks;