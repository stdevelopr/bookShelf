import React, { useState, useEffect } from "react";
import ShelfContainer from "../components/ShelfContainer";
import OrderByContainer from "../components/OrderByContainer";
import CreateBookIcon from "../components/CreateBookIcon";
import CreateBookFormModal from "../components/CreateBookFormModal";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import "./Home.scss";

function Home({ history }) {
  const books = useSelector(state => state.books);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [readingBooksCategory, setReadingBooksCategory] = useState([]);
  const [wantToReadBooksCategory, setWantToReadBooksCategory] = useState([]);
  const [readBooksCategory, setReadBooksCategory] = useState([]);
  const [nullBooksCategory, setNullBooksCategory] = useState([]);
  const [orderBy, setOrderBy] = useState("Alphabetical order");

  useEffect(() => {
    books.sort((a, b) => {
      if (orderBy === "Alphabetical order")
        return a["title"].localeCompare(b["title"]);
      else if (orderBy === "Creation date asc") {
        if (a["timestamp"] < b["timestamp"]) return -1;
        else return 1;
      } else if (orderBy === "Creation date desc") {
        if (a["timestamp"] > b["timestamp"]) return -1;
        else return 1;
      } else return 0;
    });
    setReadingBooksCategory(books.filter(book => book.category === "reading"));
    setWantToReadBooksCategory(
      books.filter(book => book.category === "wantToRead")
    );
    setReadBooksCategory(books.filter(book => book.category === "read"));
    setNullBooksCategory(books.filter(book => book.category === null));
  }, [books, orderBy]);

  return (
    <ShelfContainer>
      <OrderByContainer orderBy={orderBy} setOrderBy={setOrderBy} />

      <CreateBookIcon setCreateModalOpen={setCreateModalOpen} />

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
          {nullBooksCategory.map(book => (
            <tr key={book.id} onClick={() => history.push("/book/" + book.id)}>
              <td></td>
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
              <td rowSpan={readingBooksCategory.length + 1}></td>
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
      <CreateBookFormModal
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
      />
    </ShelfContainer>
  );
}

export default withRouter(Home);
