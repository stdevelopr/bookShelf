import React, { useState } from "react";
import ShelfContainer from "../components/ShelfContainer";
import OrderByContainer from "../components/OrderByContainer";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import "./Home.scss";

function Home({ history }) {
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
          <tr>
            <th></th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {nullBooksCategory.length > 0 && (
            <tr
              style={{
                backgroundColor: "white"
              }}
            >
              <td rowSpan={nullBooksCategory.length + 1}></td>
            </tr>
          )}
          {nullBooksCategory.map(book => (
            <tr key={book.id} onClick={() => history.push("/book/" + book.id)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          ))}
          {readingBooksCategory.length > 0 && (
            <tr
              style={{
                backgroundColor: "#ffca3a"
              }}
            >
              <td
                rowSpan={readingBooksCategory.length + 1}
                style={{ width: "30px" }}
              ></td>
            </tr>
          )}

          {readingBooksCategory.map(book => (
            <tr key={book.id} onClick={() => history.push("/book/" + book.id)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          ))}

          {wantToReadBooksCategory.length > 0 && (
            <tr
              style={{
                backgroundColor: "#ff595e"
              }}
            >
              <td rowSpan={wantToReadBooksCategory.length + 1}></td>
            </tr>
          )}
          {wantToReadBooksCategory.map(book => (
            <tr key={book.id} onClick={() => history.push("/book/" + book.id)}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
            </tr>
          ))}

          {readBooksCategory.length > 0 && (
            <tr
              style={{
                backgroundColor: "#8ac926"
              }}
            >
              <td rowSpan={readBooksCategory.length + 1}></td>
            </tr>
          )}
          {readBooksCategory.map(book => (
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

export default withRouter(Home);
