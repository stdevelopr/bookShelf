import React, { useState } from "react";
import ShelfContainer from "../components/ShelfContainer";
import OrderByContainer from "../components/OrderByContainer";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookItem from "../components/BookItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.scss";

export default function Home() {
  const [sortedBooks, setSortedBooks] = useState(
    useSelector(state => state.books)
  );

  const nullBooksCategory = sortedBooks.filter(book => book.category === null);
  const readingBooksCategory = sortedBooks.filter(
    book => book.category === "reading"
  );
  const wantToReadBooksCategory = sortedBooks.filter(
    book => book.category === "wantToRead"
  );
  const readBooksCategory = sortedBooks.filter(
    book => book.category === "read"
  );

  return (
    <ShelfContainer>
      <OrderByContainer
        sortedBooks={sortedBooks}
        setSortedBooks={setSortedBooks}
      />

      <table>
        <thead>
          <th></th>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
        </thead>
        {nullBooksCategory.length > 0 && (
          <tr
            style={{
              backgroundColor: "white",
              width: "5px",
              position: "relative"
            }}
          >
            <td
              rowSpan={nullBooksCategory.length + 1}
              style={{ width: "30px" }}
            ></td>
          </tr>
        )}
        {nullBooksCategory.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
          </tr>
        ))}
        {readingBooksCategory.length > 0 && (
          <tr
            style={{
              backgroundColor: "#ffca3a",
              width: "5px",
              position: "relative"
            }}
          >
            <td
              rowSpan={readingBooksCategory.length + 1}
              style={{ width: "30px" }}
            ></td>
          </tr>
        )}

        {readingBooksCategory.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
          </tr>
        ))}

        {wantToReadBooksCategory.length > 0 && (
          <tr
            style={{
              backgroundColor: "#ff595e",
              position: "relative"
            }}
          >
            <td
              rowSpan={wantToReadBooksCategory.length + 1}
              style={{ width: "5px" }}
            ></td>
          </tr>
        )}
        {wantToReadBooksCategory.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
          </tr>
        ))}

        {readBooksCategory.length > 0 && (
          <tr
            style={{
              backgroundColor: "#8ac926",
              position: "relative"
            }}
          >
            <td
              rowSpan={readBooksCategory.length + 1}
              style={{ width: "5px" }}
            ></td>
          </tr>
        )}
        {readBooksCategory.map(book => (
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.description}</td>
          </tr>
        ))}
      </table>

      {/* <div>
        {nullBooksCategory.map(book => {
          return <BookItem key={book.id} book={book} />;
        })}
      </div>
      <div className="home-categories">
        <Link
          to={`/category/reading`}
          className="category-title"
          style={{ textDecoration: "none" }}
        >
          <h3>Currently Reading</h3>
        </Link>
        {readingBooksCategory.length > 0 ? (
          <div>
            {readingBooksCategory
              .filter(book => book.category === "reading")
              .map(book => {
                return (
                  <BookItem key={book.id} book={book} showCategory={true} />
                );
              })}
          </div>
        ) : (
          <div>no books in this category...</div>
        )}
      </div>

      <div className="home-categories">
        <Link
          to={`/category/wantToRead`}
          className="category-title"
          style={{ textDecoration: "none" }}
        >
          <h3>Want to read</h3>
        </Link>

        {wantToReadBooksCategory.length > 0 ? (
          <div>
            {wantToReadBooksCategory
              .filter(book => book.category === "wantToRead")
              .map(book => {
                return (
                  <BookItem key={book.id} book={book} showCategory={true} />
                );
              })}
          </div>
        ) : (
          <div>no books in this category...</div>
        )}
      </div>
      <div className="home-categories">
        <Link
          to={`/category/read`}
          className="category-title"
          style={{ textDecoration: "none" }}
        >
          <h3 className="category-title">Read</h3>
        </Link>
        {readBooksCategory.length > 0 ? (
          <div>
            {readBooksCategory
              .filter(book => book.category === "read")
              .map(book => {
                return (
                  <BookItem key={book.id} book={book} showCategory={true} />
                );
              })}
          </div>
        ) : (
          <div>no books in this category...</div>
        )}
      </div> */}
    </ShelfContainer>
  );
}
