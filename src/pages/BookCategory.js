import React, { useState, useEffect } from "react";
import ShelfContainer from "../components/ShelfContainer";
import OrderByContainer from "../components/OrderByContainer";
import CreateBookIcon from "../components/CreateBookIcon";
import CreateBookFormModal from "../components/CreateBookFormModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { withRouter } from "react-router";
import "./Home.scss";

function BookCategory({ history }) {
  const { category } = useParams();
  const books = useSelector(state => state.books);

  const categoryBooks = books.filter(
    book => book.category === (category === "null" ? null : category)
  );
  const [bookCategory, setBookCategory] = useState(category);
  const [sortedBooks, setSortedBooks] = useState(books);
  const [orderBy, setOrderBy] = useState("Alphabetical order");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    categoryBooks.sort((a, b) => {
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
    setSortedBooks(categoryBooks);
    setBookCategory(category);
  }, [books, category, orderBy]);

  return (
    <ShelfContainer>
      <OrderByContainer orderBy={orderBy} setOrderBy={setOrderBy} />
      <CreateBookIcon setCreateModalOpen={setCreateModalOpen} />
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
      <CreateBookFormModal
        createModalOpen={createModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        category={bookCategory}
      />
    </ShelfContainer>
  );
}

export default withRouter(BookCategory);
