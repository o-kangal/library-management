const db = require("../config/db");

// Fetch book details along with the current owner (if borrowed)
const getBookWithCurrentOwner = async (bookId) => {
  const book = await db("books").where({ id: bookId }).first();

  if (!book) {
    return null;
  }

  const currentOwner = await db("borrows")
    .join("users", "borrows.user_id", "users.id")
    .where({ book_id: bookId, return_date: null })
    .select("users.id", "users.name")
    .first();

  return {
    ...book,
    currentOwner: currentOwner || null,
  };
};

module.exports = {
  getBookWithCurrentOwner,
};
