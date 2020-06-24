import React, { useState, useEffect } from "react";
import ShelfContainer from "../components/ShelfContainer";
import OrderByContainer from "../components/OrderByContainer";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { withRouter } from "react-router";
import "./Home.scss";

function BookCategory({ history }) {
  const { category } = useParams();
  const books = useSelector(state =>
    state.books.filter(
      book => book.category === (category === "null" ? null : category)
    )
  );
  const [sortedBooks, setSortedBooks] = useState(books);
  useEffect(() => {
    setSortedBooks(books);
  }, [category]);

  return (
    <ShelfContainer>
      <OrderByContainer
        sortedBooks={sortedBooks}
        setSortedBooks={setSortedBooks}
        category={category}
      />
      <table>
        <thead>
          <tr>
            <th style={{ width: "30px" }}></th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.length > 0 && (
            <tr
              style={{
                backgroundColor:
                  category === "read"
                    ? "#8ac926"
                    : category === "reading"
                    ? "#ffca3a"
                    : category === "wantToRead"
                    ? "#ff595e"
                    : "white"
              }}
            >
              <td rowSpan={sortedBooks.length + 1}></td>
            </tr>
          )}
          {sortedBooks.map(book => (
            <tr key={book.id} onClick={() => history.push("/book/" + book.id)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ShelfContainer>
  );
}

export default withRouter(BookCategory);
