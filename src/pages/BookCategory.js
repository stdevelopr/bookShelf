import React, { useState } from "react";
import ShelfContainer from "../components/ShelfContainer";
import OrderByContainer from "../components/OrderByContainer";
import BookItem from "../components/BookItem";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function BookCategory() {
  const { category } = useParams();
  const [sortedBooks, setSortedBooks] = useState(
    useSelector(state => state.books.filter(book => book.category === category))
  );
  const categories = useSelector(state => state.categories);

  return (
    <ShelfContainer>
      <OrderByContainer
        sortedBooks={sortedBooks}
        setSortedBooks={setSortedBooks}
      />
      <div className="home-categories">
        <h3>{categories[category]}</h3>
        {sortedBooks.length > 0 ? (
          <div>
            {sortedBooks.map(book => {
              return <BookItem key={book.id} book={book} />;
            })}
          </div>
        ) : (
          <div>no books yet...</div>
        )}
      </div>
    </ShelfContainer>
  );
}
