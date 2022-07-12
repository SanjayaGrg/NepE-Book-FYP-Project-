import React from "react";
import styled from "styled-components";

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const BookName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const BookInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;
const BookComponent = ({ book }) => {
  console.log(book);

  return (
    <>
      {
        book.map((item) => {
          let thumbnail = item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail;
          let amount = item.saleInfo && item.saleInfo.saleability;
          {/* if (thumbnail != undefined && amount != undefined) { */ }
          return (
            <>
              <BookContainer
              // onClick={() => {
              //   props.onBookSelect(imdbID);
              //   window.scrollTo({ top: 0, behavior: "smooth" });
              // }}
              >
                <CoverImage src={thumbnail} alt='img' />
                <BookName>Title: {item.volumeInfo.title}</BookName>
                <InfoColumn>
                  <BookInfo>Year: {item.volumeInfo.publishedDate}</BookInfo>
                  <BookInfo>Type: {item.volumeInfo.subtitle}</BookInfo>
                  <p className="amount">{amount}</p>
                </InfoColumn>
              </BookContainer>

            </>
          );
          {/* } */ }


        })
      }
      <div className="container">
        <div className="overlay-inner">
          <button className="close"><i className="fas fa-times"></i></button>
          <div className="inner-box">
            {/* <img src={thumbnail} alt="" /> */}

            <div className="info">
              {/* <h1>Title: {item.volumeInfo.title}</h1> */}
            </div>

          </div>

        </div>

      </div>

    </>
  );
};
export default BookComponent;